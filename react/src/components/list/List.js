import React from 'react';
import Book from '../book/Book';

// {...book}  => Spread Operator

function List(props) {
    const { lang, books, price } = props;

    const filterByLang = (data) => {
        if (lang === '*') {
            return data;
        }
        return data.filter(book => book.lang === lang);
    };

    const filterByPrice = (data) => {
        switch (price) {
            case 'A':
                return data.filter(book => book.price >= 0 && book.price <= 1000);
            case 'B':
                return data.filter(book => book.price >= 1001 && book.price <= 20000);
            case 'C':
                return data.filter(book => book.price >= 20001 && book.price <= 10000000);
        
            default:
                return data;
        }
    };

    const filter = () => {
        let filteredBooks = [...books];
        filteredBooks = filterByLang(filteredBooks);
        filteredBooks = filterByPrice(filteredBooks);
        return filteredBooks;
    }


    return (
        <div className="d-flex flex-row flex-wrap">
            {
                filter().map(book => (<Book {...book} />))
            }
        </div>
    );
}

export default List;