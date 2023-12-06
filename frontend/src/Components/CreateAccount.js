import { useState } from "react";
import Card from './Common/Card' 
import { Link } from "react-router-dom"

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

export function CreateAccount({ initializeUser, createWithFirebase, googleLogin }) {
    const [show, setShow] = useState(true);
    const [statusMessage, setStatusMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function validate(field, label) {
        if (!field) {
            setStatusMessage('Error: ' + label + ' must not be blank');
            setTimeout(() => setStatusMessage(''), 3000);
            return false
        }
        return true;
    }

    // this validates the data and pushes the user into our datbase and hides our user and allows the user to add another.
    async function handleCreate() {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!validate(name, 'Name')) return;
        if (!validate(email, 'Email')) return;
        if (!validate(password, 'Password')) return;
        if (!emailRegex.test(email)) {
            setStatusMessage('Please enter a valid email address');
            return;
        }
        if (password.length < 8) {
            setStatusMessage('Error: Password must be at least 8 characters')
            return;
        }

        console.log('email in accountcreate', email)
        console.log('password in accountcreate', password)

        createWithFirebase(email, password)

        // TODO: add Role field to form and set to 'user'
        const url = `${baseUrl}/account/create/${name}/${email}/${password}`;
        await fetch(url);

        await initializeUser(email, password)
        setStatusMessage('You have created your account')
        setShow(false);

    }

    // duplicated on createaccount.js should be moved to shared folder when custom hook is created
    function googleLogMeIn() {
        console.log("google sign in clicked");
        setStatusMessage(googleLogin(true))
        setStatusMessage('You have created your account')
        setShow(false);
    };

    function clearForm() {
        setName('');
        setEmail('');
        setPassword('');
        setStatusMessage('');
        setShow(true);
    }

    return (
        <Card
            bgcolor="info"
            header='Create Account'
            status={statusMessage}
            body={show ? (
                <>
                    Name
                    <br />
                    <input
                        type="input"
                        className="form-control"
                        id="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={e => setName(e.currentTarget.value)}
                    />
                    <br />
                    Email address
                    <br />
                    <input
                        type="input" className="form-control"
                        id="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={e => setEmail(e.currentTarget.value)}
                    />
                    <br />
                    Password
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={e => setPassword(e.currentTarget.value)}
                    />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={handleCreate}
                        disabled={name + email + password === ''}>
                        Create Account
                    </button>
                    <br />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={() => googleLogMeIn()}>
                        Signin with Google
                    </button>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login/">Login</Link>
                    </div> 
                </>
            ) : (
                <>
                    <h5>Success</h5>
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={clearForm}
                    >
                        Add Another Account
                    </button>

                </>
            )}
        />
    )
}
export default CreateAccount