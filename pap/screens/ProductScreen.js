import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import {ProductCard} from '../components/ProductCard';

export function ProductScreen({route,navigation}) {
    // if routes.params is undefined create variable category with value of 0 , else category will have the value of the routes.params
    let category;
    if(route.params === undefined){
        category = 0;
    }else{
        category = route.params.category;
    }
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
                    keyExtractor={({ produtoId }) => produtoId}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            onPress={() => {
                                    navigation.navigate('ProductDetail', {
                                        product: item
                                    });
                                }
                            }
                        />
                    )}
                />
            )}
        </View>
    );
};
