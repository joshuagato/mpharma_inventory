import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { addNewProduct, executionCompleteHandler } from "../../store/actions";

const AddNewProduct = ({ onAddNewProductData, onExecutionComplete, productsLength,
                           pricesLength, productOperationComplete }) => {
    const [disableButton, setDisableButton] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const onAddNewProductHandler = (data) => {
        onAddNewProductData(data);
    };

    const executionCompleteHandler = () => {
        onExecutionComplete(false);
        setName('');
        setPrice('');
        setDisableButton(false);
        setShowForm(false);
    };

    const showFormHandler = () => {
        setShowForm(true);
        setDisableButton(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newProduct = {
            id: productsLength + 1,
            name,
            prices: [{ id: pricesLength, price, date: new Date() }]
        }

        onAddNewProductHandler(newProduct);
    };

    useEffect(() => {
        if (productOperationComplete) executionCompleteHandler();
    }, [productOperationComplete]);

  return (
      <div className="add-new-product-container">
          <div className="button-group">
              <button className="grow_ellipse" onClick={showFormHandler} disabled={disableButton}>
                  ADD NEW PRODUCT HERE
              </button>
          </div>
          {showForm ? (<form className="add-new-product-section moveFromTop" onSubmit={handleSubmit}>
              <div className="form-group">
                  <input type="text" name="name" onChange={e => setName(e.target.value)}
                         value={name} required/>
                  <label htmlFor="name">
                      <span className="content-name">Product Name</span>
                  </label>
              </div>
              <div className="form-group">
                  <input type="number" name="price" onChange={e => setPrice(parseFloat(e.target.value))}
                         value={price} required/>
                  <label htmlFor="price">
                      <span className="content-name">Product Price</span>
                  </label>
              </div>
              <div className="form-group mt-4">
                  <button type="submit">ADD</button>
              </div>
          </form>) : ''}
      </div>
  );
};

const mapDispatchToProps = dispatch => {
    return {
        onAddNewProductData: data => dispatch(addNewProduct(data)),
        onExecutionComplete: productOperationComplete => dispatch(executionCompleteHandler(productOperationComplete))
    };
}

export default connect(null, mapDispatchToProps)(AddNewProduct);