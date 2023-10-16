import React, { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";

const STATUS = {
  IDLE : "IDLE",
  SUBMITTED : "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLITTED: "COMPLITTED",
};

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

export default function Checkout({ cart, emptyCart }) {
  const [address, setAddress] = useState(emptyAddress);
const [status, setStatus] = useState(STATUS.IDLE)
const [saveError, setSaveError] = useState(null)

  function handleChange(e) {
    e.persist()
    setAddress((curAdress)=>{
        return{
            ...curAdress,
            [e.target.id]:e.target.value
        }

    })
  }
//ddddddd

  function handleBlur(event) {
    // TODO
  }

  async function handleSubmit(event) {
    event.preventDefault()
   setStatus(STATUS.SUBMITTING)
   try{
    await saveShippingAddress(address)
    emptyCart()
    setStatus(STATUS.COMPLITTED)
   }
   catch(e){
    setSaveError(e)
   }
  }
  if (saveError) throw saveError
  if (status === STATUS.COMPLITTED) {
    return(
      <h1 className="">Thanks fot order</h1>
    )
  }
  return (
    <>
      <h1>Shipping Info</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled = {status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
