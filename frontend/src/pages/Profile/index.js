import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';
import './styles.css';

export default function Profile(){

    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() => {
        api.get('profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        });
    },[ongId]);

    async function handleDeleteItem(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization : ongId,
                }
            });

            //atualizando assim que o incident for excluido em tempo real sem
            //precisar recarregar a página
            setIncidents(incidents.filter(incidents => incidents.id !== id));
        }catch(err){
            alert('Erro ao criar caso.');
        }
    }
   
    async function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className='profile-container'>
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className='button' to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type='button'>
                    <FiPower size={18} color='#E02041'/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                <li>
                    {incidents.map(incident => (
                        <li key={incident.id}>
                             <strong>CASO:</strong>
                             <p>{incident.title}</p>
         
                             <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>
         
                             <strong>VALOR:</strong>
                             <p>{Intl.NumberFormat('pt-br', {
                                 style: 'currency',
                                 currency: 'BRL'
                             }).format(incident.value)}
                             </p>
         
                             <button onClick={() => handleDeleteItem(incident.id)}>
                                 <FiTrash2 size={20} color="#A8A8B3"/>
                             </button>
                         </li>
                    ))
                    }
                </li>
            </ul>
        </div>
    );
}