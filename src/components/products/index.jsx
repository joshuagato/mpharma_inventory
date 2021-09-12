import { useRef, useState } from 'react';
import './index.scss';
import { latestPrice, productImages, generateRandomProductImage, formatDate } from '../../globals';

const Products = ({ products }) => {
    const [noSelect, setNoSelect] = useState(false);
    const productBack = useRef([]);

    const disableSelect = () => {
        console.log('TRIGGER');
        setNoSelect(true);
    };

    const enableSelect = () => {
        console.log('TRIGGER');
        setNoSelect(false);
    };

    return (
        <section className="products">
            {products.map(product => (
                <div key={product.id} className="product rotate moveFromBack" tabIndex="0">
                    <div className="product-container" title="Click me">
                        <section className="picture-section">
                            <img src={generateRandomProductImage(productImages)} alt={product.name} />
                        </section>
                        <section className="info-section">
                            <p className="product-category text-center mt-3 mb-3">
                            </p>
                            <h6 className="product-name text-center mb-3">{product.name}</h6>
                            <p className="product-price text-center">GHS {latestPrice(product.prices)}</p>
                        </section>
                    </div>

                    <div className={`product-back ${noSelect ? 'noselect' : ''}`} ref={productBack}
                         onTouchStart={disableSelect} onClick={disableSelect} onTouchMove={disableSelect}
                            onTouchEnd={enableSelect}>
                        <div className="product-back-content text-center">
                            <div className="latest-details">
                                <p className="product-name">{product.name}</p>
                                <p className="latest-price">Now GHS{latestPrice(product.prices)}</p>
                            </div>
                            <div className="historical-prices-container">
                                <h6 className="historical-prices-heading">Historical Prices</h6>
                                {product.prices.length > 1 ?
                                    product.prices.map(({id, price, date}, index) => (
                                        <>
                                            {index > 0 ? (
                                                <div key={id} className="historical-prices-detail">
                                                    <p className="date">{formatDate(date)}</p>
                                                    <p className="price">GHS {price}</p>
                                                    <hr />
                                                </div>
                                            ): ''}
                                        </>

                                    )):
                                    <div className="historical-prices-detail">
                                        <p className="info">No History yet.</p>
                                        <hr />
                                    </div>
                                }
                            </div>
                            <span className="button" title="Edit Here">EDIT</span>
                            <div style={{ display: 'block' }}></div>
                            <i className="fa fa-trash fa-2x style-icon" title="Delete"></i>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Products;