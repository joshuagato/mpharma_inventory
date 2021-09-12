import { useState } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { addNewProduct } from "../../store/actions";

const AddNewProduct = ({ onAddNewProduct, products, productsLength, pricesLength }) => {
    const [disableButton, setDisableButton] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const onAddNewProductHandler = (data) => {
        onAddNewProduct(data);
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
        // console.log({ products, newProduct })
    };

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
        onAddNewProduct: data => dispatch(addNewProduct(data))
    };
}

export default connect(null, mapDispatchToProps)(AddNewProduct);