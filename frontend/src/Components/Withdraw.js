import { useState } from "react"
import Card from './Common/Card' 
import fundsValidations from '../Utils/fundsValidations'

export function Withdraw({ adjustMoney, balance }) {
    const [status, setStatus] = useState('');
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    var withdrawValue
    var respObj = {}

    const validationError = fundsValidations(withdrawalAmount)

    function handleWithdrawal() {

        if (validationError) {
            setStatus(`Error Withdrawal ${validationError}`);
            console.log('validations in withdrawl')
            return;
        }

        if (withdrawalAmount > balance) {
            setStatus('Insufficient funds.');
            return;
        }

        if (withdrawalAmount <= 0) {
            setStatus('Transaction not allowed');
            return;
        }

        try {             
            respObj = adjustMoney(-withdrawalAmount)
            balance = respObj.value.balance
            console.log("balance"+balance)
            setWithdrawalAmount('')
            setStatus('Withdrawal sucessful')
        } catch(error) {
            console.log("Presenting withdrawl status went wrong")
        }
    }

    return (
        <Card
            bgcolor="info"
            header='Withdrawal'
            status={status}
            body={
                <>
                    Current Account Balance {JSON.stringify(balance)} <br/>
                    Amount<br />
                    <input
                        type="input"
                        className="form-control"
                        id=""
                        placeholder="Enter Amount"
                        value={withdrawalAmount}
                        onChange={e => setWithdrawalAmount(e.currentTarget.value)}
                    />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={handleWithdrawal}
                        disabled={withdrawalAmount === ''}
                    >
                        Withdraw
                    </button>
                </>
            }
        />
    )
}

export default Withdraw
