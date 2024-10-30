import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getExpeditions, getTransporteurUser, rechercheExpedition, profileWithId, getAllVehicles, makeOfferForExpedition } from '../actions/auth';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Button, Layout, Card } from 'antd';

function TransporteurDashboard() {
    const dispatch = useDispatch();
    const [expeditions, setExpeditions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [offerPrices, setOfferPrices] = useState({});
    const [offerSuccess, setOfferSuccess] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const expéditionsRecherchées = await dispatch(rechercheExpedition(searchTerm));
                setExpeditions(expéditionsRecherchées);
            } catch (error) {
                alert('Erreur lors de la recherche');
                console.error('Erreur lors de la recherche :', error);
            }
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTransporteurUser());
    }, [dispatch]);

    const handleSearch = async () => {
        try {
            const expéditionsRecherchées = await dispatch(rechercheExpedition(searchTerm));
            setExpeditions(expéditionsRecherchées);
        } catch (error) {
            console.error('Erreur lors de la recherche :', error);
        }
    };

    const handleOfferSubmit = (expeditionId) => {
        const price = offerPrices[expeditionId];
        if (price && price > 0 && selectedVehicle) {
            dispatch(makeOfferForExpedition(expeditionId, selectedVehicle, price))
                .then(() => {
                    setOfferSuccess(true);
                    setTimeout(() => {
                        setOfferSuccess(false);
                    }, 5000);
                })
                .catch((error) => {
                    console.error('Error submitting offer:', error);
                });
        }
    };

    const handlePriceChange = (expeditionId, price) => {
        setOfferPrices(prevState => ({
            ...prevState,
            [expeditionId]: price
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dispatch(getAllVehicles());
                setVehicles(data);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleProfile = async (UserId) => {
        try {
            const data = await dispatch(profileWithId(UserId));
            setProfileData(data);
        } catch (error) {
            alert('Erreur lors du profile');
            console.error('Erreur lors du profile', error);
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', height: '100%', backgroundColor: "white" }}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div class="col">
                <Navbar class="row " activeClass="dashboard" />
                <div className='row  mx-3 my-4 '>
                    {offerSuccess && (
                        <div className="alert alert-success mt-3" role="alert">
                            L'offre a été soumise avec succès!
                        </div>
                    )}
                    <div className='row'>
                        <div className='col-8'>
                            <h5 className="mb-0">Découvrez Toutes Les Expéditions Disponibles Sur CharJi</h5>
                        </div>
                        <div className='col-4 d-flex align-items-center justify-content-end'>
                            <Link to="/transporteur/AjouterVehicule" className="nav-link">
                                <div className="d-flex btnj btnb mx-2 " >
                                    <button className="btn btn-warnig-outline-success " type="submit">ajouter vehicule</button>
                                </div>
                            </Link>
                        </div>
                    </div>


                    <div className="input-group my-3">
                        <input
                            type="text"
                            className="form-control"
                            list="datalistOptions" id="exampleDataList"
                            placeholder="Entrez le type d'expédition..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <datalist id="datalistOptions">
                        {expeditions.map((option) => (
                                  <option key={option.id} value={option.type_marchandise}>
                                    {option.type_marchandise}
                                  </option>
                                ))}
                           
                        </datalist>
                        <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>Rechercher</button>
                    </div>
                    <div className="row">
                        {expeditions.map(expedition => (
                            <div key={expedition.id} className="col-12 col-md-6 col-xl-4 mb-3 mb-sm-0">
                                <Card
                                    type="inner"
                                    title={
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="secondary" class="bi m-2 bi-calendar-week-fill" viewBox="0 0 16 16">
                                                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"></path>
                                            </svg> {expedition.type_marchandise}
                                        </>}
                                    extra={<a>#{expedition.id}</a>}
                                    headStyle={{ background: '#f0f0f0' }}
                                >
                                    <div class="card-body">
                                        <div className='row'>
                                            <div className='d-flex justify-content-center col-10 col-sm-5 col-md-10 col-lg-6'>
                                                <div className='d-flex flex-column mx-2'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-crosshair mt-1" viewBox="0 0 16 16">
                                                        <path d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical my-2" viewBox="0 0 16 16">
                                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                    </svg>

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill " viewBox="0 0 16 16">
                                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                    </svg>
                                                </div>
                                                <div className=' text-md-center text-lg-start'>
                                                    <p class="card-text mb-0" >Ville départ</p>
                                                    <p class="card-title mb-1 "><small>{expedition.ville_depart}</small></p>
                                                    <p class="card-text mb-0">Ville d'arrivée</p>
                                                    <p class="card-title mb-1"><small>{expedition.ville_arrivee}</small></p>
                                                </div>
                                            </div>

                                            <div className='col-12 col-sm-6 col-md-12 col-lg-6  '>
                                                <div >
                                                    <p class="card-text mb-0 text-center text-md-center text-lg-start text-sm-start" >Description</p>
                                                    <p className='text-center text-md-center text-lg-start text-sm-start'><small>{expedition.consignes_exp}</small></p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='mb-2 mt-2' />

                                        <div className='row mx-2'>
                                            <div className='col-5'>
                                                <div className='d-flex justify-content-start'>
                                                    <div>
                                                        <p class="card-text mb-0" >Date Expédition</p>
                                                        <p><small>{expedition.date_expedition}</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-7'>
                                                <div className='d-flex justify-content-around'>
                                                    <div>
                                                        <p class="card-text mb-0 ">Poids</p>
                                                        <p><small>{expedition.poids} kg</small></p>
                                                    </div>
                                                    <div>
                                                        <p class="card-text mb-0">Volume</p>
                                                        <p><small>{expedition.volume} m³</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mt-1'>
                                                <Button type="primary" danger className='mb-2' block data-bs-toggle="modal" data-bs-target={`#exampleModal${expedition.id}`}>
                                                    Proposer une Offre
                                                </Button>
                                                <Button block data-bs-toggle="modal" data-bs-target={`#exampleModalprofile${expedition.id}`} onClick={() => handleProfile(expedition.expediteur)}>Détails de l'Expéditeur</Button>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Modal */}
                                    <div className="modal fade" id={`exampleModal${expedition.id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${expedition.id}`} aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id={`exampleModalLabel${expedition.id}`}>Faire une offre</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <form class="row g-3 needs-validation txtl " novalidate>

                                                <div className="modal-body ">

                                                    <input required type="number" min="0" className="form-control" placeholder="Proposer un prix" value={offerPrices[expedition.id] || ''} onChange={(e) => handlePriceChange(expedition.id, e.target.value)} />
                                                    <select required className="form-select my-3" value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
                                                        <option value="">Sélectionner un véhicule</option>
                                                        {vehicles.map(vehicle => (
                                                            <option key={vehicle.id} value={vehicle.id}>{vehicle.marque}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                                    <button  className="btn btn-primary"  type="submit" onClick={() => handleOfferSubmit(expedition.id)}>Soumettre</button>
                                                </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                    {/* Fin Modal */}
                                    <div class="modal fade" id={`exampleModalprofile${expedition.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-md">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id={`exampleModalprofile${expedition.id}`}> A propos de l'Expéditeur</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body" >

                                                    {profileData && (
                                                        <>
                                                            <div className="text-center mb-3">
                                                                {profileData.photo_profil && (
                                                                      <a href={profileData.photo_profil.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + profileData.photo_profil : profileData.photo_profil} target="_blank" rel="noopener noreferrer">
                                                                      <img src={profileData.photo_profil.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + profileData.photo_profil : profileData.photo_profil}
                                                                          alt="Photo de profil" className="img-fluid clickable-image" style={{ width: '20%' }}
                                                                      />
                                                                  </a>
                                                                )}
                                                              
                                                            </div>
                                                            <p>Nom complet: {profileData.first_name}</p>
                                                            <p>prénom: {profileData.last_name}</p>
                                                            <p>Email: {profileData.email}</p>
                                                            <p>Adresse: {profileData.adresse}</p>
                                                            <p>Num telephone: {profileData.expediteur.tel}</p>
                                                        </>
                                                    )}
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </Layout>
    );
}

export default TransporteurDashboard;
