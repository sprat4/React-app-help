import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import {CategoryCard} from '../components/CategoryCard';
import {ProductScreen} from './ProductScreen';


export function HomeScreen({navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getCategories = async () => {
        try {
            const response = await fetch(//Link for my server, only return categories);
            const json = await response.json();
            setData(json.categories)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={data}
                    keyExtractor={({ categoriaId }) => categoriaId}
                    renderItem={({ item }) => (
                        <CategoryCard
                            category={item}
                            onPress={() => navigation.navigate('ProductScreen', {
                                 category: item.categoriaId,
                            })
                            }
                        />
                    )}
                />
            )}
        </View>
    );
}
