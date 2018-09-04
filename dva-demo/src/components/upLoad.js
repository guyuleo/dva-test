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

    // if (info.file.status === 'done') {
    //   getBase64(info.file.originFileObj, imageUrl => this.setState({
    //     imageUrl,
    //     loading: false,
    //   }));
    // }

  }

  customRequest = info => {
    console.log('customRequest info------------>', info);
    const formData = new FormData()
    formData.append('image', info.file)
    formData.append('https', `https://f1.otosaas.com/openPlatform/img/${ info.file.name }`)
    fetch('http://dpp.boluome.com/https/generate', { body: formData, method: 'post' })
    .then(response => response.json())
    .then(response => {
      const { code, https } = response
      if (code === 0) {
        this.setState({ imageUrl: https, loading: false })
        console.log('https--------->', https);
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
