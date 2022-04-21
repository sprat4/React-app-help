import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './screens/HomeScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ProductScreen } from './screens/ProductScreen';
import { CartScreen } from './screens/CartScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

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
                                    <Ionicons name="home" color={color} size={size} />
                                ),
                            }}
                />
                <Tab.Screen name="ProfileScreen" component={ProfileScreen}
                            options={{
                                headerShown: false,
                                tabBarLabel: 'Perfil',
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="person" color={color} size={size} />
                                ),
                            }}
                />
                <Tab.Screen  name="ProductScreen" component={ProductScreen}
                            options={{
                                headerShown: false,
                                tabBarLabel: 'Produtos',
                                tabBarIcon: ({ color, size }) => (
                                <Ionicons name="cart" color={color} size={size} />
                                ),
                            }}
                />
                <Tab.Screen  name="CartScreen" component={CartScreen}
                             options={{
                                 headerShown: false,
                                 tabBarLabel: 'Carrinho',
                                 tabBarIcon: ({ color, size }) => (
                                     <Ionicons name="cart" color={color} size={size} />
                                 ),
                             }}
                />
            </Tab.Navigator>
        </NavigationContainer>

    );
}