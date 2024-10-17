// components/produto.js
import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function Produto({ cor, data, onDelete, onPress }) {
    return (
        <Pressable onPress={onPress} style={[{ borderColor: cor }, styles.container]} >
            <Text style={styles.text}>
                {data.nome}, {data.autor} - {data.quantidade}
            </Text>
            <TouchableOpacity onPress={onDelete} >
                <MaterialIcons name="delete" size={24} color="#F27A5E" />
            </TouchableOpacity>
        </Pressable>

    );
}

const styles = StyleSheet.create({
    container: {
        border: 1,
        borderColor: '#F27A5E',
        padding: 24,
        borderRadius: 5,
        gap: 12,
        flexDirection: "row",
        borderWidth:2,
    },
    text: {
        flex: 1,
    },
});
