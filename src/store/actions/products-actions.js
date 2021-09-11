import axios from 'axios';
import { success, error } from 'react-notification-system-redux';
import { successOptions, errorOptions } from './notifier-options';
import { SET_INITIAL_PRODUCTS, ADD_NEW_PRODUCT, REPORT_ERROR } from './action-types';

const errorNotifier = (error) => {
    return { type: REPORT_ERROR, error };
};

export const fetchInitialProducts = () => {
    return async dispatch => {
        try {
            const result = await axios.get('');
            if (result?.data) dispatch(setInitialProducts(result.data.products));
        } catch (error) {
            console.error(error);
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
            console.log('PRODUCT EXISTS');
            dispatch(errorNotifier('PRODUCT EXISTS'));
            dispatch(error(errorOptions));
        }
        else {
            dispatch(addNewProductHandler(newProduct));
            dispatch(success(successOptions));
        }
    };
};
