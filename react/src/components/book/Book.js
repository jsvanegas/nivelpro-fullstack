import React from 'react';

function Book(props) {

    const { title, author, lang, price, currency } = props;

    return (
        <div className="card m-1" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{author}</h6>
                <a href="#" className="card-link">{lang}</a>
                <a href="#" className="card-link">{price} {currency}</a>
            </div>
        </div>
    );
}

export default Book;