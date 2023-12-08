import { useState } from "react";
import Card from './Common/Card' 
import fundsValidations from '../Utils/fundsValidations'

export function Deposit({ adjustMoney, balance }) {

    const [statusMessage, setStatusMessage] = useState('');
    const [depositAmount, setDepositAmount] = useState('');

    const validationError = fundsValidations(depositAmount)

    function handleDeposit() {

        if (validationError) {
            setStatusMessage(`Error Deposit ${validationError}`);
            console.log('validation result exists in deposit.js')
            return;
        }

        try{
            adjustMoney(depositAmount)
            setDepositAmount('');
            setStatusMessage('Deposit successful');         
        }catch(err) {
            throw err
        }


    }

    return (
        <Card
            bgcolor="info"
            header="Deposit"
            status={setStatusMessage}
            body=
            {
                <div>
                    Current Account Balance {balance}
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
                        onClick={() => handleDeposit()}
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