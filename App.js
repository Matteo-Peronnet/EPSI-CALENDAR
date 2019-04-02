import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import Agenda from './src/screens/Agenda';
import Login from './src/screens/Login';
import { retrieveData, storeData, removeData } from './src/services/storage';

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
      super(props)
      this.state = {
          loading: true,
          connected: false,
          username: ''
      }
      this.loginSuccessfullHandler = this.loginSuccessfullHandler.bind(this);
      this.dysconnectHandler = this.dysconnectHandler.bind(this);
  }

  componentDidMount() {
      retrieveData('username').then((username) => {
          this.setState({
              loading: false,
              username: username || '',
              connected: !!username
          })
      })
  }

  loginSuccessfullHandler(username) {
      console.log(username)
      storeData('username', username).then(() => {
          this.setState({
              ...this.state,
              username,
              connected: true,
          })
      })
  }

  dysconnectHandler() {
      console.log('disconnect')
      removeData('username').then(() =>
      this.setState({
          ...this.state,
          username: '',
          connected: false
      }))
  }

  render() {

    const { loading, connected, username } = this.state;

    return (
        <SafeAreaView style={styles.container}>
            {
                loading ?
                <ActivityIndicator size="large"/>
                    :
                connected ? <Agenda username={username} onDisconnect={this.dysconnectHandler} /> : <Login onLogin={this.loginSuccessfullHandler}/>
            }
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
