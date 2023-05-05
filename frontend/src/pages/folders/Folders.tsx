import React from 'react';
export default function IndexPage() {
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
  return (
    <div>
      
    </div>
  );
}
