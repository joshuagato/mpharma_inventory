import axios from 'axios';
import { success, error } from 'react-notification-system-redux';
import { addProductSuccessOptions, addProductErrorOptions } from './notifier-options';
import {
    DELETE_COMPLETE_RESET,
    RESTORE_FROM_ARCHIVE_COMPLETE_RESET,
    ADD_NEW_PRODUCT_TO_ARCHIVE,
    RESTORE_ARCHIVED_PRODUCT
} from './action-types';

export const addToArchiveCompleteReset = addToArchiveComplete => {
    return { type: DELETE_COMPLETE_RESET, addToArchiveComplete };
};

export const restoreFromArchiveCompleteReset = restoreFromArchiveComplete => {
    return { type: RESTORE_FROM_ARCHIVE_COMPLETE_RESET, restoreFromArchiveComplete };
};

export const addNewProductToArchive = data => {
    return { type: ADD_NEW_PRODUCT_TO_ARCHIVE, data };
};

export const restoreArchivedProduct = id => {
    return { type: RESTORE_ARCHIVED_PRODUCT, id };
};
