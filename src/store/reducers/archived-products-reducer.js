import { ADD_NEW_PRODUCT_TO_ARCHIVE, RESTORE_ARCHIVED_PRODUCT } from '../actions/action-types';

const initialState = {
    archivedProducts: [],
    addToArchiveComplete: false,
    restoreFromArchiveComplete: false
};

const removeProductById = (products, id) => products.filter(product => product.id !== id);

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_PRODUCT_TO_ARCHIVE:
            return { ...state, archivedProducts: [...state.archivedProducts, action.data], addToArchiveComplete: true };
        case RESTORE_ARCHIVED_PRODUCT:
            const oldProductsList = [...state.archivedProducts];
            const newProductsList = (removeProductById(state.archivedProducts, action.id));
            if (oldProductsList.length !== newProductsList.length &&
                newProductsList.length === oldProductsList.length - 1)
                return { ...state, archivedProducts: [...newProductsList], restoreFromArchiveComplete: true };
            else return state;
        default:
            return state;
    }
};

export default reducer;