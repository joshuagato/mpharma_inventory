import { useState } from 'react';
import './index.scss';
import { latestPrice, productImages, generateRandomProductImage,
    formatDate, archived } from '../../globals';

const ArchivedProducts = ({ archivedProducts, allProducts, uuidv4 }) => {
    const [noSelect, setNoSelect] = useState(false);

    const disableSelect = () => setNoSelect(true);

    const enableSelect = () => setNoSelect(false);

    return (
        <section className="products">
            <h6 className="page-title">All Products</h6>

            {allProducts.length > 0 ? allProducts.map(product => (
                <div key={uuidv4()} className="product rotate moveFromBack" tabIndex={product.id}>
                    <div className="product-container" title="Click me">
                        <section className="picture-section">
                            <img src={generateRandomProductImage(productImages)} alt={product.name} />
                        </section>
                        <section className="info-section">
                            <p className="text-center mt-3 mb-3">
                            </p>
                            <h6 className="product-name text-center mb-3">{product.name}</h6>
                            <p className="product-price text-center">GHS {latestPrice(product.prices)}</p>
                            {archived(archivedProducts, product.id) ?
                                (<p className="product-status-indicator text-danger text-center">Archived</p>):
                                (<p className="product-status-indicator text-success text-center">In store</p>)}
                        </section>
                    </div>

                    <div className={`product-back ${noSelect ? 'noselect' : ''}`}
                         onTouchStart={disableSelect} onClick={disableSelect}
                         onTouchMove={disableSelect} onTouchEnd={enableSelect}>
                        <div className="product-back-content text-center">
                            <div className="latest-details">
                                <p className="product-name">{product.name}</p>
                                <p className="latest-price">Now GHS{latestPrice(product.prices)}</p>
                            </div>
                            <div className="product-state-indicator">
                                {archived(archivedProducts, product.id) ?
                                    (<p className="text-danger text-center">Archived</p>):
                                    (<p className="text-success text-center">In stock</p>)}
                            </div>
                            <div className="historical-prices-container">
                                <h6 className="historical-prices-heading">Historical Prices</h6>
                                {product.prices.length > 1 ?
                                    product.prices.map(({id, price, date}, index) => (
                                        <article key={uuidv4()}>
                                            {index > 0 ? (
                                                <div className="historical-prices-detail">
                                                    <p className="date">{formatDate(date)}</p>
                                                    <p className="price">GHS {price}</p>
                                                </div>
                                            ): ''}
                                        </article>

                                    )):
                                    <div className="historical-prices-detail">
                                        <p className="info">No History yet.</p>
                                        <hr />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )): <div className="text-center text-danger"><span>All Products list empty.</span></div>}
        </section>
    );
};

export default ArchivedProducts;