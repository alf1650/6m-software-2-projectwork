//components/AddForm.js
import { useState } from "react";
import Joi from "joi-browser";

function Registration({ handlerAddUser, list }) {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [errorName, setErrorName] = useState();
  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();

  const schema = {
    name: Joi.string().min(1).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidName(name) {
    return /^[a-zA-Z]{3,7}$/.test(name);
  }

  function isValidPassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~@$!%*#?&])[A-Za-z\d@~$!%*#?&]{8,}$/.test(
      password
    );
  }

  const handlerName = (e) => {
    const form = { ...user, name: e.target.value };
    // const errorMessage = validate(e);
    // console.log(schema.name);

    // setError(errorMessage);
    setUser(form);
  };

  const handlerEmail = (e) => {
    const form = { ...user, email: e.target.value };
    // setUser(form);

    // if (!isValidEmail(e.target.value)) {
    //   setError('Email is invalid');
    // } else {
    //   setError(null);
    // }

    setUser(form);
  };

  const handlerPassword = (e) => {
    const form = { ...user, password: e.target.value };

    setUser(form);
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    // handlerAddUser(user);

    // const newlist = list.filter((item) => item.email === user.email)
    // console.log(newlist);
    // const results = isValidEmail(user.email);
    // console.log(!results);
    // setError(null);

    // else if(isValidName(user.name) === false){
    //   // const errorList = {...error, errorName:'Name must be minimun 3 letters and must not contain numbers'};
    //   // setError(errorList);
    //   setErrorName('Name must be minimun 3 letters and must not contain numbers');
    // }

    // else if(isValidEmail(user.email) === false){
    //   // const errorList = {...error, errorEmail:'Email is invalids'};
    //   // setError(errorList);
    //   setErrorEmail('Email is invalid');
    // }

    // else if(isValidPassword(user.password) === false){
    //   setErrorPassword('Password is invalid. Minimum eight characters. At least one letter, one number and one special character');
    //   // const errorList = {...error, errorPassword:'Password is invalid. Minimum eight characters. At least one letter, one number and one special character'};
    //   // setError(errorList);

    // }

    const newlist = list.filter((item) => item.email === user.email);
    // console.log(newlist);
    const results = isValidEmail(user.email);
    // console.log(!results);
    setError(null);

    if (isValidName(user.name) === false) {
      setErrorName(
        "Name must be minimun 3 letters and must not contain numbers"
      );
    } else {
      setErrorName(null);
    }

    if (isValidEmail(user.email) === false) {
      setErrorEmail("Email is invalid");
    } else {
      setErrorEmail(null);
    }

    if (isValidPassword(user.password) === false) {
      setErrorPassword(
        "Password is invalid. Minimum eight characters. At least one letter, one number and one special character"
      );
    } else {
      setErrorPassword(null);
    }

    if (
      isValidEmail(user.email) &&
      isValidName(user.name) &&
      isValidPassword(user.password) === true
    ) {
      if (Object.keys(newlist).length === 1) {
        // const errorList = {...error, errorExist:'Existing user'};
        //  setError(errorList);
        setError("Existing user");
        console.log("hello");
      } else {
        handlerAddUser(user);
        setError("Succesful registered");
        console.log("byebye");
      }
    }
  };
  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <label>Name: </label>
        <input
          type="text"
          placeholder="e.g John"
          onChange={handlerName}
          required
        />
        <br />
        <small>{errorName}</small>
        <br />
        <label>email: </label>
        <input
          type="text"
          placeholder="e.g John@gmail.com"
          onChange={handlerEmail}
          required
        />
        <br />
        <small>{errorEmail}</small>
        <br />
        <label>password: </label>
        <input type="text" onChange={handlerPassword} required />
        <br />
        <small>{errorPassword}</small>
        <br />
        <button> add user</button>
        <small>{error}</small>
      </form>
    </div>
  );
}
export default Registration;
