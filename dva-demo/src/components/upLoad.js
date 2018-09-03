import React from 'react';

const UpLoad = ({ props }) => {
  const { dispatch, upLoad } = props
  const { val } = upLoad
  console.log('UpLoadCom props--------->', props);
  const handleClick = () => {
    dispatch({ type: 'upLoad/test', val: '666' })
  }
  return (
    <div onClick={ handleClick }>{ val }</div>
  );
};


export default UpLoad;
