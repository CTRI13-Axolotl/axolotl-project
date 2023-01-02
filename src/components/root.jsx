import { Outlet, Link } from 'react-router-dom';
import LogoutButton from './Glogout';

export default function Root() {
  return (
    <div>
      <div id="header">
        <nav id="navbar">
          <Link to={'/'}>
            <button className="nav-button">Profile</button>
          </Link>
          <Link to={'/login'}>
            <button className="nav-button">Login</button>
          </Link>
          <Link to={"/createPet"}>
            <button id='nav-button'>CreatePet</button>
          </Link>
          <LogoutButton />
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}
