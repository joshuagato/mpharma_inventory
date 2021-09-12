import axios from 'axios';
import { success, error } from 'react-notification-system-redux';
import { addProductSuccessOptions, addProductErrorOptions } from './notifier-options';
import { ADD_NEW_PRODUCT_TO_ARCHIVE, RESTORE_ARCHIVED_PRODUCT } from './action-types';

export const addNewProductToArchive = data => {
    return { type: ADD_NEW_PRODUCT_TO_ARCHIVE, data };
};

export const restoreArchivedProduct = id => {
    return { type: RESTORE_ARCHIVED_PRODUCT, id };
};
