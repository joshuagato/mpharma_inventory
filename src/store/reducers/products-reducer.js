import {
    SET_INITIAL_PRODUCTS, ADD_NEW_PRODUCT, ADD_PRODUCT_COMPLETE, ADD_PRODUCT_COMPLETE_RESET,
    DELETE_PRODUCT, DELETE_COMPLETE_RESET, EDIT_PRODUCT, EDIT_PRODUCT_COMPLETE_RESET
} from '../actions/action-types';

import {
    sortProductListByIdAscendingOrder, removeProductById, getCachedProductsState, writeProductsStateToCache,
} from '../../globals';

const initialState = {
    products: getCachedProductsState('products') || [],
    addProductComplete: getCachedProductsState('addProductComplete') || false,
    deleteProductComplete: getCachedProductsState('deleteProductComplete') || false,
    editProductComplete: getCachedProductsState('editProductComplete') || false
};


const reducer = (state = initialState, action) => {
    let products;
    let currentState;
    switch (action.type) {
        case SET_INITIAL_PRODUCTS:
            products = [...new Set(sortProductListByIdAscendingOrder(action.data))];
            currentState = { ...state, products };
            writeProductsStateToCache(currentState);
            return currentState;
        case ADD_NEW_PRODUCT:
            products = [...new Set(sortProductListByIdAscendingOrder([...state.products, action.data]))];
            currentState = { ...state, products };
            writeProductsStateToCache(currentState);
            return currentState;
        case ADD_PRODUCT_COMPLETE:
            currentState = { ...state, addProductComplete: action.addProductComplete };
            writeProductsStateToCache(currentState);
            return currentState;
        case ADD_PRODUCT_COMPLETE_RESET:
            currentState = { ...state, addProductComplete: action.addProductComplete };
            writeProductsStateToCache(currentState);
            return currentState;
        case EDIT_PRODUCT:
            const oldProducts = [...state.products];
            const newProducts = (removeProductById(state.products, action.data.id));
            const finalProducts = [...newProducts, action.data];

            if (oldProducts.length !== newProducts.length &&
                newProducts.length === oldProducts.length - 1) {
                products = [...sortProductListByIdAscendingOrder(finalProducts)];
                currentState = { ...state, products, editProductComplete: true };
                writeProductsStateToCache(currentState);
                return currentState;
            }

            writeProductsStateToCache(state);
            return state;
        case EDIT_PRODUCT_COMPLETE_RESET:
            currentState = { ...state, editProductComplete: action.editProductComplete };
            writeProductsStateToCache(currentState);
            return currentState;
        case DELETE_PRODUCT:
            const oldProductsList = [...state.products];
            const newProductsList = (removeProductById(state.products, action.id));

            if (oldProductsList.length !== newProductsList.length &&
                newProductsList.length === oldProductsList.length - 1) {
                currentState = { ...state, products: [...sortProductListByIdAscendingOrder(newProductsList)], deleteProductComplete: true };
                writeProductsStateToCache(currentState);
                return currentState;
            }

            writeProductsStateToCache(state);
            return state;
        case DELETE_COMPLETE_RESET:
            currentState = { ...state, deleteProductComplete: action.deleteProductComplete };
            writeProductsStateToCache(currentState);
            return currentState;
        default:
            writeProductsStateToCache(state);
            return state;
    }
};

export default reducer;