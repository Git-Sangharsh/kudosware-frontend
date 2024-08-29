import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userResume, setUserResume] = useState(null);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleNameChange = (e) => setUserName(e.target.value);
  const handleEmailChange = (e) => setUserEmail(e.target.value);
  const handlePasswordChange = (e) => setUserPassword(e.target.value);
  const handleResumeChange = (e) => setUserResume(e.target.files[0]);

  const handleSubmitBtn = async () => {


    if (!userName || !userEmail || !userPassword || !userResume) {
        setMessage("All fields are required.");
        return;
      }

    try {
      const formData = new FormData();
      formData.append("name", userName);
      formData.append("email", userEmail);
      formData.append("password", userPassword);
      if (userResume) {
        formData.append("resume", userResume);
      }
      const response = await axios.post("http://localhost:5000/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data.message);
      if(response.data.userExist === true){
        setMessage("User Already Exist, Try different Email Address!!!");
      }
      else if(response.data.status === true){
        console.log("data added successFully!")
        navigate("/users")
      }
    } catch (error) {
      console.error(error);
      setMessage("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <h1>Sign up</h1>
        <div className="signup-wrapper-box">
          <h6 className="signup-wrapper-header">Name</h6>
          <input className="signup-wrapper-input" placeholder="John Doe" onChange={handleNameChange} type="text" value={userName} />
        </div>
        <div className="signup-wrapper-box">
          <h6 className="signup-wrapper-header">Email</h6>
          <input className="signup-wrapper-input" placeholder="john@gmail.com" onChange={handleEmailChange} type="email" value={userEmail} />
        </div>
        <div className="signup-wrapper-box">
          <h6 className="signup-wrapper-header">Password</h6>
          <input className="signup-wrapper-input" placeholder="*********" onChange={handlePasswordChange} type="password" value={userPassword} />
        </div>
        <div className="signup-wrapper-box">
          <h6 className="signup-wrapper-header">Upload Resume</h6>
          <input className="signup-wrapper-input" onChange={handleResumeChange} type="file" />
        </div>

        <button className="submit-btn" onClick={handleSubmitBtn}>Submit</button>
        {message && <h6 className="red">{message}</h6>}
      </div>
    </div>
  );
};

export default Signup;
