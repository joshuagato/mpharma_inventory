const successOptions = {
    uid: '0001', // you can specify your own uid if required
    title: 'Congratulation!',
    message: 'Product Added Successfully',
    position: 'tr',
    autoDismiss: 3,
    level: 'success',
    action: {
        label: 'Hide Me!',
        callback: function () {}
    }
};

const errorOptions = {
    uid: '0002', // you can specify your own uid if required
    title: 'Caution!',
    message: 'Product Exists, Please Add New',
    position: 'tr',
    autoDismiss: 3,
    level: 'error',
    action: {
        label: 'Hide Me!',
        callback: function () {}
    }
};

export { successOptions, errorOptions };