import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Card} from './Card';

export function CategoryCard({category, onPress}) {
    return (
        <Card key={category.id} style={styles.card} onPress={onPress}>
            <Image
                //TODO: Change image
                style={styles.thumb}
                source={{uri: "https://meacrosstheworld.com/wp-content/uploads/2020/06/placeholder.png"}}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{category.categoriaNome}</Text>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 20,
    },
    thumb: {
        height: 260,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    infoContainer: {
        padding: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        fontWeight: '400',
        color: '#787878',
    },
});