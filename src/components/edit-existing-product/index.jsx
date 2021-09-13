import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { success } from "react-notification-system-redux";
import './index.scss';
import { latestPrice, checkIfProductEdited } from '../../globals';
import { editProductCompleteReset, editProduct } from '../../store/actions';
import { editProductSuccessOptions } from '../../store/actions/notifier-options';

const EditProduct = ({ setShowEditForm, pricesLength, productForEditing, triggerSetProductForEditing,
                         onEditProduct, editProductComplete, products, onEditProductCompleteReset,
                         onSuccess }) => {
    const id = productForEditing.id;
    const initialPrices = productForEditing.prices;
    const initialProductName = productForEditing.name;
    const initialProductPrice = latestPrice(productForEditing.prices);

    const checkForPriceUpdate = (initPrice, currPrice) => parseFloat(initPrice) !== parseFloat(currPrice);

    const [show, setShow] = useState(true);
    const [name, setName] = useState(initialProductName);
    const [price, setPrice] = useState(initialProductPrice);
    const [edited, setEdited] = useState(false);

    const handleClose = () => {
        setShow(false);
        setShowEditForm(false);
    }
    const handleShow = () => setShow(true);

    const submitHandler = event => {
        event.preventDefault();
        const priceChanged = checkForPriceUpdate(initialProductPrice, price);
        const prices = [...initialPrices];

        if (priceChanged) prices.push({ id: pricesLength + 1, price, date: new Date() });

        console.log({priceChanged, prices});

        const data = { id, name, prices };
        onEditProduct(data);
    }

    useEffect(() => {
        setEdited(checkIfProductEdited(initialProductName, name, initialProductPrice, price));
    }, [name, price, editProductComplete, products]);

    useEffect(() => {
        const editProductCompleteHandler = () => {
            onSuccess(editProductSuccessOptions);
            triggerSetProductForEditing(id);
            onEditProductCompleteReset(false);
        };

        if (editProductComplete) editProductCompleteHandler();
    }, [editProductComplete, products]);
    console.log({ productForEditing, products, initialProductName, name, initialProductPrice, price });

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><h4>Edit Product Here</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="edit-product-form" onSubmit={submitHandler}>
                        <div className="row">
                            <div className="my-3">
                                <label for="name">Product Name</label>
                                <input id="name" type="text" value={name} required
                                       onChange={e => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="my-3">
                                <label htmlFor="price">Product Price</label>
                                <input id="price" type="number" value={price} required
                                       step={0.01} onChange={e => setPrice(parseFloat(e.target.value))}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="my-3">
                                <button type="submit" disabled={!edited}>EDIT</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const mapStateToProps = state => {
    return {
        editProductComplete: state.productsReducer.editProductComplete,
        products: state.productsReducer.products,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEditProduct: data => dispatch(editProduct(data)),
        onSuccess: options => dispatch(success(options)),
        onEditProductCompleteReset: editProductComplete => dispatch(editProductCompleteReset(editProductComplete))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);