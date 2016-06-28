import React from 'react'

const Login = ({state, userLogin}) => {
  return (
    <div>
      <h1>Login</h1>
      <div onClick={userLogin}>Log</div>
    </div>
  )
}

export default Login
