import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import { agendaApiRequest } from "../../services/api";
import moment from "moment";
import {parse} from "node-html-parser";

export default class LoginView extends Component {

    static propTypes = {
        onLogin: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            username   : '',
            loading: false,
            error: false,
        }
    }

    loginHandler = () => {
        this.setState({
            loading: true,
            error: false,
        })
        let currentDate = moment().format('YYYY-MM-DD');
        agendaApiRequest(this.state.username, currentDate).then((res) => {
            if(!parse(res._bodyText).querySelector('#Form')) {
                this.props.onLogin(this.state.username)
            } else {
                this.setState({
                    ...this.state,
                    username: '',
                    loading: false,
                    error: true,
                })
            }
        })
    }

    render() {

        const { loading, error } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={{width: 256, height: 125}}
                        source={require('../../assets/logo.png')}
                    />
                </View>
                <View style={styles.mainContainer}>
                    { error && (
                        <Text style={{color: 'red', fontWeight: 'bold', textAlign: 'center'}}>Identifiant incorrect</Text>
                    )}
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                                   placeholder="prenom.nom"
                                   underlineColorAndroid='transparent'
                                   onChangeText={(username) => this.setState({username})}/>
                    </View>
                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.loginHandler}>
                        {
                            loading ?
                                <ActivityIndicator />
                                :
                                <Text style={styles.loginText}>Connexion</Text>
                        }
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
      marginTop: 20
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        borderColor: '#F2F2F2',
        borderWidth: 1,
        padding: 15,
        borderRadius: 5,
        flex:1,
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
    },
    loginButton: {
        backgroundColor: "#394d68",
    },
    loginText: {
        color: 'white',
    }
});
