import React, { useState, useEffect } from "react";
import './banner.css';
import bgImg from '../images/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg';

import Cars from "../components/Cars";
import CarSwiper from "../components/CarsSwiper";


function Banner() {
    const [cars, setCars] = useState([])

    const fetchData = () => {
        fetch('http://localhost:5173/data/carsData.json')
            .then(res => res.json())
            .then(data => setCars(data))
            .catch(e => console.log(e.message));
    };
    useEffect(() => {
        fetchData()
    },  []);

    return (<>
    <div className="banner">
    <img src={bgImg} alt="luxurious car" className="bgimg active"/>

    <CarSwiper slides={cars}  />

   
      
</div>


    

 
    </> 
);
}

export default Banner;