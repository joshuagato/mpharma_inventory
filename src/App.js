import { useEffect } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import { Switch, Route, useLocation, render } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { notificationStyle, checkLengthOfPriceLists } from './globals';
import { fetchInitialProducts } from './store/actions';
import Products from './components/products';
import AddNewProduct from './components/add-new-product';
import Head from './components/head';

function App({ products, onFetchInitialProducts, notifications, deleteProductComplete,
               addProductComplete, addToArchiveComplete, restoreFromArchiveComplete,
               archivedProducts }) {

  const productsLength = products.length;
  const pricesLength = checkLengthOfPriceLists(products);

  useEffect(() => {
    onFetchInitialProducts();
  }, []);

  const location = useLocation();

  const ProductsElement = (<Products products={products} deleteProductComplete={deleteProductComplete}
                                     addToArchiveComplete={addToArchiveComplete} pricesLength={pricesLength} />);

  return (
    <div className="App">
        <Notifications notifications={notifications} style={notificationStyle} />

        <Head />

        <SwitchTransition>
          <CSSTransition timeout={400} classNames="fade" key={location.key} unmountOnExit>
            <Switch location={location}>
              <Route exact path="/products" element={ProductsElement}>
                <Products products={products} deleteProductComplete={deleteProductComplete}
                          addToArchiveComplete={addToArchiveComplete} pricesLength={pricesLength} />
              </Route>
              <Route exact path="/archived">
                <Products products={products} deleteProductComplete={deleteProductComplete}
                          addToArchiveComplete={addToArchiveComplete} pricesLength={pricesLength} />
              </Route>
              <Route exact path="/all">
                <Products products={products} deleteProductComplete={deleteProductComplete}
                          addToArchiveComplete={addToArchiveComplete} pricesLength={pricesLength} />
              </Route>
              <Route exact path="/">
                <Products products={products} deleteProductComplete={deleteProductComplete}
                          addToArchiveComplete={addToArchiveComplete} pricesLength={pricesLength} />
              </Route>
            </Switch>
          </CSSTransition>
        </SwitchTransition>

        <AddNewProduct productsLength={productsLength} pricesLength={pricesLength}
           addProductComplete={addProductComplete}
           restoreFromArchiveComplete={restoreFromArchiveComplete} />
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
