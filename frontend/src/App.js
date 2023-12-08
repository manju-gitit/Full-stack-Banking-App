import logo from './logo.svg';
import './App.css';
//import React from 'react';
import { HashRouter , Route, Routes, Navigate} from 'react-router-dom';
import CreateAccount from "./Components/CreateAccount";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Deposit from "./Components/Deposit";
import Withdraw from "./Components/Withdraw";
import AllData from "./Components/AllData";
import NavBar from "./Components/Common/NavBar";
import UserContext from './UserContext';
import { useState, useCallback } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


const fireBaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

// Initialize Firebase
initializeApp(fireBaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const nullUser = { balance: 0 };

function App() {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'http://3.140.113.245:3001' : 'http://localhost:3001';

  const [status, setStatus] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  //initialize balance
  const [user, setUser] = useState(nullUser);

  //set up with first user
  let initializeUser = (email, password) => {
    return fetch(`${baseUrl}/account/login/${email}/${password}`)
      .then(async (res) => {
        const tempUser = await res.json()
        console.log("tempUser", tempUser)
        setUser(tempUser)
        setLoggedIn(true)
      })
      .catch((err) => {
        console.log(err);
        return "login failed"
      })
  }

  let adjustMoney = (amount) => {
    fetch(`${baseUrl}/account/update/${user.email}/${Number(amount)}`)
      .then(async (res) => {
        const newBalance = await res.json();
        setUser({ ...user, balance: newBalance })
        if (amount === null) {
          setStatus('Balance error')
        }
      })
      .catch((err) => {
        console.log(err);

      })
    if (user.balance != typeof Number) {
      setStatus('Invalid amount, Please contact support')
      return status
    }
    return (user.balance, status)
  };

  function logIn(email, password) {
    console.log("login");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("user, ", user)
        initializeUser(email, password)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function createWithFirebase(email, password) {
    console.log("create with firebase");
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return
        // ..
      })
  }

    // duplicated on createaccount.js should be moved to shared folder when custom hook is created
    function googleLogin(createUser = false) {
      console.log("google sign in clicked");
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user, ", user)
  
          if (createUser) {
            const url = `${baseUrl}/account/create/${user.displayName}/${user.email}/OAuth`;
            (async () => {
              var res = await fetch(url);
              // var data = await res.json();
              // console.log(data);
            })();
          }
  
          return initializeUser(user.email, "OAuth")
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log("error", error)
        });
    };

  const logOut = useCallback(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          setLoggedIn(false);
          setUser(nullUser);
          // window.location.href = '/';
          console.log('User signed out');
        })
        .catch((error) => {
          // An error happened.
          console.error('Sign-out error:', error);
        });
    } else {
      console.log('No user is currently signed in.');
    }
  }, []);

  return (
    <HashRouter basename="/">
            <NavBar user={user} isLoggedIn={loggedIn} logOut={logOut}/>
              <Routes>
                <Route path='/' exact element={<Home/>} />
                <Route path='/CreateAccount' element={<CreateAccount initializeUser={initializeUser} createWithFirebase={createWithFirebase} googleLogin={googleLogin} />}/>
                <Route path='/Login' element={!loggedIn ? <Login logIn={logIn} googleLogin={googleLogin} /> : <Navigate to="/" />}/>
                <Route path='/Deposit' element={loggedIn ? <Deposit balance={user.balance} adjustMoney={adjustMoney} /> : <Navigate to="/login"/>} />
                <Route path='/Withdraw' element={loggedIn ? <Withdraw balance={user.balance} adjustMoney={adjustMoney} /> : <Navigate to="/login"/>} />
                <Route path='/AllData' element={loggedIn ? <AllData /> : <Navigate to="/login" />} />
              </Routes>    
        </HashRouter>
  );
}
export default App
