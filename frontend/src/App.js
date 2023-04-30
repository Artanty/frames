import logo from './logo.svg';
import './App.css';
import UploadFile from './components/uploadFile'

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

function MyButton() {
  return (
    <button onClick={handleRegister}>Register</button>
  );
}

function App() {
  return (
    <div className="App">
      <UploadFile/>
      <MyButton/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
