// Takes an array and returns its first item
const firstListItem = array => array[0];


// Sorts prices array based on Date in Descending order
const sortPriceListByDateDescendingOrder = array => {
    return array.sort(function(a, b) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;

        return 0;
    });
};


// Takes an array of objects and sorts its objects based on their id attributes in ascending order
const sortProductListByIdAscendingOrder = array => {
    return array.sort(function(a, b) {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });
};


/*
    Returns first price object in array sorted by Date in Descending order
    Assumes the first price data(object) is the latest data
*/
const latestPrice = array => firstListItem(sortPriceListByDateDescendingOrder(array))['price'];


// List of image-urls
const productImages = [
    'https://www.travelpharm.com/images/calpol-infant-suspension-sugar-free-p9065-14804_image.jpg',
    'data:image/jpeg;base64,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',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSloW_RHyISKCTRyj9qsdTp_PZ6gq3zEm5-Tg&usqp=CAU',
    'https://pharmaquick.net/wp-content/uploads/produit/EXFORGE_5_mg_160_mg_.jpg',
    'https://assets2.farmaciasanpablo.com.mx/uploads-prod/productimages/Fsp480Wx480H_7080429_1d6n18os7',
    'https://www.empr.com/wp-content/uploads/sites/7/2018/12/4fd1954588c54d5cbee84fcc3801f542-exforge_303182.jpg'
];


// Takes list of image-urls and return on randomly
const generateRandomProductImage = (productImages) => {
    return productImages[Math.floor(Math.random() * productImages.length)];
}


// Takes date-string and returns it in this form => 9/17/2016
const formatDate = date => new Date(date).toLocaleDateString("en-US");


//Optional styling for React-Notifier package
const notificationStyle = {
    NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
            margin: '10px 5px 2px 1px'
        },
        success: { // Applied only to the success notification item
            color: 'green'
        },
        error: {
            color: 'red'
        }
    }
};


// Loops through all price-arrays attached to each product object in products-list and return their total
const checkLengthOfPriceLists = (array) => {
    let total = 0;
    if (array?.length > 0) {
        array.map(eachProduct => total += eachProduct?.prices?.length);
    }
    return total;
};


/*
    - Checks if an product exists in the array-of-archived-products
    - Takes array-of-archived-products and id of product to check
    - Returns true or false based on the existence of the product in the list
*/
const archived = (archivedProducts, PID) => archivedProducts.some(({id}) => id === PID);


/*
    - Checks if an product exists in the array-of-products
    - Takes array-of-products and id of product to check
    - Returns the product as an object in case it exists in the list
*/
const findProduct = (products, PID) => products.find(({id}) => id === PID);


/*
    - Sets a product(object) to be deleted in state in order to be put in archive
    - Takes array-of-products, id of product in question and React's useState hook's setter method
    - find the product(object) in the product-list and sets it in state
*/
const setNewArchiveProductHandler = (products, PID, setNewArchiveProduct) => setNewArchiveProduct(findProduct(products, PID));


/*
    - Sets an archived-product(object) to be restored in state in order to be put back in products-list
    - Takes array-of-archived-products, id of archived-product in question and React's useState hook's setter method
    - find the archived-product(object) in the archived-product-list and sets it in state
*/
const setNewRestoreProductHandler = (products, PID, setNewRestoreProduct) => setNewRestoreProduct(findProduct(products, PID));


// Checks if product was edited and returns true or false based on finding
const checkIfProductEdited = (initName, currName, initPrice, currPrice) => {
    return initName.toString() !== currName.toString() || parseFloat(initPrice) !== parseFloat(currPrice);
};


// Finds a finds a product in the products-list based using its id
const findProductForEditing = (products, PID) => products.find(({ id }) => id === PID);


// Checks if a potential new product already exists using its name and returns true if it does
// and false if it doesn't
const productExists = (existingProducts, newProduct) => {
    return existingProducts.some(({ name }) => name === newProduct.name);
};


// Removes a product from the products-list using its id
const removeProductById = (products, id) => products.filter(product => product.id !== id);


// Takes a string representing the name of a cached state object in archivedProductsState and returns it's value
const getCachedArchivedProductsState = variable => JSON.parse(localStorage.getItem('archivedProductsState'))?.[variable];


// Takes an object representing the current archivedProductsState to be written to cache
const writeArchivedProductsStateToCache = currentState => localStorage.setItem('archivedProductsState', JSON.stringify(currentState));


// Takes a string representing the name of a cached state object in productsState and returns it's value
const getCachedProductsState = variable => JSON.parse(localStorage.getItem('productsState'))?.[variable];


// Takes an object representing the current archivedProductsState to be written to cache
const writeProductsStateToCache = currentState => localStorage.setItem('productsState', JSON.stringify(currentState));


export { latestPrice, generateRandomProductImage, productImages,
    formatDate, notificationStyle, checkLengthOfPriceLists, setNewArchiveProductHandler,
    setNewRestoreProductHandler, checkIfProductEdited, archived, findProductForEditing,
    sortProductListByIdAscendingOrder, productExists, removeProductById, getCachedProductsState,
    writeProductsStateToCache, getCachedArchivedProductsState, writeArchivedProductsStateToCache
};