import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const registerUser = async (formData) => {
    try { //send the post register req
      const response = await axios.post('http://localhost:3000/api/users/add', {
        username: formData.name,
        password: formData.password,
        email: formData.email,  
      });
  
      // Handle successful registration
      console.log('User registered:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error during user registration:', error.response?.data || error.message);
      throw error; 
    }
  };

  const LoginUser = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        password: formData.password,
        email: formData.email,  
      });
  
      // Handle successful login
      console.log('User registered:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error during user login:', error.response?.data || error.message);
      throw error;  
    }
  };

const handleSubmit = async (e) => {

  e.preventDefault();

  if (isLogin) {

    const user = await LoginUser(formData);
    props.Setuser(user.user.username);
    console.log(user.user.username," ya youuuuseer");
    localStorage.setItem('token',user.token);
    navigate('/')
  } else {
    try {
      const user = await registerUser(formData);
      alert(user.success);
    } catch (error) {
      alert(error.response?.data?.message || 'Error registering user');
    }
  }
};

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${isLogin ? "login" : "signup"}`}>
          {isLogin ? "Login Form" : "Signup Form"}
        </div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input
            type="radio"
            name="slide"
            id="login"
            checked={isLogin}
            onChange={() => setIsLogin(true)}
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={!isLogin}
            onChange={() => setIsLogin(false)}
          />
          <label htmlFor="login" className="slide login">
            Login
          </label>
          <label htmlFor="signup" className="slide signup">
            Signup
          </label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          <form onSubmit={handleSubmit} className={isLogin ? "login" : "signup"}>
            <div className="field">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
              />
            )}
            </div>
            <div className="field">
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}

                  
                  required
                />
              </div>
            <div className="field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          
           
          
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value={isLogin ? "Login" : "Signup"} />
            </div>
            <div className="signup-link">
              {isLogin ? "Not a member? " : "Already a member? "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(!isLogin);
                }}
              >
                {isLogin ? "Signup now" : "Login now"}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;