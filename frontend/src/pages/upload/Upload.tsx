import Dropzone from '@pages/upload/Dropzone';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import UploadControl from './UploadControl';
// import styles from '@styles/pages/home/home.scss';



export default function Upload () {

  return (
    <div className='main w100t fcsc p20'>
      <Dropzone></Dropzone>
    </div>
  );
}