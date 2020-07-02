import React, { useState } from 'react';

import List from '../list/List';
import booksList from '../../books-data';

function BooksApp() {
    // let lang = '*';
    const [lang, setLang] = useState('*');
    const [price, setPrice] = useState('A');

    const setLangFilter = (event) => {
        setLang(event.currentTarget.value);
    }

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
            <List books={booksList} lang={lang} price={price} />

        </div>
    );
}

export default BooksApp;