import React from 'react';
export default function AuthPage () {

  const handleRegister = () => {
    fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept':'application/json'
      },
      body: JSON.stringify({
        'name': 'test',
        'email': 'test@gmail.com',
        'password': 'test',
        password_confirmation: 'test'
  
      })
    })
    // .then(response => response.json())
    .then(data => {
      console.log(data)
      // Handle response data
    })
    .catch(error => {
      console.log(error)
      // Handle errors
    });
  }

  const handleLogin = () => {
    fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept':'application/json'
      },
      body: JSON.stringify({
        // 'name': 'test',
        'email': 'test@gmail.com',
        'password': 'test',
        // password_confirmation: 'test'
  
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      localStorage.setItem('token', data.token)
      // Handle response data
    })
    .catch(error => {
      console.log(error)
      // Handle errors
    });
  }

  const handleGetUser = () => {
  fetch('http://127.0.0.1:8000/api/getUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': '*/*',
      'Access-Control-Allow-Headers': 'Content-Type',
      Authorization: 'Bearer ' + localStorage.getItem('token') || ''
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    // Handle response data
  })
  .catch(error => {
    console.log(error)
    // Handle errors
  });
  }

  const handleGetFolders = () => {
    fetch('http://127.0.0.1:8000/api/folder', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Headers': 'Content-Type',
        Authorization: 'Bearer ' + localStorage.getItem('token') || ''
      },
      // body: JSON.stringify({
      //   // 'name': 'test',
      //   'email': 'test@gmail.com',
      //   'password': 'test',
      //   // password_confirmation: 'test'
  
      // })
    })
    // .then(response => response.json())
    .then(data => {
      console.log(data)
      // Handle response data
    })
    .catch(error => {
      console.log(error)
      // Handle errors
    });
  }

  return (
    <div>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleGetUser}>Get User</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGetFolders}>Get Folders</button>
    </div>
  );
}
