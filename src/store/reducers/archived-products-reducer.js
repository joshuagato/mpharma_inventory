import { ADD_NEW_PRODUCT_TO_ARCHIVE, RESTORE_ARCHIVED_PRODUCT,
    RESTORE_FROM_ARCHIVE_COMPLETE_RESET } from '../actions/action-types';
import { sortProductListByIdAscendingOrder, getCachedArchivedProductsState,
    writeArchivedProductsStateToCache, removeProductById } from '../../globals';

const initialState = {
    archivedProducts: getCachedArchivedProductsState('archivedProducts') || [],
    addToArchiveComplete: getCachedArchivedProductsState('addToArchiveComplete') || false,
    restoreFromArchiveComplete: getCachedArchivedProductsState('restoreFromArchiveComplete') || false
};

const reducer = (state = initialState, action) => {
    let currentState;
    switch (action.type) {
        case ADD_NEW_PRODUCT_TO_ARCHIVE:
            const newArchiveProductsList = [...state.archivedProducts, action.data];
            currentState = { ...state, addToArchiveComplete: true,
                archivedProducts: [...new Set(sortProductListByIdAscendingOrder(newArchiveProductsList))] };
            writeArchivedProductsStateToCache(currentState);
            return currentState;
        case RESTORE_ARCHIVED_PRODUCT:
            const oldProductsList = [...state.archivedProducts];
            const newProductsList = (removeProductById(state.archivedProducts, action.id));
            if (oldProductsList.length !== newProductsList.length &&
                newProductsList.length === oldProductsList.length - 1) {
                currentState = { ...state, archivedProducts: [...sortProductListByIdAscendingOrder(newProductsList)], restoreFromArchiveComplete: true };
                writeArchivedProductsStateToCache(currentState);
                return currentState;
            }

            writeArchivedProductsStateToCache(state);
            return state;
        case RESTORE_FROM_ARCHIVE_COMPLETE_RESET:
            currentState = { ...state, restoreFromArchiveComplete: action.restoreFromArchiveComplete };
            writeArchivedProductsStateToCache(currentState);
            return currentState;
        default:
            writeArchivedProductsStateToCache(state);
            return state;
    }
};

export default reducer;