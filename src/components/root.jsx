import { Outlet, Link } from "react-router-dom";

export default function Root (){
    return (
      <div>
        <div id="header">
          <nav id="navbar">
            <Link to={"/"}>
              <button id="nav-button">Profile</button>
            </Link>
            <Link to={"/login"}>
              <button id="nav-button">Login</button>
            </Link>
            <Link to={"/createPet"}>
              <button id='nav-button'>CreatePet</button>
            </Link>
            <Link to={"/non-existing-page"}>
              <button id="nav-button">Error</button>
            </Link>
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </div>
    );
};