import React from 'react'
import Card from './Common/Card' 
import { useState } from "react";
import { Link } from "react-router-dom"

function Login({ logIn, googleLogin }) {

const [statusMessage, setStatusMessage] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

function signInWithEmailPassword(email, password) {
    console.log("email ", email, "password ", password);
    logIn(email, password)
    setStatusMessage("Login successful")
}

// duplicated on createaccount.js should be moved to shared folder when custom hook is created
function handleGoogleLogin() {
    console.log("google sign in clicked");
    try{
        googleLogin()
    }catch(err) {
        console.log("error in google login")
        throw err
    }
    setStatusMessage("Logged in with Google")
};

return (
      <Card
            bgcolor="info"
            title="Login"
            status={statusMessage}
            body={
                <>
                    Email<br/>
                    <input type="input" 
                      className="form-control" 
                      placeholder="Enter email" 
                      value={email} 
                      onChange={e => { setEmail(e.currentTarget.value) }}/><br/>

                    Password<br/>
                    <input type="password" 
                      className="form-control" 
                      placeholder="Enter password" 
                      value={password} 
                      onChange={e =>{ setPassword(e.currentTarget.value)} }/><br/>

                    <button type="submit" className="btn btn-light" onClick={() => signInWithEmailPassword(email, password)}>Login</button> 
                    <br />
                    <br />
                    <button type="submit" className="btn btn-light" id="googlelogin" onClick={() => handleGoogleLogin()}>Google Login</button> 
                    <br />
                    <br />

                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/CreateAccount">Create Account</Link>
                    </div> 
                    

                </>}
      />);
}


export default Login