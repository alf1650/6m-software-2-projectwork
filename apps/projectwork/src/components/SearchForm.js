//components/AddForm.js
import { useState } from 'react';

function SearchForm({ handlerAddUser }) {
  const [user, setUser] = useState();
  
  const handlerEmail = (e) => {
    const form = {...user, email: e.target.value};
    setUser(form);
  }
  const handlerSubmit = (e) => {
    e.preventDefault();
    handlerAddUser(user);
  }
  return (
    <div>
      <form onSubmit={handlerSubmit}>
    
        <label>Id:</label>
        <input type="text" placeholder="e.g 1"  onChange={handlerEmail}/>

        <button> search</button>
        </form>
    </div>
  )
}
export default SearchForm;
