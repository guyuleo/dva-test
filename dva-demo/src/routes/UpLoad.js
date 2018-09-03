import React from 'react';
import { connect } from 'dva';
import UpLoadCom from '../components/upLoad'

const UpLoad = props => {
  console.log('UpLoad props----------->', props);
  return (
    <div className='UpLoadCom-container'>
      <UpLoadCom props={ props } />
    </div>
  );
}

export default connect(({ upLoad }) => ({
  upLoad,
}))(UpLoad);
