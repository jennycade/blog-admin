// import 'bootstrap/dist/js';
import {
  NavLink
} from 'react-router-dom';

const NavBar = (props) => {
  // props
  const { activeSection } = props;

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={
                  `nav-link${activeSection === 'home' ? ' active' : ''}`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={
                  `nav-link${activeSection === 'posts' ? ' active' : ''}`
                }
                to="/posts"
              >
                Posts
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={
                  `nav-link${activeSection === 'users' ? ' active' : ''}`
                }
                to="/users"
              >
                Users
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={
                  `nav-link${activeSection === 'comments' ? ' active' : ''}`
                }
                to="/comments"
              >
                Comments
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;