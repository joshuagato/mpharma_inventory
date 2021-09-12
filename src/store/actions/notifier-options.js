const addProductSuccessOptions = {
    uid: '0001', // you can specify your own uid if required
    title: 'Congratulation!',
    message: 'Product added successfully.',
    position: 'tr',
    autoDismiss: 3,
    level: 'success',
    action: {
        label: 'Hide Me!',
        callback: function () {}
    }
};

const addProductErrorOptions = {
    uid: '0002', // you can specify your own uid if required
    title: 'Caution!',
    message: 'Product exists, Please add new.',
    position: 'tr',
    autoDismiss: 3,
    level: 'error',
    action: {
        label: 'Hide Me!',
        callback: function () {}
    }
};

const deleteProductSuccessOptions = {
    uid: '0001', // you can specify your own uid if required
    title: 'Congratulation!',
    message: 'Product deleted successfully.',
    position: 'tr',
    autoDismiss: 3,
    level: 'success',
    action: {
        label: 'Hide Me!',
        callback: function () {}
    }
};

export { addProductSuccessOptions, addProductErrorOptions, deleteProductSuccessOptions };