import React, { useState, useEffect } from 'react';
import styles from '@styles/pages/folders/folders.scss';
import FolderCreate from './FoldersCreate';
import FolderList from './FolderList';

export default function IndexPage() {
  const [responseData, setResponseData] = useState('');
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
    });
  }
  
  const clear = () => {
    setResponseData('')
  }
  const handleAfterCreateFolder = (data: any) => {
    console.log(data)
  }
  return (
    <div className={'w100t fcsc p20 ' + styles.wrapper}>
      <div className='whx320-150'>
        <FolderCreate handleAfterSubmit={handleAfterCreateFolder}></FolderCreate>
      </div>
      <div className="w320">
        <FolderList></FolderList>
      </div>
    </div>
  );
}
