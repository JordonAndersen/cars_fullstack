import React from "react";
import NavListItem from "../components/NavListItem";
import navListData from "../data/navList";
import './header.css';
import Search from "../components/Search";
import Button from "../components/Button";

function Header() {
    return (
       <header>
        <a href="/" className="logo">The Autobahn Alchemist</a>
        <ul className="nav">
            {
                navListData.map(nav => (
                    <NavListItem key={nav._id} nav={nav}/>

                ))
            }
        </ul>
        <Search/>
        <Button
            icon={<ion-icon name="log-in-outline" ></ion-icon>}
            name="Sign in"
            bgColor = '#24305E'
        
        />





       </header>

        
      );
}

export default Header ;