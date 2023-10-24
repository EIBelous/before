import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "./services/shippingService";

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

export default function Checkout({ cart, emptyCart }) {
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);
  const [touched, setTouched] = useState({});

<<<<<<< HEAD
  // Derived state
  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;
=======
// Derived state
const errors = getErrors(address) 
const isValid = Object.keys(errors).length === 0;
>>>>>>> c5d3fb5368d4c285d9d797b972933a00d9df4cd7

  function handleChange(e) {
    e.persist(); // persist the event
    setAddress((curAddress) => {
      return {
        ...curAddress,
        [e.target.id]: e.target.value,
      };
    });
  }

  function handleBlur(event) {
    event.persist();
    setTouched((cur) => {
      return { ...cur, [event.target.id]: true };
    });
  }

  async function handleSubmit(event) {
<<<<<<< HEAD
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        await saveShippingAddress(address);
        emptyCart();
        setStatus(STATUS.COMPLETED);
      } catch (e) {
        setSaveError(e);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function getErrors(address) {
    const result = {};
    if (!address.city) result.city = "City is required";
    if (!address.country) result.country = "Country is required";
    return result;
  }

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) {
    return <h1>Thanks for shopping!</h1>;
=======
    event.preventDefault()
   setStatus(STATUS.SUBMITTING)
   if (isValid) {
       try{
    await saveShippingAddress(address)
    emptyCart()
    setStatus(STATUS.COMPLETED)
   }
   catch(e){
    setSaveError(e)
   }
  } else{
    setStatus(STATUS.SUBMITTED)
  }
}
   
  function getErrors(address){
    const result = {}
    if (!address.city) result.city = "City is required"
    if (!address.country) result.country = "Country is required"
    return result
  }

  if (saveError) throw saveError
  if (status === STATUS.COMPLETED) {
    return(
      <h1 className="">Thanks fot order</h1>
    )
>>>>>>> c5d3fb5368d4c285d9d797b972933a00d9df4cd7
  }

  return (
    <>
      <h1>Shipping Info</h1>
      {!isValid && status === STATUS.SUBMITTED && (
<<<<<<< HEAD
        <div role="alert">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.keys(errors).map((key) => {
              return <li key={key}>{errors[key]}</li>;
            })}
          </ul>
        </div>
      )}
=======
        <div role="alert"> 
        <p>Please fix folowing errors:</p>
        <ul>
          {Object.keys(errors).map((key)=>{
            return <li key={key}>{errors[key]}</li>
          } )}
        </ul>
        </div>
      )} 
>>>>>>> c5d3fb5368d4c285d9d797b972933a00d9df4cd7
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
          <p role="alert">
            {(touched.city || status === STATUS.SUBMITTED) && errors.city}
          </p>
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

          <p role="alert">
            {(touched.country || status === STATUS.SUBMITTED) && errors.country}
          </p>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
