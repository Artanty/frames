import React, { ChangeEventHandler, useEffect, useState } from 'react';
// import styles from '@styles/pages/home/home.scss';



export default function Home () {

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
    <div>
      <button onClick={tryPy}>try</button>
    </div>
  );
}