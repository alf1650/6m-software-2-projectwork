//components/AddForm.js
import { useState } from 'react';

function Registration({ handlerAddUser , list}) {
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  
  const handlerName = (e) => {
    const form = {...user, name: e.target.value};
    setUser(form);
  }
  const handlerEmail = (e) => {
    const form = {...user, email: e.target.value};
    setUser(form);
  }

  const handlerPassword = (e) => {
    const form = {...user, password: e.target.value};
    setUser(form);
  }
  const handlerSubmit = (e) => {
    e.preventDefault();
    // handlerAddUser(user);

    const newlist = list.filter((item) => item.email === user.email)
    console.log(newlist);

    if (Object.keys(newlist).length === 1) {
      
      setError("Existing user");
    }

    else{
     
     handlerAddUser(user);
     setError("Succesful registered");
    }
   
  }
  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <label>Name: </label>
        <input type="text" placeholder="e.g John" onChange={handlerName}/>
        <br />
        <br/>
        <label>email: </label>
        <input type="text" placeholder="e.g John@gmail.com"  onChange={handlerEmail}/>
        <br/>
        <br />
        <label>password: </label>
        <input type="text"   onChange={handlerPassword}/>
        <small>{error}</small>
        <br />
        <button> add user</button>
        </form>
    </div>
  )
}
export default Registration;
