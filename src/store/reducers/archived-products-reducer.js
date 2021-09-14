import { ADD_NEW_PRODUCT_TO_ARCHIVE, RESTORE_ARCHIVED_PRODUCT,
    RESTORE_FROM_ARCHIVE_COMPLETE_RESET } from '../actions/action-types';
import { sortProductListByIdAscendingOrder } from '../../globals';

const getCachedArchivedProductsState = variable => JSON.parse(localStorage.getItem('archivedProductsState'))?.[variable];

const initialState = {
    archivedProducts: getCachedArchivedProductsState('archivedProducts') || [],
    addToArchiveComplete: getCachedArchivedProductsState('addToArchiveComplete') || false,
    restoreFromArchiveComplete: getCachedArchivedProductsState('restoreFromArchiveComplete') || false
};

const removeProductById = (products, id) => products.filter(product => product.id !== id);

const reducer = (state = initialState, action) => {
    let currentState;
    switch (action.type) {
        case ADD_NEW_PRODUCT_TO_ARCHIVE:
            const newArchiveProductsList = [...state.archivedProducts, action.data];
            currentState = { ...state, addToArchiveComplete: true,
                archivedProducts: [...new Set(sortProductListByIdAscendingOrder(newArchiveProductsList))] };
            localStorage.setItem('archivedProductsState', JSON.stringify(currentState));
            return currentState;
        case RESTORE_ARCHIVED_PRODUCT:
            const oldProductsList = [...state.archivedProducts];
            const newProductsList = (removeProductById(state.archivedProducts, action.id));
            if (oldProductsList.length !== newProductsList.length &&
                newProductsList.length === oldProductsList.length - 1) {
                currentState = { ...state, archivedProducts: [...sortProductListByIdAscendingOrder(newProductsList)], restoreFromArchiveComplete: true };
                localStorage.setItem('archivedProductsState', JSON.stringify(currentState));
                return currentState;
            }
            localStorage.setItem('archivedProductsState', JSON.stringify(state));
            return state;
        case RESTORE_FROM_ARCHIVE_COMPLETE_RESET:
            currentState = { ...state, restoreFromArchiveComplete: action.restoreFromArchiveComplete };
            localStorage.setItem('archivedProductsState', JSON.stringify(currentState));
            return currentState;
        default:
            localStorage.setItem('archivedProductsState', JSON.stringify(state));
            return state;
    }
};

export default reducer;