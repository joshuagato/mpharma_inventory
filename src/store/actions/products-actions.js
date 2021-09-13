import axios from 'axios';
import { success, error } from 'react-notification-system-redux';
import { addProductSuccessOptions, addProductErrorOptions } from './notifier-options';
import {
    SET_INITIAL_PRODUCTS, ADD_NEW_PRODUCT, ADD_PRODUCT_COMPLETE, ADD_PRODUCT_COMPLETE_RESET,
    DELETE_PRODUCT, DELETE_COMPLETE_RESET, EDIT_PRODUCT, EDIT_PRODUCT_COMPLETE_RESET
} from './action-types';

export const addProductCompleteReset = addProductComplete => {
    return { type: ADD_PRODUCT_COMPLETE_RESET, addProductComplete };
};

export const deleteProductCompleteReset = deleteProductComplete => {
    return { type: DELETE_COMPLETE_RESET, deleteProductComplete };
};

export const editProductCompleteReset = editProductComplete => {
    return { type: EDIT_PRODUCT_COMPLETE_RESET, editProductComplete };
};


const addProductCompleted = addProductComplete => {
    return { type: ADD_PRODUCT_COMPLETE, addProductComplete };
};

export const fetchInitialProducts = () => {
    return async dispatch => {
        try {
            const result = await axios.get('');
            if (result?.data) dispatch(setInitialProducts(result.data.products));
        } catch (err) {
            console.error(err);
        }
    };
};

const setInitialProducts = data => {
    return { type: SET_INITIAL_PRODUCTS, data }
};

const productExists = (existingProducts, newProduct) => {
    return existingProducts.some(({ name }) => name === newProduct.name);
};

const addNewProductHandler = (data) => {
    return { type: ADD_NEW_PRODUCT, data };
};

export const addNewProduct = newProduct => {
    return (dispatch, getState) => {
        const { products } = getState().productsReducer;
        if (productExists(products, newProduct)) {
            dispatch(error(addProductErrorOptions));
        }
        else {
            dispatch(addNewProductHandler(newProduct));
            dispatch(success(addProductSuccessOptions));
            dispatch(addProductCompleted(true));
        }
    };
};

export const editProduct = data => {
    return { type: EDIT_PRODUCT, data };
};

export const deleteProduct = id => {
    return { type: DELETE_PRODUCT, id };
};
