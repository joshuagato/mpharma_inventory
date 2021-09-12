import {SET_INITIAL_PRODUCTS, ADD_NEW_PRODUCT, EXECUTION_COMPLETE, DELETE_PRODUCT} from '../actions/action-types';

const initialState = {
    products: [],
    productOperationComplete: false
};

const removeProductById = (products, id) => products.filter(product => product.id !== id);

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIAL_PRODUCTS:
            return { ...state, products: [...new Set(state.products), ...new Set(action.data)] };
        case ADD_NEW_PRODUCT:
            return { ...state, products: [...state.products, action.data] };
        case EXECUTION_COMPLETE:
            return { ...state, productOperationComplete: action.productOperationComplete };
        case DELETE_PRODUCT:
            const oldProductsList = [...state.products];
            const newProductsList = (removeProductById(state.products, action.id));
            if (oldProductsList.length !== newProductsList.length &&
                newProductsList.length === oldProductsList.length - 1)
                return { ...state, products: [...newProductsList], productOperationComplete: true };
            else return state;
        default:
            return state;
    }
};

export default reducer;