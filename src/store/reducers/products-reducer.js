import {
    SET_INITIAL_PRODUCTS, ADD_NEW_PRODUCT, ADD_PRODUCT_COMPLETE, ADD_PRODUCT_COMPLETE_RESET,
    DELETE_PRODUCT, DELETE_COMPLETE_RESET, EDIT_PRODUCT, EDIT_PRODUCT_COMPLETE_RESET
} from '../actions/action-types';

import { sortProductListByIdAscendingOrder } from '../../globals'

const initialState = {
    products: [],
    addProductComplete: false,
    deleteProductComplete: false,
    editProductComplete: false
};

const removeProductById = (products, id) => products.filter(product => product.id !== id);

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIAL_PRODUCTS:
            return { ...state, products: [...new Set(state.products), ...new Set(action.data)] };
        case ADD_NEW_PRODUCT:
            return { ...state, products: [...state.products, action.data] };
        case ADD_PRODUCT_COMPLETE:
            return { ...state, addProductComplete: action.addProductComplete };
        case ADD_PRODUCT_COMPLETE_RESET:
            return { ...state, addProductComplete: action.addProductComplete };
        case EDIT_PRODUCT:
            const oldProducts = [...state.products];
            const newProducts = (removeProductById(state.products, action.data.id));
            const finalProducts = [...newProducts, action.data];
            if (oldProducts.length !== newProducts.length &&
                newProducts.length === oldProducts.length - 1)
                return { ...state, products: [...sortProductListByIdAscendingOrder(finalProducts)], editProductComplete: true };
            return state;
        case EDIT_PRODUCT_COMPLETE_RESET:
            return { ...state, editProductComplete: action.editProductComplete };
        case DELETE_PRODUCT:
            const oldProductsList = [...state.products];
            const newProductsList = (removeProductById(state.products, action.id));
            if (oldProductsList.length !== newProductsList.length &&
                newProductsList.length === oldProductsList.length - 1)
                return { ...state, products: [...newProductsList], deleteProductComplete: true };
            return state;
        case DELETE_COMPLETE_RESET:
            return { ...state, deleteProductComplete: action.deleteProductComplete };
        default:
            return state;
    }
};

export default reducer;