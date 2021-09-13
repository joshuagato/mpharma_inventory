const addProductSuccessOptions = {
    uid: '0001',
    title: 'Congratulation!',
    message: 'Product added successfully.',
    position: 'tr',
    autoDismiss: 1,
    level: 'success',
    action: {
        label: 'Hide Me!',
        callback: function () {}
    }
};

const addProductErrorOptions = {
    uid: '0002',
    title: 'Caution!',
    message: 'Product exists, Please add new.',
    position: 'tr',
    autoDismiss: 1,
    level: 'error',
    action: {
        label: 'Hide Me!',
        callback: function () {}
    }
};

const deleteProductSuccessOptions = {
    uid: '0003',
    title: 'Congratulation!',
    message: 'Product archived successfully.',
    position: 'tr',
    autoDismiss: 1,
    level: 'success',
    action: {
        label: 'Hide Me!',
        callback: function () {}
    }
};

const editProductSuccessOptions = {
    uid: '0004',
    title: 'Congratulation!',
    message: 'Product edited successfully.',
    position: 'tr',
    autoDismiss: 1,
    level: 'success',
    action: {
        label: 'Hide Me!',
        callback: function () {}
    }
};

export { addProductSuccessOptions, addProductErrorOptions, deleteProductSuccessOptions, editProductSuccessOptions };