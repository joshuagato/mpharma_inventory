import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import EditProduct from '../edit-existing-product';
import { success } from 'react-notification-system-redux';
import { deleteProductSuccessOptions } from '../../store/actions/notifier-options';
import './index.scss';
import { deleteProduct, deleteProductCompleteReset, addNewProductToArchive,
    addToArchiveCompleteReset } from '../../store/actions'
import { latestPrice, productImages, generateRandomProductImage,
    formatDate, setNewArchiveProductHandler, findProductForEditing } from '../../globals';

const Products = ({ products, onDeleteProduct, deleteProductComplete, onDeleteProductCompleteReset,
                      onAddToArchiveCompleteReset, onSuccess, onAddNewProductToArchive,
                      addToArchiveComplete, pricesLength, uuidv4 }) => {
    const [noSelect, setNoSelect] = useState(false);
    const [newArchiveProduct, setNewArchiveProduct] = useState({});
    const productBack = useRef([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [productForEditing, setProductForEditing] = useState({});

    const disableSelect = () => setNoSelect(true);

    const enableSelect = () => setNoSelect(false);

    const deleteHandler = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You can be able to revert it afterwards anyway!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setNewArchiveProductHandler(products, id, setNewArchiveProduct);
                onDeleteProduct(id);
            }
        });
    };

    const triggerSetProductForEditing = id => {
        setProductForEditing(prevState => Object.assign(prevState, findProductForEditing(products, id)));
    };

    const editHandler = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Please, confirm to continue!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, edit it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setProductForEditing(prevState => Object.assign(prevState, findProductForEditing(products, id)));
                setShowEditForm(true);
            }
        });
    };

    useEffect(() => {
        const deleteProductCompleteHandler = () => {
            onSuccess(deleteProductSuccessOptions);
            onAddNewProductToArchive(newArchiveProduct);
            onDeleteProductCompleteReset(false);
        };

        if (deleteProductComplete) deleteProductCompleteHandler();
    }, [deleteProductComplete]);

    useEffect(() => {
        const archiveProductCompleteHandler = () => onAddToArchiveCompleteReset(false);

        if (addToArchiveComplete) archiveProductCompleteHandler();
    }, [addToArchiveComplete]);

    return (
        <section className="products">
            <h6 className="page-title">Products</h6>
            {showEditForm ? <EditProduct setShowEditForm={setShowEditForm}
                                 pricesLength={pricesLength}
                                 triggerSetProductForEditing={triggerSetProductForEditing}
                                 productForEditing={productForEditing} /> : ''}
            {products.length > 0 ? products.map(product => (
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
                            <span className="button" title="Edit Here" onClick={id => editHandler(product.id)}>
                                EDIT
                            </span>
                            <div style={{ display: 'block' }}></div>
                            <i className="fa fa-trash fa-2x style-icon" title="Delete"
                               onClick={id => deleteHandler(product.id)}></i>
                        </div>
                    </div>
                </div>
            )): <div className="text-center text-danger"><span>Products list empty.</span></div>}
        </section>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteProduct: id => dispatch(deleteProduct(id)),
        onDeleteProductCompleteReset: deleteProductComplete => dispatch(deleteProductCompleteReset(deleteProductComplete)),
        onSuccess: options => dispatch(success(options)),
        onAddNewProductToArchive: data => dispatch(addNewProductToArchive(data)),
        onAddToArchiveCompleteReset: addToArchiveComplete => dispatch(addToArchiveCompleteReset(addToArchiveComplete)),
    };
};

export default connect(null, mapDispatchToProps)(Products);