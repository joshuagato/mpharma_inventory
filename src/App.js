import { useEffect } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import { notificationStyle, checkLengthOfPriceLists } from './globals';
import { fetchInitialProducts } from './store/actions';
import Products from './components/products';
import AddNewProduct from './components/add-new-product';

function App({ products, onFetchInitialProducts, notifications, deleteProductComplete,
               addProductComplete, addToArchiveComplete, restoreFromArchiveComplete,
               archivedProducts }) {

  const productsLength = products.length;
  const pricesLength = checkLengthOfPriceLists(products);

  useEffect(() => {
    onFetchInitialProducts();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Notifications notifications={notifications} style={notificationStyle} />

        <Products products={products} deleteProductComplete={deleteProductComplete}
                  addToArchiveComplete={addToArchiveComplete} pricesLength={pricesLength} />

        <AddNewProduct productsLength={productsLength} pricesLength={pricesLength}
           addProductComplete={addProductComplete}
           restoreFromArchiveComplete={restoreFromArchiveComplete} />
      </header>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    products: state.productsReducer.products,
    addProductComplete: state.productsReducer.addProductComplete,
    deleteProductComplete: state.productsReducer.deleteProductComplete,
    archivedProducts: state.archivedProductsReducer.archivedProducts,
    addToArchiveComplete: state.archivedProductsReducer.addToArchiveComplete,
    restoreFromArchiveComplete: state.archivedProductsReducer.restoreFromArchiveComplete,
    notifications: state.notifications
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchInitialProducts: () => dispatch(fetchInitialProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
