import { SET_INITIAL_PRODUCTS, ADD_NEW_PRODUCT, REPORT_ERROR } from '../actions/action-types';

const initialState = {
    products: [],
    error: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIAL_PRODUCTS:
            return { ...state, products: [...new Set(state.products), ...new Set(action.data)] };
        case ADD_NEW_PRODUCT:
            return { ...state, products: [...state.products, action.data] };
        case REPORT_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default reducer;