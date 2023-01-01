import { Outlet, Link } from 'react-router-dom';
import LogoutButton from './Glogout';

export default function Root() {
  return (
    <div>
      <div id="header">
        <nav id="navbar">
          <Link to={'/'}>
            <button id="nav-button">Profile</button>
          </Link>
          <Link to={'/login'}>
            <button id="nav-button">Login</button>
          </Link>
          <Link to={'/non-existing-page'}>
            <button id="nav-button">Error</button>
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
