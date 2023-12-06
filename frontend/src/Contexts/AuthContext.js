import React, { useContext, useState, useEffect } from "react"
import app from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return app.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return app.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return app.signOut()
  }

/*   function resetPassword(email) {
    return app.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  } */

  useEffect(() => {
    const unsubscribe = app.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}