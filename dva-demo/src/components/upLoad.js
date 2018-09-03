import React from 'react';
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class UpLoad extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  // UNSAFE_componentWillMount(nextProps) {
  //   console.log('in UpLoad UNSAFE_componentWillMount-------->', this.props, nextProps);
  // }

  handleChange = info => {
    console.log('handleChange info990099090---------->', info);
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    // const { file = {} } = info
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }

    // if (info.file.originFileObj) {
    //   getBase64(info.file.originFileObj, imageUrl => this.setState({
    //     imageUrl,
    //     loading: false,
    //   }));
    // }

    // const formData = new FormData()
    // formData.append('file', file)
    // formData.append('https', `https://f1.otosaas.com/openPlatform/img/${ file.name }`)
    // console.log('requestBody--------->', file, `https://f1.otosaas.com/openPlatform/img/${ file.name }`);
    //
    // fetch('http://dpp.boluome.com/https/generate', { body: formData, method: 'post' })
    // .then(response => response.json())
    // .then(response => {
    //   const { code, data } = response
    //   if (code === 0) {
    //     console.log('data--------->', data);
    //   }
    // })
    // .catch(error => console.error('Error:', error))

  }

  customRequest = info => {
    console.log('customRequest info------------>', info);
    const { file = {} } = info
    const formData = new FormData()
    formData.append('file', file)
    formData.append('https', `https://f1.otosaas.com/openPlatform/img/${ file.name }`)
    console.log('requestBody--------->', file, `https://f1.otosaas.com/openPlatform/img/${ file.name }`);

    fetch('http://dpp.boluome.com/https/generate', { body: formData, method: 'post' })
    .then(response => response.json())
    .then(response => {
      const { code, data } = response
      if (code === 0) {
        console.log('data--------->', data);
      }
    })
    .catch(error => console.error('Error:', error))
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    console.log('imageUrl--------->', imageUrl);
    return (
      <div className='UpLoadCom-container'>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={ false }
          beforeUpload={ beforeUpload }
          onChange={ this.handleChange }
          customRequest={ this.customRequest }
        >
          { imageUrl ? <img src={ imageUrl } alt="avatar" /> : uploadButton }
        </Upload>
      </div>
    );
  }
}

export default UpLoad
