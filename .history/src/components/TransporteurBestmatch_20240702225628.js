import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVehicles, getMatchedExpeditionForVehicule, makeOfferForExpedition } from '../actions/auth';
import Navbar from './Navbar';
import { Card, Layout, Button } from 'antd';
import Sidebar from './Sidebar';


function TransporteurBestmatch() {
    const dispatch = useDispatch();
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [expeditions, setExpeditions] = useState([]);
    const [offerPrices, setOfferPrices] = useState({});
    const [offerSuccess, setOfferSuccess] = useState(false); // State to track offer success
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dispatch(getAllVehicles());
                setVehicles(data);
            } catch (error) {
                // Handle errors
            }
        };
        fetchData();
    }, [dispatch]);

    const handleVehicleClick = async (vehicleId) => {
        try {
            setSelectedVehicle(vehicleId);
            const data = await dispatch(getMatchedExpeditionForVehicule(vehicleId));
            setExpeditions(data);
            // Reset offer prices when selecting a new vehicle
            setOfferPrices({});
            // Reset offer success state
            setOfferSuccess(false);
        } catch (error) {
            // Handle errors
        }
    };

    const handleOfferSubmit = (expeditionId) => {
        const price = offerPrices[expeditionId];
        if (price && price > 0) {
            dispatch(makeOfferForExpedition(expeditionId, selectedVehicle, price))
                .then(() => {
                    // Handle successful offer submission
                    setOfferSuccess(true);
                    // Reset offer success state after some time
                    setTimeout(() => {
                        setOfferSuccess(false);
                    }, 5000);
                })
                .catch((error) => {
                    // Handle errors
                });
        }
    };

    const handlePriceChange = (expeditionId, price) => {
        setOfferPrices(prevState => ({
            ...prevState,
            [expeditionId]: price
        }));
    };

    return (
        <Layout style={{ minHeight: '100vh', height: '100%', backgroundColor: "white" }}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div class="col">
                <Navbar class="row" activeClass="dashboard"/>
                <div className='row mt-4 mx-2'>
                    {offerSuccess && (
                        <div className="alert alert-success mt-3" role="alert">
                            L'offre a été soumise avec succès!
                        </div>
                    )}
                    <div className="row">
                        <div className='col-lg-5'>
                            <Card title="Parc Automobile">
                                {vehicles.map(vehicule => (
                                    <div key={vehicule.id} className={`card  mb-3 ${selectedVehicle === vehicule.id ? 'card border-dark ' : ''}`} onClick={() => handleVehicleClick(vehicule.id)}>
                                        <div class="row g-0 ">
                                            <div class="col-4">
                                                <img src={vehicule.img_vehicule.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + vehicule.img_vehicule : vehicule.img_vehicule} alt="Vehicle" class="img-fluid rounded-start" style={{ height: "350px" }} />
                                            </div>
                                            <div class="col-8">
                                                <Card
                                                    type="inner"
                                                    title={
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="danger" class="bi bi-truck me-1" viewBox="0 0 16 16">
                                                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                                                            </svg> {vehicule.marque} {vehicule.modele}
                                                        </>}
                                                    extra={<a>#{vehicule.id}</a>}
                                                    headStyle={{ background: '#f5f5f5' }}
                                                >
                                                    <div className='row '>
                                                        <div className='col-sm-6 col-lg-12 col-xl-6'>
                                                            <p class="card-text  mb-0">Type Vehicule </p>
                                                            <p class="card-text"><small>{vehicule.type}</small></p>
                                                        </div>
                                                        <div className='col-sm-6 col-lg-12 col-xl-6'>
                                                            <p class="card-text  mb-0">Description</p>
                                                            <p class="card-text"><small>{vehicule.description}</small></p>
                                                        </div>
                                                    </div>
                                                    <div className='row my-3'>
                                                        <div className='col-sm-6 col-lg-12 col-xl-6'>
                                                            <p class="card-text  mb-0">Capacité chargement</p>
                                                            <p class="card-text"><small>{vehicule.capacite_chargement} Tonne</small></p>
                                                        </div>
                                                        <div className='col-sm-6 col-lg-12 col-xl-6'>
                                                            <p class="card-text  mb-0">Volume Vehicule</p>
                                                            <p class="card-text"><small>{vehicule.volume} m³</small></p>
                                                        </div>
                                                    </div>
                                                    <div class="border py-1  text-center">
                                                        <p class="card-text  mb-0">Immatriculation : {vehicule.immatriculation}</p>
                                                    </div>
                                                </Card>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Card>
                        </div>
                        <div className="col">
                            <Card title="Expéditions Recommandée"  >
                                {expeditions.map(expedition => (
                                    <div key={expedition.id} className="  mb-sm-0">
                                        <Card
                                            type="inner"
                                            title={
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="secondary" class="bi m-2 bi-calendar-week-fill" viewBox="0 0 16 16">
                                                        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"></path>
                                                    </svg> {expedition.type_marchandise}
                                                </>}
                                            extra={<a>#{expedition.id}</a>}
                                            headStyle={{ background: '#f5f5f5' }}
                                        >


                                            <div class="card-body">
                                                <div className='row'>
                                                    <div className='d-flex justify-content-center col-10 col-sm-4 col-md-3 col-lg-4'>
                                                    <div className='d-flex flex-column me-2'>
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
                                                    <div >
                                                        <p class="card-text mb-0">Ville de départ</p>
                                                        <p class="card-title mb-1"><small>{expedition.ville_depart}</small></p>
                                                        <p class="card-text mb-0">Ville d'arrivée</p>
                                                        <p class="card-title"><small>{expedition.ville_arrivee}</small></p>
                                                    </div>
                                                    </div>
                                                    <hr className='d-sm-none'/>
                                                    <div className='col-12 col-sm-6 col-lg-7'>
                                                        <div>
                                                            <div class="d-flex justify-content-start">
                                                                {expedition.expediteur.user.photo_profil && (
                                                                    <img src={expedition.expediteur.user.photo_profil.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + expedition.expediteur.user.photo_profil : expedition.expediteur.user.photo_profil} alt="profile" className="img-fluid rounded-circle mt-1" style={{ maxWidth: '45px', maxHeight: "40px" }} />
                                                                )}
                                                                <div className='mx-2'>
                                                                    <p class="card-text mb-0" >Expediteur</p>
                                                                    <p className='mb-0'><small>{expedition.expediteur.user.first_name} {expedition.expediteur.user.last_name}</small></p>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex justify-content-start mt-2 mx-1">

                                                                <div>
                                                                    <p class="card-text mb-0" >Téléphone</p>
                                                                    <p><small>{expedition.expediteur.tel}</small></p>
                                                                </div>
                                                                <div className='mx-3'>
                                                                    <p class="card-text mb-0" >Email</p>
                                                                    <p><small>{expedition.expediteur.user.email}</small></p>
                                                                </div>
                                                                <div className=''>
                                                                    <p class="card-text mb-0" >Adresse</p>
                                                                    <p><small>{expedition.expediteur.user.adresse}</small></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className='mb-2 mt-2' />
                                                <div className='row mx-2'>
                                                    <div className='col-4'>
                                                        <div className='d-flex justify-content-start'>
                                                            <div>
                                                                <p class="card-text mb-0" >Date Expédition</p>
                                                                <p><small>{expedition.date_expedition}</small></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-4'>
                                                        <p class="card-text mb-0" >Description</p>
                                                        <p><small>{expedition.consignes_exp}</small></p>
                                                    </div>
                                                    <div className='col-4'>
                                                        <div className='d-flex justify-content-around'>
                                                            <div className='me-2'>
                                                                <p class="card-text mb-0 ">Poids</p>
                                                                <p><small>{expedition.poids} kg</small></p>
                                                            </div>
                                                            <div>
                                                                <p class="card-text mb-0">Volume</p>
                                                                <p><small>{expedition.volume} m³</small></p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="input-group mt-2">
                                                    <input type="number" min="0" className="form-control" placeholder="Proposer un prix pour cette expedition" value={offerPrices[expedition.id] || ''} onChange={(e) => handlePriceChange(expedition.id, e.target.value)} />
                                                    <span class="input-group-text">DA</span>
                                                    <div className="input-group-append mx-2">
                                                        <Button type="primary" danger className='mb-2' disabled={!offerPrices[expedition.id]} onClick={() => handleOfferSubmit(expedition.id)} >
                                                            Soumettre
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>


                                        </Card>
                                    </div>
                                ))}
                            </Card>

                        </div>
                    </div>

                </div>
            </div>

        </Layout>
    );
}

export default TransporteurBestmatch;
