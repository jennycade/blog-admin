// css
import './NavBar.css';

import {
  NavLink
} from 'react-router-dom';

// icons
import MenuIcon from '@mui/icons-material/Menu';

// react
import {useState} from 'react';

const NavBar = (props) => {
  // props
  const { activeSection } = props;

  // state
  const [expand, setExpand] = useState(false);

  // functions
  const handleMenuButtonClick = () => {
    // toggle expand
    const newExpandValue = !expand;
    setExpand(newExpandValue);
  }

  return (
    <nav>
      <div>

        <button
          className="navbar-toggler"
          aria-label="Toggle navigation"
          onClick={handleMenuButtonClick}
        >
          <span className="navbar-toggler-icon"><MenuIcon /></span>
        </button>

        <div className={`collapsible ${expand ? 'expanded' : 'collapsed'}`}
        >
          <menu>
            <li>
              <NavLink
                className={
                  activeSection === 'home' ? ' active' : ''
                }
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                className={
                  activeSection === 'posts' ? ' active' : ''
                }
                to="/posts"
              >
                Posts
              </NavLink>
            </li>

            <li>
              <NavLink
                className={
                  activeSection === 'users' ? ' active' : ''
                }
                to="/users"
              >
                Users
              </NavLink>
            </li>

            <li>
              <NavLink
                className={
                  activeSection === 'comments' ? ' active' : ''
                }
                to="/comments"
              >
                Comments
              </NavLink>
            </li>

          </menu>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;