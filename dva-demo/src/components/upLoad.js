import React from 'react'
import { Upload, Icon, message } from 'antd'

class UpLoad extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  handleChange = info => {
    // console.log('handleChange info990099090---------->', info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
  }

  beforeUpload = file => {
    const isJPG = file.type === 'image/jpeg'
    if (!isJPG) {
      message.error('You can only upload JPG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJPG && isLt2M
  }

  customRequest = info => {
    const { handleUpload } = this.props
    const formData = new FormData()
    formData.append('image', info.file)
    formData.append('https', `https://f1.otosaas.com/openPlatform/img/${ new Date().getTime() }`)
    fetch('http://dpp.boluome.com/https/generate', { body: formData, method: 'post' })
    .then(response => response.json())
    .then(response => {
      const { code, https } = response
      if (code === 0) {
        this.setState({ imageUrl: https, loading: false })
        handleUpload && handleUpload(https)
      }
    })
    .catch(error => console.error('Error:', error))
  }

  render() {
    const { CustomizeButton } = this.props
    const uploadButton = CustomizeButton ? React.cloneElement(CustomizeButton, { state: this.state }) : (
      <div>
        <Icon type={ this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const imageUrl = this.state.imageUrl

    return (
        <Upload
          name='avatar'
          listType='picture-card'
          className='avatar-uploader'
          showUploadList={ false }
          beforeUpload={ this.beforeUpload }
          onChange={ this.handleChange }
          customRequest={ this.customRequest }
          style={ this.props.style }
        >
          { imageUrl ? <img src={ imageUrl } alt="avatar" /> : uploadButton }
        </Upload>
    )
  }
}

export default UpLoad
