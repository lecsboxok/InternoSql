// components/produto.js
import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function Produto({ cor, data, onDelete, onPress }) {
    return (
        <Pressable onPress={onPress} style={[{ borderColor: cor }, styles.container]} >
            <Text style={styles.text}>
                {data.quantidade} - {data.nome}
            </Text>
            <TouchableOpacity onPress={onDelete} >
                <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
        </Pressable>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#CECECE",
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
