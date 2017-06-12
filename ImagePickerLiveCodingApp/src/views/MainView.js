import React, { Component } from 'react';
import { Button, Dimensions, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    width: window.width,
    height: window.height
  }
});

export default class MainView extends Component {
  state = {};

  onPress = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        alert('Schade, doch kein Bild?');
      } else if (response.error) {
        alert('Hoppla, da ist was schief gelaufen!');
      } else {
        let source = { uri: response.uri };

        this.setState({
          image: source
        });
      }
    });
  };

  onPressImage = () => {
    this.setState({
      image: null
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.state.image && (
          <Button title="Bild auswählen" onPress={this.onPress} />
        )}
        {this.state.image && (
          <TouchableOpacity onPress={this.onPressImage}>
            <Image qqqstyle={styles.image} source={this.state.image} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
