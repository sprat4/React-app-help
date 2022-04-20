import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import {ProductCard} from '../components/ProductCard';


export function ProductScreen({route,navigation}) {
    const { category } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    let query= 'https://bar.aemgnascente.pt/categories.php?table=products&category='+category;


    const getProducts = async () => {
        try {
            const response = await fetch(query);
            const json = await response.json();
            setData(json.products);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, [category]);



    return (
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={data}
                    keyExtractor={({ produtoId }, index) => produtoId}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            onPress={() =>
                                navigation.navigate('ProfileScreen')
                            }
                        />
                    )}
                />
            )}
        </View>
    );
};
