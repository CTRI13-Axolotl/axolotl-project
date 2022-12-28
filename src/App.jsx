import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import axios from 'axios';
import Login from './components/login';

function App() {
  const [count, setCount] = useState(0);
  //test to check if server proxy is working
  axios.get('http://localhost:3001/api').then((res) => console.log(res.data));
  return (
      <div>
        <Login/>
      </div>
  );
}

export default App;
