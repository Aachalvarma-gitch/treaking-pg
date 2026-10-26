import { useState } from "react"
import LoginEmailPass from "./login-email-pass"
import LoginOtp from "./login-otp"
import LoginGoogle from "./login-google"

const Login = () => {
  const [authScreen, setAuthScreen] = useState(<LoginEmailPass/>)
  return <>
    <button onClick={()=>setAuthScreen(<LoginEmailPass/>)} type="button" className=" btn-btn-outline-primary">login with email and password</button>
    <button onClick={()=>setAuthScreen(<LoginOtp/>)} type="button" className=" btn-btn-outline-danger">login with otp</button>
    <button onClick={()=>setAuthScreen(<LoginGoogle/>)} type="button" className=" btn-btn-outline-primary">login with Google</button>
    {authScreen}
  </>
}

export default Login