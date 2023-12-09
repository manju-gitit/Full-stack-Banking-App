import { useState } from "react";
import Card from './Common/Card' 
import fundsValidations from '../Utils/fundsValidations'

export function Deposit({ adjustMoney, balance }) {

    const [statusMessage, setStatusMessage] = useState('');
    const [depositAmount, setDepositAmount] = useState('');

    const validationError = fundsValidations(depositAmount)  
    var depositValue
    var respObj = {}
    function handleDeposit() {

        if (validationError) {
            setStatusMessage(`Error Deposit ${validationError}`);
            console.log('validation result exists in deposit.js')
            return;
        }
        try {   
            respObj = adjustMoney(depositAmount)
            balance = respObj.value.balance
            console.log("balance"+balance)
            setDepositAmount('');
            setStatusMessage('Deposit successful');    
        } catch(error) {
            console.log("Presenting deposit status went wrong")
        }
    }

    return (
        <Card
            bgcolor="info"
            header="Deposit"
            status={statusMessage}
            body=
            {
                <div>
                    Current Account Balance {JSON.stringify(balance)} <br/>
                    <br />
                    Deposit Amount
                    <br />
                    <input
                        type="input"
                        className="form-control"
                        id="deposit"
                        placeholder="Enter Amount"
                        value={depositAmount}
                        onChange={e => setDepositAmount(e.currentTarget.value)}
                    />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={handleDeposit}
                        disabled={depositAmount === ''}
                    >
                    Deposit
                    </button>

                </div>

            }
        />
    )
}

export default Deposit