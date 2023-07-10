//components/AddForm.js
import { useState } from 'react';

function AddForm({ handlerAddDate }) {
  const [date, setDate] = useState();
  
  const handlerDate = (e) => {
    const form = {...date, name: e.target.value};
    setDate(form);
  }
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
    handlerAddDate(date);
  }
  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <input type='text' name='name' placeholder='YYYY-MM-DD' onChange={handlerDate} />
        {/* <input type='text' name='quantity' placeholder='Quantity' onChange={handlerQuantity} />
        <input type='text' name='price' placeholder='Price' onChange={handlerPrice} /> */}
        <button>Enter Date</button>
      </form>
    </div>
  )
}
export default AddForm
