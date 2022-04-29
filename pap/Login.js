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
import { createStackNavigator } from '@react-navigation/stack';
import {Navigation} from "./Navigation";
import {NavigationContainer} from "@react-navigation/native";

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
    /*
       componentDidMount() {
           this.getDbList();
    }

       /*getDbList = () => {
           try {

               fetch('https://bar.aemgnascente.pt/user.php?username='+email+'&password='+password ,
                   {
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
           )
                   .then(response => {response.json()
                   .then(json => {
                               console.log('Database List :', json);
                               if (json.error) {
                                   console.log(json);
                                   return;
                               }
                               if (json.result) {
                                   this.setState({
                                       isLoading: false,
                                       dbList: [...json.result],
                                   });
                               } else {
                                   console.log(json);
                                   alert('No database exists');
                               }
                           })
                          .catch(error => {
                               console.log(error);
                           });
                   });
           } catch (error) {
               console.log(error);
           }
       };*/

    validateAndLogin = () => {

        Keyboard.dismiss();
        let mail = this.state.email;
        let pass = this.state.pwd;
        console.warn(mail)
        fetch('https://bar.aemgnascente.pt/user.php?username='+mail+'&password='+pass , {
            mode: 'cors',
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
                       if (json.error) {
                            console.log(json);
                            alert('Invalid email or password');
                            return;
                        }
                        console.log(json);
                        this.setState({
                            user: json.result,
                        });
                    })
                    .catch(error => {
                        console.log(error);

                    });
            })
    };

    Body = ({ children }) => (
        <ImageBackground style={styles.Body} source={require('./images/bg.jpg')}>
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {this.state.isLoading ? (
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator />
                        <TouchableOpacity style={styles.loginBtn} onPress={() => this.setState({isLoading: !this.state.isLoading})}>
                            <Text style={styles.loginText}>Hey</Text>
                        </TouchableOpacity>
                    </View>
                ) :
                    children
                }
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
                <TouchableOpacity style={styles.loginBtn} onPress={() => this.navigation.navigate('Nav')}>
                    <Text style={styles.loginText}>nav</Text>
                </TouchableOpacity>
            </View>
        </NavigationContainer>
</this.Body>
);
}
}
/*
 *
 *
 *             {<Stack.Screen name={'Login'} component={Login} />}
 *             {<Stack.Screen name={'Nav'} component={Navigation} />}
 *
 *             const Stack = createStackNavigator();
 *
 *
 *
 * export  function Login({navigation}) {
 *
 *     const [email, setEmail] = useState("");
 *     const [password, setPassword] = useState("");
 *
 *     function logUser(){
 *
 *
 *         return fetch ('https://bar.aemgnascente.pt/user.php?username='+email+'&password='+password, {
 *         method: "POST",
 *         body: JSON.stringify({
 *             email: this.state.email,
 *             password: this.state.password
 *         }),
 *         })
 *         .then((response) => response.json())
 *             .then((result) => {
 *                 if(result.user === true){
 *                     alert("You are logged in.");
 *                     this.navigation.navigate('Nav');
 *                 } else {
 *                     alert("“Please check your login information.”");
 *                 }
 *         });
 *
 *         //return console.warn('https://bar.aemgnascente.pt/user.php?username='+email+'&password='+password)
 *
 *         /*const response = await fetch('https://bar.aemgnascente.pt/user.php?username='+email+'&password='+password);
 *         const json = await response.json();
 *         try{
 *             if(json.user === true){
 *                 await storeData('email', email);
 *                 await storeData('password',password);
 *                 navigation.navigate('Nav');
 *             }
 *             else{
 *                 console.warn("Email ou Password incorretos");
 *             }
 *         }catch (err) {
 *             if(DocumentPicker.isCancel(err)) {
 *                 console.log("user cancelled");
 *             }
 *             throw err;
 *         }
 *
 *     return fetch('https://bar.aemgnascente.pt/user.php?username='+email+'&password='+password,{
 *             method: 'POST',
 *             headers: {
 *                 'Accept': 'application/json',
 *                 'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *                 username: email,
 *                 password: password
 *             })
 *         }
 *     )
 *         .then((response) => { return response.json() })
 *         .then(function(json){
 *             if(json.user === true){
 *                 storeData('email', email);
 *                 storeData('password',password);
 *                 navigation.navigate('Nav');
 *             }else{
 *                 console.warm("UH OH STINKY")
 *             }
 *         })
 *         .catch(function(error) {
 *             console.log('There has been a problem with your fetch operation: ' + error.message);
 *             // ADD THIS THROW error
 *             throw error;
 *         });
 *
 * }
 *
 *     function logUser() {
 *         return fetch('https://bar.aemgnascente.pt/user.php?username=' + email + '&password=' + password, {
 *             method: "POST",
 *             body: JSON.stringify({
 *                 email: email,
 *                 password: password
 *             }),
 *         })
 *             .then((response) => {
 *                 response.json()
 *             })
 *             .then(function (json) {
 *                 if (json.user === true) {
 *                     alert("You are logged in.");
 *                     navigation.navigate('Nav');
 *                 } else {
 *                     alert("“Please check your login information.”" + result.user);
 *                 }
 *             });
 *     }
 *
 *
 *     return (
 *         <NavigationContainer>
 *             <Stack.Screen name={'Login'} component={Login} />
 *             <Stack.Screen name={'Nav'} component={Navigation} />
 *
 *             <View style={styles.container}>
 *                 <StatusBar style="auto" />
 *                 <View style={styles.inputView}>
 *                     <TextInput
 *                         style={styles.TextInput}
 *                         placeholder="Email."
 *                         placeholderTextColor="#003f5c"
 *                         onChangeText={(email) => setEmail(email)}
 *                     />
 *                 </View>
 *                 <View style={styles.inputView}>
 *                     <TextInput
 *                         style={styles.TextInput}
 *                         placeholder="Password."
 *                         placeholderTextColor="#003f5c"
 *                         secureTextEntry={true}
 *                         onChangeText={(password) => setPassword(password)}
 *                     />
 *                 </View>
 *                 <TouchableOpacity style={styles.loginBtn} onPress={()=>logUser()}>
 *                     <Text style={styles.loginText}>LOGIN</Text>
 *                 </TouchableOpacity>
 *             </View>
 *         </NavigationContainer>
 *     );
 *
 * }
 */
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
