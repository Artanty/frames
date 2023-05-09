import Dropzone from '@components/Dropzone';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import UploadControl from './UploadControl';
// import styles from '@styles/pages/home/home.scss';



export default function Upload () {

  const tryPy = () => {
    fetch('https://cs99850.tmweb.ru/upload_file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Headers': 'Content-Type',
        Authorization: 'Bearer ' + localStorage.getItem('token') || ''
      },
      body: null
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // Handle response data
    })
    .catch(error => {
      // Handle errors
    })
  }

  return (
    <div className='main w100t fcsc p20'>
      <Dropzone></Dropzone>
      {/* <button>Загрузить</button> */}
    </div>
  );
}