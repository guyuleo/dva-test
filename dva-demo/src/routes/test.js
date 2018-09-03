import React from 'react';
import { connect } from 'dva';
import List from '../components/list';

const testList = props => {
  const { products, dispatch } = props
  console.log('testList props--------->', props);
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <List onDelete={ handleDelete } products={ products } />
    </div>
  );
};

// export default Products;
export default connect(({ products }) => ({
  products,
}))(testList);
