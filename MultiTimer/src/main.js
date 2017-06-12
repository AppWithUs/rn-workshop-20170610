import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/Home';
import CreateScreen from './screens/Create';
import * as timerUtils from './util/timers';

const MainNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Create: { screen: CreateScreen },
});

const DEMO_TIMERS = [
];

export default class MainApp extends Component {

  state = {
    timers: DEMO_TIMERS
  };

  findTimer = key => {
    const { timers } = this.state;
    const timer = timers.filter(t => t.key === key);
    if (timer.length === 1) {
      return timer[0];
    } else {
      return null;
    }
  };

  startTimer = key => {
    const timer = this.findTimer(key);
    if (!timer) return;
    timerUtils.startTimer(timer);
    this.upsertTimer(timer);
  };

  pauseTimer = key => {
    const timer = this.findTimer(key);
    if (!timer) return;
    timerUtils.pauseTimer(timer);
    this.upsertTimer(timer);
  };

  resumeTimer = key => {
    this.startTimer(key); // same logic
  };

  resetTimer = key => {
    const timer = this.findTimer(key);
    if (!timer) return;
    timerUtils.resetTimer(timer);
    this.upsertTimer(timer);
  };

  upsertTimer = timer => {
    let { timers } = this.state;

    if (timers.some(t => t.key === timer.key)) {
      timers = timers.map(t => {
        if (t.key === timer.key)
          return timer;
        else
          return t;
      });
    } else {
      timers.push(timer);
    }

    this.setState({ timers });
  };

  render() {
    const { timers } = this.state;

    return (
      <MainNavigator screenProps={{
        timers,
        startTimer: this.startTimer,
        pauseTimer: this.pauseTimer,
        resumeTimer: this.resumeTimer,
        resetTimer: this.resetTimer,
        upsertTimer: this.upsertTimer,
      }}/>
    );
  }
};
