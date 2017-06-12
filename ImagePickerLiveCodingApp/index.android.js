import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import MainView from './src/views/MainView';

export default class WorkshopImagePickerTest extends Component {
  render() {
    return (
      <MainView />
    );
  }
}

AppRegistry.registerComponent('WorkshopImagePickerTest', () => WorkshopImagePickerTest);
