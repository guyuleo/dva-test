import React from 'react';
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  if (callback) reader.addEventListener('load', () => callback(reader.result));
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

function convertToBinary(dataURI) {
  const byteString = window.atob(dataURI.split(',')[1])
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
  ia[i] = byteString.charCodeAt(i)
  }
  const bb = new window.Blob([ab], { type: 'image/png' })
  return bb
}

class UpLoad extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  UNSAFE_componentWillMount(nextProps) {
    console.log('in UpLoad UNSAFE_componentWillMount-------->', this.props, nextProps);
  }

  handleChange = info => {
    console.log('handleChange info990099090---------->', info);
    // const reader = new FileReader();
    // let imgUrl
    // reader.addEventListener('load', () => {
    //   console.log('reader.result-------->', reader.result)
    //   imgUrl = reader.result
    // })
    // console.log('reader.result---------->', reader, 'imgUrl---------->', imgUrl);
    // const { file = {} } = info
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, imageUrl => this.setState({
    //     imageUrl,
    //     loading: false,
    //   }));
    // }

    // const requestBody = {
    //   image: file,
    //   https: `https://f1.otosaas.com/openPlatform/img/${ file.name }`,
    // }
    // console.log('requestBody--------->', JSON.stringify(requestBody), typeof file);

    getBase64(info.file.originFileObj, imgDateUrl => {
      const imgUrl = convertToBinary(imgDateUrl)
      console.log('imgDateUrl=======>', imgDateUrl, 'imgUrl------->', imgUrl);
      fetch('https://upload.otosaas.com/new', { body: imgUrl, method: 'post' })
      .then(response => response.json())
      .then(json => {
        const { code, data } = json
        if (code === 0) {
          console.log('data--------->', data);
        }
      })
    });


    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
  }

  customRequest = info => {
    console.log('customRequest info------------>', info);
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
          headers={{
            appcode: 'me',
            userid: 'test_long',
            token: '7d164723ebcda37739894a8a3787a961',
          }}
        >
          { imageUrl ? <img src={ imageUrl } alt="avatar" /> : uploadButton }
        </Upload>
      </div>
    );
  }
}

export default UpLoad
