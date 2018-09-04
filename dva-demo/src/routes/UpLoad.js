import React from 'react';
import { connect } from 'dva';
import UpLoadCom from '../components/upLoad'
import { Icon } from 'antd';

const UploadButton = ({ state }) => {
  console.log('state----------->', state)
  return (
    <div className='UploadButton-container'>
      <Icon type={ state.loading ? 'loading' : 'plus' } />
      <div className="ant-upload-text">选择上传图片</div>
    </div>
  )
}

const UpLoad = props => {
  console.log('UpLoad props----------->', props);
  const handleUpload = imgUrl => {
    console.log('in handleUpload------------>', imgUrl)
  }
  return (
    <div className='UpLoadCom-container'>
      <UpLoadCom handleUpload={ handleUpload } CustomizeButton={ <UploadButton /> } />
    </div>
  );
}

export default connect(({ upLoad }) => ({
  upLoad,
}))(UpLoad);
