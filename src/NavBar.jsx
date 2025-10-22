import './NavBar.css';

function NavBar(){
    return(
        <nav 
        className="navbar navbar-expand-lg navbar-light bg-light custom-navbar fixed-top justify-content-center align-items-center"
        >
            {/* Center the entire content block */}
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <a className="navbar-brand mx-3" href="#">COCOMO</a>
                {/* Mobile toggler button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav mx-auto text-center">
                        <li className="nav-item active">
                            <a className="nav-link" href="#" aria-current="page">Home <span className="visually-hidden">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;