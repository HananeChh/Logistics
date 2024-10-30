import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import MyNavbar from './MyNavbar';
import truck from "../images/truck.png"
import truck2 from "../images/truck.png"
import truck3 from "../images/truck.png"
import card1 from "../images/truck.png"
import card2 from "../images/truck.png"
import card4 from "../images/truck.png"
import card3 from "../images/truck.png"





function HomePage() {
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

        <div>
            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header txtu ">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Transporter Ou Expédier avec CharJi  </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div class="modal-body bgg" style={{ overflow: "hidden" }}>
                            <div className='row' >
                                <div className='col'>
                                    <div class="card role"  >
                                        <img src="" class="card-img-top" alt="..." style={{ borderRadius: "0%" }} />
                                        <div class="card-body py-4 d-flex justify-content-between txtu btnjw" >
                                            <h1 class="card-title ">Transporteur</h1>
                                            <Link to="/transporteur/signup">
                                                <button class="btn btn-outline-success focus-ring focus-ring-warning my-1 py-2 px-5 " data-bs-dismiss="modal">Signup</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div class="card role">
                                        <img src="" class="card-img-top" alt="..." style={{ borderRadius: "0%",height:"55vh" }} />
                                        <div class="card-body py-4 d-flex justify-content-between txtu btnjw">
                                            <h1 class="card-title ">Expediteur</h1>
                                            <Link to="/expediteur/signup">
                                                <button class="btn btn-outline-success my-1 py-2 px-5 " type="submit" data-bs-dismiss="modal">Signup</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div id="carouselExampleDark" class="carousel carousel-dark slide " >
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active position-relative txtb txtj" data-bs-interval="10000">
                        <img src={truck2} class="d-block w-100 t " alt="..." />
                        <div class="carousel-caption position-absolute top-50 start-0 translate-middle-y py-1 px-3 ">
                            <div class="d-flex justify-content-between">
                                <div className='d-flex justify-content-start'>
                                    <div><div className="vertical-line mx-1"></div></div>
                                    <div className='txtleft px-1 px-sm-3'>
                                        <h1>We&nbsp;are&nbsp;the&nbsp;Best &nbsp;<span>trucking</span>&nbsp;company</h1>
                                        <p style={{ color: "white" }} className='py-xs-1 py-md-2'>Que vous soyez transporteur ou expediteur, nous avons les solutions <br />que vous pouvez adapter à vos besoin
                                            pour révolutionnez votre expérience <br />d'expédition avec CharJi</p>
                                        <div className='d-flex justify-content-start btno '>
                                            <button class="btn btn-outline-success mt-2 btn-sm px-md-5 " id='btnon' data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit">S'inscrire</button>
                                            <button class="btn btn-outline-success mt-2 btn-sm mx-2 mx-md-4 px-md-5" type="submit">En&nbsp;savoir&nbsp;plus</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='carrep position-absolute start-100 top-0'>.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.<br />.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.<br />.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.<br />.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.</div>
                            </div>
                        </div>
                        <div class="carousel-caption position-absolute top-0 end-0 px-2  ">
                            <MyNavbar />
                        </div>
                    </div>

                    <div class="carousel-item  position-relative txtb txtj" data-bs-interval="10000">
                        <img src={truck} class="d-block w-100 t" alt="..." />
                        <div class="carousel-caption position-absolute top-50 start-0 translate-middle-y py-1 px-3 ">
                            <div class="d-flex justify-content-between">
                                <div className='d-flex justify-content-start'>
                                    <div><div className="vertical-line mx-1"></div></div>
                                    <div className='txtleft px-1 px-sm-3'>
                                        <h1>We&nbsp;are&nbsp;the&nbsp;Best &nbsp;<span>trucking</span>&nbsp;company</h1>
                                        <p style={{ color: "white" }} className='py-xs-1 py-md-2'>Que vous soyez transporteur ou expediteur, nous avons les solutions <br />que vous pouvez adapter à vos besoin
                                            pour révolutionnez votre expérience <br />d'expédition avec CharJi</p>                                        <div className='d-flex justify-content-start btno '>
                                            <button class="btn btn-outline-success mt-2 btn-sm px-md-5 " id='btnon' data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit">S'inscrire</button>
                                            <button class="btn btn-outline-success mt-2 btn-sm mx-2 mx-md-4 px-md-5" type="submit">En&nbsp;savoir&nbsp;plus</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='carrep position-absolute start-100 top-0'>.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.<br />.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.<br />.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.<br />.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.</div>
                            </div>
                        </div>
                        <div class="carousel-caption position-absolute top-0 end-0 px-2  ">
                            <MyNavbar />
                        </div>
                    </div>


                    <div class="carousel-item  position-relative txtb txtj" data-bs-interval="10000">
                        <img src={truck3} class="d-block w-100 t" alt="..." />
                        <div class="carousel-caption position-absolute top-50 start-0 translate-middle-y py-1 px-3 ">
                            <div class="d-flex justify-content-between">
                                <div className='d-flex justify-content-start'>
                                    <div><div className="vertical-line mx-1"></div></div>
                                    <div className='txtleft px-1 px-sm-3'>
                                        <h1>We&nbsp;are&nbsp;the&nbsp;Best &nbsp;<span>trucking</span>&nbsp;company</h1>
                                        <p style={{ color: "white" }} className='py-xs-1 py-md-2'>Que vous soyez transporteur ou expediteur, nous avons les solutions <br />que vous pouvez adapter à vos besoin
                                            pour révolutionnez votre expérience <br />d'expédition avec CharJi</p>                                        <div className='d-flex justify-content-start btno '>
                                            <button class="btn btn-outline-success mt-2 btn-sm px-md-5 " id='btnon' data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit">Get&nbsp;Started</button>
                                            <button class="btn btn-outline-success mt-2 btn-sm mx-2 mx-md-4 px-md-5" type="submit">Learn&nbsp;More</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='carrep position-absolute start-100 top-0'>.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.<br />.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.<br />.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.<br />.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.</div>
                            </div>
                        </div>
                        <div class="carousel-caption position-absolute top-0 end-0 px-2  ">
                            <MyNavbar />
                        </div>
                    </div>

                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            {/* part two */}
            <div style={{ backgroundColor: "#F8F8F8" }} className='pb-5'>
                <div className='container py-5 '>
                    <div className='row my-5'>
                        <div className='col-6 txtpt'>
                            <div className='d-flex justify-content-start'>
                                <div><div className="vertical-line mx-1" style={{ width: "6px" }}></div></div>
                                <div className=' px-4'>
                                    <h1>Everything you <br />need <span style={{ color: "burlywood" }}>we have</span>!</h1>
                                </div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <p className='text-break'>Charji est une plateforme innovante dédiée
                                à la mise en relation entre expéditeurs et
                                transporteurs en Algérie, tout en favorisant
                                l’optimisation du transport de marchandises</p>
                            <div className='carrep text-center'>.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.<br />.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.<br />.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.&nbsp;&nbsp;.</div>
                        </div>
                    </div>
                    <div className='row pt- ' >
                        <div className='col-4 ' >
                            <div class="card">
                                <img class="card-img-top" src={card2} alt="Card image cap" />
                                <div class="card-body txtptg btn btnjw" >
                                    <h3 class="card-title ">Efficacité logistique</h3>
                                    <p class="card-text">L'objectif principal est d'obtimiser le processus de livraison</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div class="card" >
                                <img class="card-img-top" src={card1} alt="Card image cap" />
                                <div class="card-body txtptg btn btnjw">
                                    <h3 class="card-title">Réduire les coûts</h3>
                                    <p class="card-text">En
                                        favorisant la
                                        concurrence entre les
                                        transporteurs.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div class="card" >
                                <img class="card-img-top" src={card3} alt="Card image cap" />
                                <div class="card-body txtptg btn btnjw">
                                    <h3 class="card-title">visibilité et traçabilité</h3>
                                    <p class="card-text">Permettre aux expéditeurs 
                                    de suivre et les marchandises en temps réel</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* part three */}

            <div className='bgd'>
                <div className='container py-3 mt-4'>
                    <div className='row py-5 '>
                        <div className='col'>
                            <div className='d-flex justify-content-start py-5'>
                                <div><div className="vertical-line2 mx-1"></div></div>
                                <div className=' px-2 txtpf'>
                                    <h1>Contact Us!</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row py-3 mb-5  '>
                        <div className='col-6 col-md-3 ftxt '>
                            <p>Company</p>
                            <a class="nav-link mb-3" href="#">Accueil</a>
                            <a class="nav-link mb-3" href="#">blog</a>
                            <a class="nav-link mb-3" href="#">about</a>
                            <a class="nav-link v" href="#">contact</a>
                        </div>
                        <div className='col-6 col-md-3 ftxt'>
                            <p>Services</p>
                            <a class="nav-link mb-3" href="#">Efficacité logistique  </a>
                            <a class="nav-link mb-3" href="#">Réduction des coûts </a>
                            <a class="nav-link mb-3" href="#">Accessibilité  </a>
                            <a class="nav-link mb-3" href="#">Transparence  </a>
                        </div>
                        <div className='col col-md-3 ftxt '>
                            <p>Socials</p>
                            <a class="nav-link mb-3" href="#">Facbook</a>
                            <a class="nav-link mb-3" href="#">Instagram</a>
                            <a class="nav-link mb-3" href="#">Twitter</a>

                        </div>
                        <div className='col col-md-3 ftxt '>
                            <p>Location & contact</p>
                            <a class="nav-link v" href="#">13 rue Aban Ramadan villa 13</a>
                            <a class="nav-link mb-3" href="#">Phone : 0636985632</a>

                        </div>
                    </div>

                </div>

            </div>

        </div >
    );
}

export default HomePage
