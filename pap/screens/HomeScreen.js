import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import {CategoryCard} from '../components/CategoryCard';
import {ProductScreen} from '../screens/ProductScreen';


export function HomeScreen({navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getCategories = async () => {
        try {
            const response = await fetch('https://bar.aemgnascente.pt/categories.php?table=categories');
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
                    keyExtractor={({ categoriaId }, index) => categoriaId}
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
};
