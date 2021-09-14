import { useEffect } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import { Switch, Route, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import { notificationStyle, checkLengthOfPriceLists, sortProductListByIdAscendingOrder } from './globals';
import { fetchInitialProducts } from './store/actions';
import Products from './components/products';
import ArchivedProducts from './components/archived-products';
import AllProducts from './components/all-products';
import AddNewProduct from './components/add-new-product';
import Head from './components/head';

function App({ products, onFetchInitialProducts, notifications, deleteProductComplete,
               addProductComplete, addToArchiveComplete, restoreFromArchiveComplete,
               archivedProducts, allProducts }) {

  const productsLength = products.length;
  const pricesLength = checkLengthOfPriceLists(products);

  useEffect(() => {
    onFetchInitialProducts();
  }, []);

  const location = useLocation();

  return (
    <div className="App">
        <Notifications notifications={notifications} style={notificationStyle} />

        <Head />

        <SwitchTransition>
          <CSSTransition timeout={400} classNames="fade" key={location.pathname} unmountOnExit>
            <Switch location={location}>
              <Route exact path="/products">
                <Products products={products} deleteProductComplete={deleteProductComplete}
                          addToArchiveComplete={addToArchiveComplete}
                          pricesLength={pricesLength} uuidv4={uuidv4} />

                <AddNewProduct productsLength={productsLength} pricesLength={pricesLength}
                               addProductComplete={addProductComplete}
                               restoreFromArchiveComplete={restoreFromArchiveComplete} />
              </Route>
              <Route exact path="/archived">
                <ArchivedProducts archivedProducts={archivedProducts} products={products}
                    deleteProductComplete={deleteProductComplete} uuidv4={uuidv4}
                      restoreFromArchiveComplete={restoreFromArchiveComplete}
                          addToArchiveComplete={addToArchiveComplete} pricesLength={pricesLength} />
              </Route>
              <Route exact path="/all">
                <AllProducts allProducts={allProducts} products={products}
                    deleteProductComplete={deleteProductComplete} uuidv4={uuidv4}
                    restoreFromArchiveComplete={restoreFromArchiveComplete}
                             archivedProducts={archivedProducts}
                    addToArchiveComplete={addToArchiveComplete} pricesLength={pricesLength} />
              </Route>
              <Route exact path="/">
                <Products products={products} deleteProductComplete={deleteProductComplete}
                          uuidv4={uuidv4}
                          addToArchiveComplete={addToArchiveComplete} pricesLength={pricesLength} />

                <AddNewProduct productsLength={productsLength} pricesLength={pricesLength}
                               addProductComplete={addProductComplete}
                               restoreFromArchiveComplete={restoreFromArchiveComplete} />
              </Route>
            </Switch>
          </CSSTransition>
        </SwitchTransition>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    products: state.productsReducer.products,
    allProducts: sortProductListByIdAscendingOrder([...new Set([...state.productsReducer.products, ...state.archivedProductsReducer.archivedProducts])]),
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
