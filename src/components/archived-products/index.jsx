import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { success } from 'react-notification-system-redux';
import { restoreArchivedProductSuccessOptions } from '../../store/actions/notifier-options';
import './index.scss';
import { restoreArchivedProduct, addToArchiveCompleteReset,
            restoreFromArchiveCompleteReset } from '../../store/actions';
import { latestPrice, productImages, generateRandomProductImage,
    formatDate, setNewRestoreProductHandler } from '../../globals';
import {restoreOldProduct} from "../../store/actions/products-actions";

const ArchivedProducts = ({ products, archivedProducts, onRestoreArchivedProduct, restoreFromArchiveComplete,
                              onRestoreFromArchiveCompleteReset, onRestoreOldProduct, onSuccess, uuidv4 }) => {
    const [noSelect, setNoSelect] = useState(false);
    const [newRestoreProduct, setNewRestoreProduct] = useState({});
    const productBack = useRef([]);

    const disableSelect = () => setNoSelect(true);

    const enableSelect = () => setNoSelect(false);

    const restoreHandler = (id) => {
        setNewRestoreProductHandler(archivedProducts, id, setNewRestoreProduct);

        Swal.fire({
            title: 'Are you sure?',
            text: "You can revert this action afterwards anyway!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, restore it!'
        }).then((result) => {
            if (result.isConfirmed) onRestoreArchivedProduct(id);
        });
    };

    useEffect(() => {
        const restoreProductCompleteHandler = () => {
            onSuccess(restoreArchivedProductSuccessOptions);
            onRestoreOldProduct(newRestoreProduct);
            onRestoreFromArchiveCompleteReset(false);
        };

        if (restoreFromArchiveComplete) restoreProductCompleteHandler();
    }, [restoreFromArchiveComplete]);

    return (
        <section className="products">
            <h6 className="page-title">Archived Products</h6>

            {archivedProducts.length > 0 ? archivedProducts.map(product => (
                <div key={uuidv4()} className="product rotate moveFromBack" tabIndex={product.id}>
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
                                        <article key={uuidv4()}>
                                            {index > 0 ? (
                                                <div className="historical-prices-detail">
                                                    <p className="date">{formatDate(date)}</p>
                                                    <p className="price">GHS {price}</p>
                                                    <hr />
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
                            <span className="button" title="Edit Here" onClick={id => restoreHandler(product.id)}>
                                RESTORE
                            </span>
                        </div>
                    </div>
                </div>
            )): <div className="text-center text-danger"><span>Archived Products list empty.</span></div>}
        </section>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onRestoreArchivedProduct: id => dispatch(restoreArchivedProduct(id)),
        onRestoreFromArchiveCompleteReset: restoreFromArchiveComplete => dispatch(restoreFromArchiveCompleteReset(restoreFromArchiveComplete)),
        onSuccess: options => dispatch(success(options)),
        onRestoreOldProduct: data => dispatch(restoreOldProduct(data)),
        onAddToArchiveCompleteReset: addToArchiveComplete => dispatch(addToArchiveCompleteReset(addToArchiveComplete)),
    };
};

export default connect(null, mapDispatchToProps)(ArchivedProducts);