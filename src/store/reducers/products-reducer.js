import {SET_INITIAL_PRODUCTS, ADD_NEW_PRODUCT, EXECUTION_COMPLETE, DELETE_PRODUCT} from '../actions/action-types';

const initialState = {
    products: [],
    complete: false
};

const removeProductById = (products, id) => products.filter(product => product.id !== id);

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIAL_PRODUCTS:
            return { ...state, products: [...new Set(state.products), ...new Set(action.data)] };
        case ADD_NEW_PRODUCT:
            return { ...state, products: [...state.products, action.data] };
        case EXECUTION_COMPLETE:
            return { ...state, complete: action.complete };
        case DELETE_PRODUCT:
            return { ...state, products: [...(removeProductById(state.products, action.id))] };
        default:
            return state;
    }
};

export default reducer;