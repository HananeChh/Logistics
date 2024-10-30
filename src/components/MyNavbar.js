import React, { useState, useEffect } from 'react';
import { logout } from '../actions/auth';
import { Link } from 'react-router-dom'
import charji from "../images/charji.png"


function MyNavbar() {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 570;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <nav className={`navbar navbar-expand-lg navtxt  fixed-top py-3 px-3 ${scrolled ? 'scrolled' : ''}`}>
            <div class="container-fluid">
                <a class="navbar-brand " href="#">
                {/* <img src={charji} alt="" width="110" height="24" class="d-inline-block align-text-top" /> */}
                {/* <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top" /> */}
                CharJi
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="container-fluid ">

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item ">
                            <a class="nav-link" style={{ color: "burlywood" }} href="#">Accueil</a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link" href="#">A&nbsp;propos</a>
                        </li>
                        <li class="nav-item dropdown me-2">
                            <a class="nav-link " role="button" aria-expanded="false">
                            Contact
                            </a>

                        </li>

                    </ul>
                    <form class="d-flex btno" role="search">
                        <input class="form-control me-2" type="search" placeholder="Recherche" aria-label="recherche" />
                        <Link to="/login">
                            <button class="btn btn-outline-success" type="submit">Connexion</button>
                        </Link>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default MyNavbar;
