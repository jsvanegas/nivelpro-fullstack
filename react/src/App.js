import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import List from './components/list/List';

const booksList = [
  {
    title: 'Por quien doblan las campanas',
    author: 'Ernest hemingway',
    lang: 'ES',
    price: '45000',
    currency: 'COP'
  },
  {
    title: 'El hombre duplicado',
    author: 'Jose Saramago',
    lang: 'ES',
    price: '30000',
    currency: 'COP'
  },
  {
    title: 'Angeles y Demonios',
    author: 'Dan Brown',
    lang: 'ES',
    price: '50000',
    currency: 'COP'
  },
  {
    title: 'Crime and Punishment',
    author: 'Fiodor Dostojewski',
    lang: 'EN',
    price: '40',
    currency: 'USD'
  },
  {
    title: 'The Shinning',
    author: 'Stephen King',
    lang: 'EN',
    price: '1500000',
    currency: 'USD'
  }
];


function App() {

  // let lang = '*';
  const [lang, setLang] = useState('*');
  const [price, setPrice] = useState('A');

  const setLangFilter = (event) => {
    setLang(event.currentTarget.value);
  };

  const setPriceFilter = (event) => {
    setPrice(event.currentTarget.value);
  }

  return (
    <div className="App container">
      <div>
        <select onChange={setLangFilter}>
          <option value="*">All</option>
          <option value="EN">EN</option>
          <option value="ES">ES</option>
        </select>
        <select onChange={setPriceFilter}>
          <option value="A">1 - 1000</option>
          <option value="B">1001 - 20000</option>
          <option value="C">20001 - 100000</option>
        </select>
      </div>
      <List books={booksList} lang={lang} price={price}  />

    </div>
  );
}

export default App;
