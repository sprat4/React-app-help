import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet,  Text,  View, Image,  TextInput, Button,  TouchableOpacity,} from "react-native";
import { storeData } from "./Services/User";
import { createStackNavigator } from '@react-navigation/stack';
//import screens from screens folder
import {Navigation} from "./Navigation";
import {NavigationContainer} from "@react-navigation/native";


const Stack = createStackNavigator();

export  function Login({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function logUser({navigation}){
        try {
            const response = await fetch('https://bar.aemgnascente.pt/user.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            });
            const json = await response.json();
            if(json.user === true){
                navigation.navigate('Nav');
                await storeData('email', email);
                await storeData('password',password);
            }
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <NavigationContainer>
            <Stack.Screen name={'Login'} component={Login} />
            <Stack.Screen name={'Nav'} component={Navigation} />

            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email."
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password."
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={()=>logUser()}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
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