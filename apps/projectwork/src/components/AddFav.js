//components/AddForm.js
import { useState } from 'react';

function AddFav({ handlerAddFav }) {
  const [fav, setFav] = useState({
    favstartdate: 'new',
    favenddate: 'end',
    country: 'singapore',
  }
  );
  
  // const handlerDate = (e) => {
  //   const form = {...date, name: e.target.value};
  //   setDate(form);
  // }
  // const handlerQuantity = (e) => {
  //   const form = {...item, quantity: e.target.value};
  //   setItem(form);
  // }
  // const handlerPrice = (e) => {
  //   const form = {...item, price: e.target.value};
  //   setItem(form);
  // }
  const handlerSubmit = (e) => {
    e.preventDefault();
    handlerAddFav(fav);
  }
  return (
    <div>
      {/* <form onSubmit={handlerSubmit}> */}
        <label>Name: </label>
        {/* <input type="text" placeholde="e.g John"  onChange={(e) => setName(e.target.value)}/> */}
        
        <br />
        <br />

        <label>startdate: </label>
        {/* <input type="text" placeholde="e.g John"  onChange={(e) => setEmail(e.target.value)}/> */}

        <br />
        <br />


        <label>endate: </label>
        {/* <input type="text" placeholde="e.g John"  onChange={(e) => setEmail(e.target.value)}/> */}

        <button onClick={handlerSubmit}> add fav</button>
        {/* </form> */}
    </div>
  )
}
export default AddFav;