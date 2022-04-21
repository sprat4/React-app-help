import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeScreen } from './screens/HomeScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ProductScreen } from './screens/ProductScreen';
import { CartScreen } from './screens/CartScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}

const Tab = createMaterialBottomTabNavigator();

export function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="HomeScreen" component={HomeScreen}
                            // TODO: escolher nome para a página principal
                            options={{
                                headerShown: false,
                                tabBarLabel: 'Home',
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialCommunityIcons name="home" color={color} size={25} />
                                ),
                            }}
                />
                <Tab.Screen name="ProfileScreen" component={ProfileScreen}
                            options={{
                                headerShown: false,
                                tabBarLabel: 'Perfil',
                                tabBarIcon: ({ color, size }) => (
                                    <MaterialCommunityIcons name="account" color={color} size={25} />
                                ),
                            }}
                />
                <Tab.Screen  name="ProductScreen" component={ProductScreen}
                            options={{
                                tabBarLabel: 'Produtos',
                                tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="tag" color={color} size={25} />
                                ),
                            }}
                />
                <Tab.Screen  name="CartScreen" component={CartScreen}
                             options={{
                                 headerShown: false,
                                 tabBarLabel: 'Carrinho',
                                 labeled: false,
                                 tabBarIcon: ({ color, size }) => (
                                     <MaterialCommunityIcons name="cart" color={color} size={25} />
                                 ),
                             }}
                />
            </Tab.Navigator>
        </NavigationContainer>

    );
}