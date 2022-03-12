import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {initWeb3,getContract} from './Utils.js';

function App() {

  const [web3, setWeb3] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [accounts, setAccounts] = useState([]);



  useEffect(()=>{
    const initApp = async() => {
      const web3 = await initWeb3();
      const contract = await getContract(web3);
      const accounts = await web3.eth.getAccounts();
  
      setWeb3(web3);
      setContract(contract);
      setAccounts(accounts);
    }
    initApp();
  },[]);

  const create = async(e) =>{
    e.preventDefault();
    let _name = document.getElementById('name').value;
    let _result = document.getElementById('create-result');
    contract.methods.create(_name).send({from:accounts[0]})
    .then(()=>{
      _result.innerHTML = `New user ${_name} was successfully created`;
    })
    .catch(e=>{
      _result.innerHTML = `There was an error`;
    })
  }

  const read = async(evt) => {
    evt.preventDefault();
    let _id = document.getElementById('read-id').value;
    let read_result = document.getElementById('read-result');
    contract.methods.get(_id).call()
    .then(_result => {
      console.log(_result);
      read_result.innerHTML = `Id: ${_result[0]} Name: ${_result[1]}`;
    })
    .catch(error => {
      console.log(error);
      read_result.innerHTML = `There was an problem while reading the user details`;
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          CRUD Smart Contract
        </p>
        <h4>Create User</h4>
        <form>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input id='name' type="text" className='form-control'></input>
          </div>
          <button type='submit' onClick={e=>create(e)}>Submit</button>
          <p id='create-result'></p>
        </form>

        <form>
          <div>Read User</div>
          <div className='form-group'>
            <label htmlFor='read-id'>Enter Id</label>
            <input id='read-id' type="number" className='form-control'></input>
          </div>
          <button type='submit' onClick={evt=>read(evt)}>Submit</button>
          <p id='read-result'></p>
        </form>

      </header>
    </div>
  );
}

export default App;
