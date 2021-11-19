import React from "react";
import ReactDOM from 'react-dom';
import LoginForm from "../components/login/LoginForm";
import LoginA from "../components/login/LoginA";
import RegisterForm from "../components/login/RegisterForm";
import Register from "../components/login/Register";

// import { LOGIN_IMG_URL } from "../config/url";

class Login extends React.Component {

    render() {
      return(
        <div className= "Login"> 
        <LoginForm/>
        <RegisterForm/>
        <LoginA/>
        <Register/>        
        </div> 
      );
    }
  }
ReactDOM.render(<Login />, document.getElementById('Login'));

export default Login;
