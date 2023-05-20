import React from "react";
import CloudImg from './amicloud.jpg'



const Home = () => {
    return (
        <div className="content">
        <div className="Home">
          <h1 className="welcome">Welcome to Craft Cloud!</h1>
  <div className="banner">
          <img src={CloudImg} alt="a crafted cloud" />
          </div>
          <h2>
          Unleash your creativity and keep it neatly organized within our crafting ideas sanctuary!
          </h2>
        </div>
      </div>
    );
  };
  
  export default Home;