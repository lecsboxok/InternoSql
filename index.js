import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Alert, FlatList, Pressable, Text } from 'react-native';
import { usarBD } from './hooks/usarBD';
import { Produto } from './components/produto';
import { MaterialIcons } from '@expo/vector-icons';

export function Index() {

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [autor, setAutor] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [pesquisa, setPesquisa] = useState('');
    const [produtos, setProdutos] = useState([]);


    const produtosBD = usarBD();

    async function create() {
        if (isNaN(quantidade)) {
            return Alert.alert('Ano de Publicação', 'O Ano de Publicação precisa ser um número!');
        }
        try {
            const item = await produtosBD.create({
                nome,
                autor,
                quantidade: Number(quantidade),
            });
            Alert.alert('Livro cadastrado com o ID: ' + item.idProduto);
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
        setAutor('');
        setQuantidade('');
        await listar();

    }

    function detalhes(item) {
        setId(item.id);
        setNome(item.nome);
        setAutor(item.autor);
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
            return Alert.alert('Ano de Publicação', 'O Ano de Publicação somente números!');
        }
        try {
            await produtosBD.update({
                id,
                nome,
                autor,
                quantidade
            });
            Alert.alert('Cadastro do livro atualizado!');
        } catch (error) {
            console.log(error);
        }
    };


    return (

        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <MaterialIcons name="book" size={30} color="#000" />
                <Text style={styles.titulo}>Cadastro de Livros</Text>
            </View>
            <TextInput style={styles.texto} placeholder="Título" onChangeText={setNome} value={nome} />
            <TextInput style={styles.texto} placeholder="Autor" onChangeText={setAutor} value={autor} />
            <TextInput style={styles.texto} placeholder="Ano de Publicação" onChangeText={setQuantidade} value={quantidade} />
            <Pressable style={styles.botao} onPress={salvar}>
                <Text style={styles.textinho}>Salvar</Text>
            </Pressable>
            <TextInput style={styles.texto} placeholder="Pesquisar" onChangeText={setPesquisa} />
            <FlatList
                contentContainerStyle={styles.listContent}
                data={produtos}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <Produto
                        data={item}
                        cor={item.nome === nome ? "#000" : "#CECECE"}
                        onDelete={() => remove(item.id)}
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
        marginTop: 32,
    },
    texto: {
        height: 54,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#F2E2DF',
        paddingHorizontal: 16,
    },
    listContent: {
        gap: 16,
    },
    botao: {
        backgroundColor: '#F27A5E',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    textinho: {
        color: '#fff'
    },
    titulo: {
        fontSize: 25,
        fontWeight: '600',
    },
    cabecalho: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});