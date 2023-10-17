import React, { useState } from 'react';
import logo from './assets/images/logo.png';
import './assets/css/LoginForm.scss';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      let loginBtn = document.querySelector(".form-submit-btn button");
      let loginText = document.querySelector(".form-submit-btn button .default-text");
      let spinner = document.querySelector(".form-submit-btn button .login-spinner");
      let loginSuccess = document.querySelector(".form-submit-btn button .login-success");
      let loginFailed = document.querySelector(".form-submit-btn button .login-failed");
      loginText.style.display = "none";
      spinner.style.display = "block";
      let apiURL = `https://hassancoder.com/dummy-react-login-api/?email=${email}&password=${password}`;
      setEmail("");
      setPassword("");
    
      try {
        let response = await fetch(apiURL);
    
        if (response.ok) {
          let data = await response.json();
          spinner.style.display = "none";
    
          if (data.login === "success") {
            loginSuccess.style.display = "block";
            loginBtn.classList.add("success");
          } else {
            loginFailed.style.display = "block";
            loginBtn.classList.add("failed");
          }
    
          setTimeout(() => {
            loginFailed.style.display = "none";
            loginSuccess.style.display = "none";
            loginText.style.display = "block";
            loginBtn.classList.remove("success");
            loginBtn.classList.remove("failed");
          }, 2000);
        } else {
          loginFailed.style.display = "block";
          loginBtn.classList.add("failed");

          setTimeout(() => {
          loginFailed.style.display = "none";
          loginText.style.display = "block";
          loginBtn.classList.remove("failed");
        }, 2000);
        }
      } catch (error) {
        spinner.style.display = "none";
        console.error("Error fetching data:", error);
        loginFailed.style.display = "block";
        loginBtn.classList.add("failed");
        // Display loginFailed on fetch error
        setTimeout(() => {
          loginFailed.style.display = "none";
          loginText.style.display = "block";
          loginBtn.classList.remove("failed");
        }, 2000);
      }
    };
    
  return (
    <div className='form-container'>
        <div className="logo">
          <img src={logo} alt="Logo for Login Form" />
        </div>

        <div className="login-form">
          <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <div>
                  <EnvelopeIcon className="input-icon" />
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="username@example.com" required />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password"> Password</label>
                <div>
                  <LockClosedIcon className="input-icon" />
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" required />
                </div>
              </div>

              <div className="form-submit-btn">
                  
                <button type="submit">
                  <span className="default-text">Login</span>
                  <span className="login-spinner"></span>
                  <CheckIcon className="login-success" />
                  <ExclamationTriangleIcon className="login-failed" />
                </button>
              </div>
          </form>
        </div>

        <div className="login-options">
          <a href="/">Signup</a>
          <a href="/">Forget password?</a>
        </div>
        
    </div>
  )
}

export default LoginForm
