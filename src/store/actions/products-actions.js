import axios from 'axios';
import { success, error } from 'react-notification-system-redux';
import { addProductSuccessOptions, addProductErrorOptions } from './notifier-options';
import {SET_INITIAL_PRODUCTS, ADD_NEW_PRODUCT, EXECUTION_COMPLETE, DELETE_PRODUCT} from './action-types';

export const executionCompleteHandler = complete => {
    return { type: EXECUTION_COMPLETE, complete };
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
            dispatch(executionCompleteHandler(true));
        }
    };
};

export const deleteProduct = id => {
    return { type: DELETE_PRODUCT, id };
};
