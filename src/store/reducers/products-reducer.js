import { SET_INITIAL_PRODUCTS, ADD_NEW_PRODUCT, EXECUTION_COMPLETE } from '../actions/action-types';

const initialState = {
    products: [],
    complete: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIAL_PRODUCTS:
            return { ...state, products: [...new Set(state.products), ...new Set(action.data)] };
        case ADD_NEW_PRODUCT:
            return { ...state, products: [...state.products, action.data] };
        case EXECUTION_COMPLETE:
            return { ...state, complete: action.complete };
        default:
            return state;
    }
};

export default reducer;