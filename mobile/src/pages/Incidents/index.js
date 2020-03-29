import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const navigation = useNavigation();

    function navigateToDetail(){
        navigation.navigate('Detail');
    }

    useEffect( ( )=>{

        async function loadIncidents(){
            const response = await api.get('ongs');
            
            setIncidents(response.data);
        }
    });
    return(
        <View style={ styles.container}>

            <View style={styles.header}>
                <Image source={ logoImg }/>
                <Text style= { styles.headerText }>
                    Total de <Text style={ styles.headerTextBold }>0 casos</Text>.
                </Text>
            </View>

            <Text style={ styles.title }>Bem-vindo!</Text>
            <Text style= { styles.description }>Escolha um dos casos abaixo e salve o dia.</Text>
            
            <FlatList 
                data = {incidents}
                //copiando o estilo para dentro do flatlist
                style={ styles.incidentList }
                //extraindo os valores unicos do parametro
                keyExtractor={incident => String(incident.id)}
                //retirando a barrinha do lado
                showsVerticalScrollIndicator={false}
                renderItem={ ( { item: incident } ) => (
                    <View style={ styles.incident }>
                        <Text style={ styles.incidentProperty }>ONG:</Text>
                        <Text style={ styles.incidentValue }>{incident.name}</Text>

                        <Text style={ styles.incidentProperty }>CASO:</Text>
                        <Text style={ styles.incidentValue }>{incident.description}</Text>

                        <Text style={ styles.incidentProperty }>VALOR:</Text>
                        <Text style={ styles.incidentValue }>{incident.value}</Text>
                        <TouchableOpacity 
                            style={ styles.detailsButton }
                            onPress={ navigateToDetail }>
                                <Text style = { styles.detailsButtonText }>Ver mais detalhes</Text>
                                <Feather name='arrow-right' size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View>
                ) }
            />
        </View>
        
    );
}