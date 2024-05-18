import React from "react";
import './cars.css'

function Cars({car}) {
    return ( <div className="carcontainer">
    <div className="carwrapper">
      <div className="carbanner-image"><img className="carimg" src={car.image} alt="Cars"/></div>
      <h1 className="carh1">{car.car_model_id.model}</h1>
      <p className="carp">
      {car.car_model_id.make}
      </p>
     </div>
     <div className="carbutton-wrapper"> 
     <button className="carbtn caroutline">DETAILS</button>
       <button className="carbtn carfill">BUY NOW</button>
     </div>
       </div>
  );
}

export default Cars;