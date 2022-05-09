import { StatusBar } from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Dimensions,
    ScrollView,
    Keyboard,
    SafeAreaView,
} from 'react-native';
import { storeData } from "./Services/User";
import { createStackNavigator, } from '@react-navigation/stack';
import {Navigation} from "./Navigation";
import {NavigationContainer} from "@react-navigation/native";
import {useNavigation} from '@react-navigation/native';
import {StackActions, NavigationActions, createAppContainer} from 'react-navigation';

/*
, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            }
*/


const Stack = createStackNavigator();
import { createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const navigationRef = createNavigationContainerRef()

function navigate(name) {
    if (!navigationRef.isReady()) {
        navigationRef.navigate(name, parms);
    }
}


export default class Login extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
            isLoading: true,
            dbList: [],
            selectedDb: '',
            pickerVisible: false,
            email: '',
            pwd: '',
            user: {},
        };
    }
    static navigationOp = {
        drawerLabel: 'Nav',
        drawerIcon: ({ tintColor }) => (
            <MaterialIcons
                name="home"
                size={24}
                style={{ color: tintColor }}
            />
        )
    };

    validateAndLogin = ({navigation}) => {
        Keyboard.dismiss();
        let mail = this.state.email;
        let pass = this.state.pwd;
        fetch(//Link for my server, only return if the user have permission "true" or "false"
             , {
            mode: 'no-cors',
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000',
            },
            body: JSON.stringify({
                username: mail,
                password: pass
            }),
        })
            .then(response => {
                    let json = response.json()
                    .then(json => {
                       if (!json.user.perm) {
                            console.warn(json);
                            alert('Invalid email or password');
                            return;
                        }
                       if(json.user.perm) {
                           alert("You are logged in.");
                           navigation.navigate('Navigation') // Doesnt work (TypeError: undefined is not an object (navigation.navigate)
                       }
                        this.setState({
                            user: json,
                        });
                        console.warn(this.state.user)
                    })
                    .catch(error => {
                        console.warn(error);
                    });
            })
    };
    Body = ({ children }, {navigation}) => (
        <ImageBackground style={styles.Body} source={require('./images/bg.jpg')}>
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Stack.Screen name="Log" component={Login} />
                <Stack.Screen name="Nav" component={Navigation} />
                {children}

            </SafeAreaView>
        </ImageBackground>
    );

render(){
    return (
    <this.Body loading={!this.state.isLoading}>
        <NavigationContainer>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        keyboardType={'email-address'}
                        autoCorrect={false}
                        autoCompleteType={'email'}
                        underlineColorAndroid="transparent"
                        placeholder="Enter your email / username"
                        placeholderTextColor="#c3c3c3"
                        autoCapitalize="none"
                        onChangeText={email => this.setState({ email })}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        underlineColorAndroid="transparent"
                        placeholder="Enter your password"
                        placeholderTextColor="#c3c3c3"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={pwd => this.setState({ pwd })}
                    />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={this.validateAndLogin}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </NavigationContainer>
</this.Body>
);
}
}
  const styles = StyleSheet.create({
    Body: {
        flex: 1,
    },
    Logo: {
        height: 60,
        resizeMode: 'contain',
        marginBottom: 15,
    },
    Title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textTransform: 'uppercase',
    },
    Select: {
        borderStyle: 'solid',
        borderColor: '#333333',
        borderWidth: 1,
        width: Dimensions.get('screen').width * 0.8,
        marginVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    SelectIcon: {
        width: 25,
        height: 25,
    },
    SelectText: {
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 10,
        color: '#c3c3c3',
    },
    SelectModal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    SelectListWrap: {
        height: Dimensions.get('screen').height * 0.6,
    },
    SelectList: {
        height: Dimensions.get('screen').height * 0.6 - 60,
        width: Dimensions.get('screen').width * 0.8,
        padding: 10,
        backgroundColor: '#ffffff',
    },
    SelectListItem: {
        fontSize: 18,
        paddingHorizontal: 5,
    },
    Input: {
        borderStyle: 'solid',
        borderColor: '#333333',
        borderWidth: 1,
        width: Dimensions.get('screen').width * 0.8,
        marginVertical: 10,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    InputIcon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    InputField: {
        fontSize: 18,
    },
    Button: {
        width: Dimensions.get('screen').width * 0.8,
        backgroundColor: '#4186c2',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    ButtonText: {
        fontSize: 18,
        color: '#ffffff',
        paddingVertical: 10,
    },
    Options: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    SocialButtons: {
        width: Dimensions.get('screen').width * 0.8,
        marginVertical: 10,
    },
    SocialButton: {
        width: '100%',
        height: 40,
        marginBottom: 10,
        resizeMode: 'contain',
    },
      container: {
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
      },

      image: {
          marginBottom: 40,
      },

      inputView: {
         backgroundColor: "#FFC0CB",
          borderRadius: 30,
          width: "70%",
          height: 45,
          marginBottom: 20,

          alignItems: "center",
      },

      TextInput: {
         height: 50,
          flex: 1,
          padding: 10,
          marginLeft: 20,
      },

      forgot_button: {
          height: 30,
          marginBottom: 30,
      },

      loginBtn: {
         width: "80%",
          borderRadius: 25,
          height: 50,
          alignItems: "center",
         justifyContent: "center",
          marginTop: 40,
          backgroundColor: "#0079fe",
      },
      loginText: {
          color: "white",
          fontWeight: "bold",
         fontSize: 18,
      },
  });

