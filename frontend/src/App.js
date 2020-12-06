import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    axios.get('/api/values')
    .then(response => {
      console.log('respones :: ', response);
      setLists(response.data);
    });
  }, []);

  const onChangeValue = e => {
    setValue(e.target.value);
  }

  const onSubmitValue = e => {
    e.preventDefault();

    axios.post('/api/value', { value: value })
      .then(response => {
        if(response.data.success) {
          console.log('response :: ', response);
          setLists([...lists, { value: response.data.value }]);
        } else {
          alert('db에 입력하지 못했습니다.');
        }
      });

    setValue('');
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists && (
            <ul>
              {lists.map((element, index) => (
                <li key={index}>{element.value}</li>
              ))}
            </ul>
          )}
          <form className="example" onSubmit={onSubmitValue}>
            <input 
              type="text" 
              value={value} 
              onChange={onChangeValue} 
              placeholder="입력해주세요..." 
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
