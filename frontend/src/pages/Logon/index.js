import React, {useState} from 'react';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import { FiLogIn } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

export default function Logon() {
  const [id, setID] = useState('');
  const history = useHistory();
  async function handleLogin(e){
    e.preventDefault();
    try{
      const response = await api.post('sessions', {id});
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    }catch{
      alert('erro no login');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the hero" />
        <form onSubmit={handleLogin}>
          <input
          value={id}
          onChange = {e => setID(e.target.value)}
          type="text" placeholder="Sua ID"/>
          <button type="submit" className="button">Entrar</button>
        </form>
        <Link to="/register" className="back-link">
          <FiLogIn size={16} color="#e02041" />  Não tenho cadastro
        </Link>
      </section>
      <img src={heroesImg} alt="heroes" />
    </div>
  );
}