import './App.css';
import { useState } from 'react';

function App() {
  const [screen, setScreen] = useState('home')
  const [action, setAction] = useState('')
  const [accountBalance, setAccountBalance] = useState(1000)
  const [count, setCount] = useState([])
  const [errors, setErrors] = useState('')

  const changeScreen = (action) => {
    setScreen('action')
    setAction(action)
  }

  const setCountHandler = (num) => {
    setErrors('')
    if(count.length < 4) setCount(prevState => [...prevState, num] );
    return
  }

  const undoCount = () => {
    setCount(prevState => prevState.slice(0, -1))
  }

  const confirmHandler = () => {
    const enteredValue = parseInt(count.join(''));
    if(count.length === 0) {
      setErrors('Enter a value first!')
      setCount([])
      return
    }
    if(action === 'withdraw') {
      if(accountBalance - enteredValue < 0) {
        setErrors('You tried withdraw too much!')
        setCount([])
        return
      }
      setAccountBalance(accountBalance - enteredValue)
    }
    else {
      setAccountBalance(accountBalance + enteredValue)
    }
    setCount([])
  }

  return (
    <div className="App">
      {screen === 'home' ?
        <div className="container">
          <h2>Welcome to ATM what you want to do?</h2>
          <div className="buttons-container">
            <button className='button' onClick={() => changeScreen('withdraw')}>Withdraw</button>
            <button className='button' onClick={() => changeScreen('deposit')}>Deposit</button>
          </div>
        </div> :
        <div className="container">
          <h3>{action}</h3>
          <h2>Your balance: {accountBalance}</h2>
          <div className="display">{count}</div>
          <div className="keyboard">
            <table>
              <tr>
                <td className='num-button' onClick={() => {setCountHandler(1)}}>1</td>
                <td className='num-button' onClick={() => {setCountHandler(2)}}>2</td>
                <td className='num-button' onClick={() => {setCountHandler(3)}}>3</td>
              </tr>
              <tr>
                <td className='num-button' onClick={() => {setCountHandler(4)}}>4</td>
                <td className='num-button' onClick={() => {setCountHandler(5)}}>5</td>
                <td className='num-button' onClick={() => {setCountHandler(6)}}>6</td>
              </tr>
              <tr>
                <td className='num-button' onClick={() => {setCountHandler(7)}}>7</td>
                <td className='num-button' onClick={() => {setCountHandler(8)}}>8</td>
                <td className='num-button' onClick={() => {setCountHandler(9)}}>9</td>
              </tr>
              <tr>
                <td className='num-button'></td>
                <td className='num-button' onClick={() => {setCountHandler(0)}}>0</td>
                <td className='num-button' onClick={() => undoCount()}>{'<-'}</td>
              </tr>
            </table>
          </div>
          <button className='button' onClick={() => confirmHandler()}>Confirm</button>
          <button className='button' onClick={() => setScreen('home')}>Back</button>
          <div>{errors}</div>
        </div>}
    </div>
  );
}

export default App;
