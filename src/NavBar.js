// css
import './NavBar.css';

import {
  NavLink
} from 'react-router-dom';

// icons
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// react
import {useState} from 'react';

const NavBar = ({currentUser, signOut}) => {

  // state
  const [expand, setExpand] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);

  // functions
  const handleMenuButtonClick = () => {
    // toggle expand
    const newExpandValue = !expand;
    setExpand(newExpandValue);
  }

  const handleUserDropdownClick = () => {
    // toggle openUserDropdown
    const newOpenUserDropdownValue = !openUserDropdown;
    setOpenUserDropdown(newOpenUserDropdownValue);
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

        <div className={`collapsible collapse-mobile ${expand ? 'expanded' : 'collapsed'}`}
        >
          <menu className='navbar'>
            <li>
              <NavLink
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/posts"
              >
                Posts
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/users"
              >
                Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/comments"
              >
                Comments
              </NavLink>
            </li>

            <li className='current-user-dropdown flex-align-right-wrapper'>
              <div className="flex-align-right">
                <button
                  className="btn-link dropdown-toggle"
                  onClick={handleUserDropdownClick}
                >
                  {currentUser.displayName} <ArrowDropDownIcon />
                </button>
                { openUserDropdown &&
                  <menu className="dropdown">
                    <li>
                      <NavLink to={`/users/${currentUser._id}`}>
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <button
                        className='btn-link'
                        onClick={signOut}
                      >
                        Sign out
                      </button>
                    </li>
                  </menu>
                }
              </div>
            </li>

          </menu>
        </div>

        
      </div>
    </nav>
  );
};

export default NavBar;