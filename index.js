import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, TextInput, Alert, FlatList } from 'react-native';
import { usarBD } from './hooks/usarBD';
import { Produto } from './components/produto';

export function Index() {

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [pesquisa, setPesquisa] = useState('');
    const [produtos, setProdutos] = useState([]);


    const produtosBD = usarBD();

    async function create() {
        if (isNaN(quantidade)) {
            return Alert.alert('Quantidade', 'A quantidade precisa ser um número!');
        }
        try {
            const item = await produtosBD.create({
                nome,
                quantidade: Number(quantidade),
            });
            Alert.alert('Produto cadastrado com o ID: ' + item.idProduto);
            setId(item.idProduto);
            listar();
        } catch (error) {
            console.log(error);
        }
    }

    async function listar() {
        try {
            const captura = await produtosBD.read(pesquisa)
            setProdutos(captura)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listar();
    }, [pesquisa]);

    async function zeraCampos() {
        setId('');
        setNome('');
        setQuantidade('');
        await listar();

    }

    function detalhes(item) {
        setId(item.id);
        setNome(item.nome);
        setQuantidade(String(item.quantidade));
    }

    async function salvar() {

        if (id) {
            await atualizar();
        } else {
            await create();
        }

        await zeraCampos();
    };

    const remove = async (id) => {
        try {
            await produtosBD.remove(id);
            await listar();
        } catch (error) {
            console.log(error);
        }
    };

    async function atualizar() {
        if (isNaN(quantidade)) {
            return Alert.alert('Quantidade', 'A quantidade precisa ser um número!');
        }
        try {
            await produtosBD.update({
                id,
                nome,
                quantidade
            });
            Alert.alert('Produto atualizado!');
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <View style={styles.container}>
            <TextInput style={styles.texto} placeholder="Nome" onChangeText={setNome} value={nome} />
            <TextInput style={styles.texto} placeholder="Quantidade" onChangeText={setQuantidade} value={quantidade} />
            <Button title="Salvar" onPress={salvar} />
            <TextInput style={styles.texto} placeholder="Pesquisar" onChangeText={setPesquisa} />
            <FlatList
                contentContainerStyle={styles.listContent}
                data={produtos}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <Produto
                        data={item}
                        cor={item.nome === nome ? "#000" : "#CECECE"}
                        onDelete={() => del(item.id)}
                        onPress={item.nome === nome ? zeraCampos : () => detalhes(item)}
                    />
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 32,
        gap: 16,
    },
    texto: {
        height: 54,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "#999",
        paddingHorizontal: 16,
    },
    listContent: {
        gap: 16,
    },
});