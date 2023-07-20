import React, { useState, useEffect } from "react";
import "./Login.module.css";
import axios from "axios";
import userApi from "../api/userApi";
import { useNavigate} from 'react-router-dom';

function Login(setIsLoggedIn) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
//   const payload = {
//     email: email,
//     password: password,
//   };

//   const onSubmitHandler = () => {
//     axios.post("https://64b14d45062767bc4825fec3.mockapi.io/users", payload).then((response) => {
//       const response1 = response;
//       localStorage.setItem("stringify", JSON.stringify(response1));
//       localStorage.setItem("Mytoken", response1.data.token);
//     });
//   };

//   const onSubmitHandler = async () => {
//     console.warn(email,password)
//     let item= (email, password)
//     let result = await fetch("https://64b14d45062767bc4825fec3.mockapi.io/users", {
//         method : 'POST',
//         headers: {
//             "Content-Type" : "application/json",
//             "Accept" : "application/json"
//         },
//         body: JSON.stringify(item)
//     });

//     result = await result.json();
//     localStorage.setItem("user-info", JSON.stringify(result)
//     )
//   }

const apiGet = async () => {
    try {
      const response = await userApi.get(`/users/`);
      console.log("response.data", response.data);
      setUsers(response.data);
       } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    apiGet();

 
  }, []);



  const onSubmitHandler = () => {
   const newlist = users.filter((item) => item.email === email && item.password === password)

   if (Object.keys(newlist).length === 1) {
    setLoggedIn(true);
    localStorage.setItem("user-info", JSON.stringify(newlist));
    navigate("/Main");
   }
   else{
    setLoggedIn(false);
    navigate("/");
    setError("inccorrect email/password");
   }
  
  }

//   console.log(loggedIn);

  return (
    <div className="login">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email"
      />
      <br></br>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <br></br>
      <small>{error}</small>
      <br></br>
      <button type="submit" onClick={onSubmitHandler}>Login</button>
    </div>
  );
}

export default Login;
