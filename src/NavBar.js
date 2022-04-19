// import 'bootstrap/dist/js';

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
              <a
                className={
                  `nav-link${activeSection === 'home' ? ' active' : ''}`
                }
                aria-current={activeSection === 'home' ? 'page' : 'false'}
                href="/"
              >
                Home
              </a>
            </li>

            <li className="nav-item">
              <a
                className={
                  `nav-link${activeSection === 'posts' ? ' active' : ''}`
                }
                aria-current={activeSection === 'posts' ? 'page' : 'false'}
                href="/posts"
              >
                Posts
              </a>
            </li>

            <li className="nav-item">
              <a
                className={
                  `nav-link${activeSection === 'users' ? ' active' : ''}`
                }
                aria-current={activeSection === 'users' ? 'page' : 'false'}
                href="/users"
              >
                Users
              </a>
            </li>

            <li className="nav-item">
              <a
                className={
                  `nav-link${activeSection === 'comments' ? ' active' : ''}`
                }
                aria-current={activeSection === 'comments' ? 'page' : 'false'}
                href="/comments"
              >
                Comments
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;