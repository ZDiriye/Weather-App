import {Link} from 'react-router-dom';
import React from 'react';
import wind from "./Assets/Wind.png";
import location from "./Assets/location.png";
import waves from "./Assets/Waves.png";


const Wind = () => {

    return(
        <div className="navigation-bar">
          
        <Link to="/wind"><img src={wind} alt="Wind" className="nav-icon" /></Link>

        <Link to="/"><img src={location} alt="Locations" className="nav-icon" /></Link>

        <Link to="/waves"><img src={waves} alt="Waves" className="nav-icon" /></Link>
      </div>
    );
}
export default Wind;