import { SET_INITIAL_PRODUCTS, ADD_NEW_PRODUCT, ADD_PRODUCT_COMPLETE, ADD_PRODUCT_COMPLETE_RESET,
    DELETE_PRODUCT, DELETE_COMPLETE_RESET } from '../actions/action-types';

const initialState = {
    products: [],
    addProductComplete: false,
    deleteProductComplete: false,
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
        case DELETE_PRODUCT:
            const oldProductsList = [...state.products];
            const newProductsList = (removeProductById(state.products, action.id));
            if (oldProductsList.length !== newProductsList.length &&
                newProductsList.length === oldProductsList.length - 1)
                return { ...state, products: [...newProductsList], deleteProductComplete: true };
            else return state;
        case DELETE_COMPLETE_RESET:
            return { ...state, deleteProductComplete: action.deleteProductComplete };
        default:
            return state;
    }
};

export default reducer;