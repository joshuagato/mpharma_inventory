import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { addNewProduct, addProductCompleteReset } from "../../store/actions";

const AddNewProduct = ({ onAddNewProductData, onAddProductCompleteReset, productsLength,
                           pricesLength, addProductComplete }) => {
    const [disableButton, setDisableButton] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const addProductFormRef = useRef(null);

    const scrollAddProductFormIntoView = () => {
        if (addProductFormRef && addProductFormRef.current) {
            addProductFormRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const onAddNewProductHandler = (data) => {
        onAddNewProductData(data);
    };

    const showFormHandler = () => {
        setShowForm(true);
        setDisableButton(true);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const newProduct = {
            id: productsLength + 1,
            name,
            prices: [{ id: pricesLength, price, date: new Date() }]
        }
        onAddNewProductHandler(newProduct);
    };

    const closeFormHandler = () => {
        setShowForm(false);
        setDisableButton(false);
    };

    useEffect(() => {
        const addProductCompleteHandler = () => {
            onAddProductCompleteReset(false);
            setName('');
            setPrice('');
            setDisableButton(false);
            setShowForm(false);
        };

        if (addProductComplete) addProductCompleteHandler();
    }, [addProductComplete]);

    useEffect(() => {
        if (showForm) scrollAddProductFormIntoView();
    }, [showForm]);

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
                         value={name} required />
                  <label htmlFor="name">
                      <span className="content-name">Product Name</span>
                  </label>
              </div>
              <div className="form-group">
                  <input type="number" name="price" onChange={e => setPrice(parseFloat(e.target.value))}
                         step={0.01} value={price} required />
                  <label htmlFor="price">
                      <span className="content-name">Product Price</span>
                  </label>
              </div>
              <div className="form-group mt-4">
                  <button type="submit">ADD PRODUCT</button>
              </div>

              <div id="close-form-button" className="form-group mt-4" ref={addProductFormRef}>
                  <button onClick={closeFormHandler}>CLOSE FORM</button>
              </div>
          </form>) : ''}
      </div>
  );
};

const mapDispatchToProps = dispatch => {
    return {
        onAddNewProductData: data => dispatch(addNewProduct(data)),
        onAddProductCompleteReset: addProductComplete => dispatch(addProductCompleteReset(addProductComplete))
    };
}

export default connect(null, mapDispatchToProps)(AddNewProduct);