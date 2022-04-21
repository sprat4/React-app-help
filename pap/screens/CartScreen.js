import {Text, View, Image, Platform, ScrollView, StyleSheet, ActivityIndicator, FlatList,} from "react-native";
import React, { useEffect, useState } from 'react';


export function CartScreen  () {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <View style={styles.profileBackground}>
                    <Image
                        style={styles.profilePhoto}
                        source={{
                            uri: 'data:image/jpeg;base64,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',
                        }}
                    />
                </View>
                <Text style={styles.title}>
                    Olá \nome/
                </Text>
            </View>
            <Text style={styles.title}> Encomenda Ativa </Text>
            <View style={styles.separator}/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile:{
        flex:1,
        marginTop:40,
        alignItems:'center',
        justifyContent:'center'
    },
    profileBackground:{
        width:160,
        maxHeight:160,
        borderRadius:80,
        backgroundColor: '#6b9cf5',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    profilePhoto:{
        width:150,
        height:150,
        borderRadius:75,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 2,
        width: '80%',
        borderRadius:1,
        backgroundColor: '#6b9cf5',
    },
});
