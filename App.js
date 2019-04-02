import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Agenda from './src/screens/Agenda';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <Agenda />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
