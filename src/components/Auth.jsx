import { login, logout, loggedInUserDisplayName } from "../services/authService"

export function SignIn() {
  return <button onClick={login}>Sign In</button>
}

export function SignOut() {
  return (
    <div className="info">
      Hello, {loggedInUserDisplayName()}  
      <button onClick={logout}>Sign Out</button>
    </div>
  )
}