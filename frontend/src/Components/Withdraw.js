import { useState } from "react"
import Card from './Common/Card' 
import fundsValidations from '../Utils/fundsValidations'

function Withdraw({ adjustMoney, balance }) {
  const [status, setStatus] = useState('');
  const [withdrawlAmount, setWithdrawlAmount] = useState('');

  const validationError = fundsValidations(withdrawlAmount)

  function handleWithdrawl() {

      if (validationError) {
          setStatus(`Error  ${validationError}`);
          console.log('validation result exists in withdrawl.js')
          return;
      }

      if (withdrawlAmount > balance) {
          setStatus('Insufficient funds.');
          return;
      }

      adjustMoney(-withdrawlAmount)

      setWithdrawlAmount('');
      setStatus('Withdrawl sucessful')
  }

  return (
      <Card
          bgcolor="info"
          header=''
          status={status}
          body={
              <>
                  Current Account Balance {balance} <br />
                  Amount<br />
                  <input
                      type="input"
                      className="form-control"
                      id=""
                      placeholder="Enter Amount"
                      value={withdrawlAmount}
                      onChange={e => setWithdrawlAmount(e.currentTarget.value)}
                  />
                  <br />
                  <button
                      type="submit"
                      className="btn btn-light"
                      onClick={handleWithdrawl}
                      disabled={withdrawlAmount === ''}
                  >
                      Withdraw
                  </button>
              </>
          }
      />
  )
}

export default Withdraw
