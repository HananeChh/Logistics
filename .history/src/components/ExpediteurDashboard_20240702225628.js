import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getExpeditionsByExpediteur, getMatchedVehiclesForExpedition, choisir_vehicule, getExpediteurUser, RetourSurAction } from '../actions/auth';
import Navbar from './Navbar';
import Alert from 'react-bootstrap/Alert';
import { Button, Card, Rate } from 'antd';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import { Divider, Typography, Tag } from 'antd';


const { Text, Link } = Typography;

function ExpediteurDashboard() {
    const dispatch = useDispatch();
    const [expeditions, setExpeditions] = useState([]);
    const [matchedVehicles, setMatchedVehicles] = useState([]);
    const [selectedExpeditionId, setSelectedExpeditionId] = useState(null);
    const [showCancel, setShowCancel] = useState(false); // État pour afficher le bouton "Annuler"
    const [rejectedOfferId, setRejectedOfferId] = useState(null); // État pour stocker l'identifiant de l'offre rejetée
    const [offerId, setofferId] = useState(null); // État pour stocker l'identifiant de l'offre rejetée
    const [ignored, forcedUpdate] = useReducer(x => x + 1, 0);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dispatch(getExpeditionsByExpediteur());
                setExpeditions(data.filter(expedition => expedition.status === 'en_attente_confirmation'));
                // setSelectedExpeditionId(expeditions[1].id);
               
            } catch (error) {
            }
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        dispatch(getExpediteurUser());
    }, [dispatch]);

    // const handleExpeditionClick = async (expeditionId) => {
    //     try {
    //         setSelectedExpeditionId(expeditionId);
    //         const vehicles = await dispatch(getMatchedVehiclesForExpedition(expeditionId));
    //         setMatchedVehicles(vehicles);
    //         setShowCancel(false); // Afficher le bouton "Annuler"
    //     } catch (error) {
    //         alert('Une erreur s\'est produite')
    //     }
    // };

    useEffect(() => {
       
        const fetchData = async () => {
            try {
                if (selectedExpeditionId !== null){
                    const vehicles = await dispatch(getMatchedVehiclesForExpedition(selectedExpeditionId));
                    setMatchedVehicles(vehicles);
                    setShowCancel(false); // Afficher le bouton "Annuler"
                    console.log("vvvvv",selectedExpeditionId)
                }
             
            } catch (error) {
                // alert('Une erreur s\'est produite ');
            }
        };
        if (selectedExpeditionId !== null) {
            fetchData();
          }
        // Refresh every 5 seconds

        const interval = setInterval(fetchData, 7000);
        return () => clearInterval(interval);
    }, [dispatch, selectedExpeditionId, expeditions]); // Déclencher un rechargement lorsque selectedExpeditionId ou expeditions change

    const handleExpeditionClick = async (expeditionId) => {
        try {
            setSelectedExpeditionId(expeditionId); // Définir l'ID de l'expédition sélectionnée
            setShowCancel(false); // Réinitialiser l'état de l'annulation
            console.log("bro",selectedExpeditionId)
        } catch (error) {
            // alert('Une erreur s\'est produite');
        }
    };

    const handleAcceptOffer = async (expeditionId, vehicleId) => {
        try {
            await dispatch(choisir_vehicule(expeditionId, vehicleId));
            alert('Le transporteur sera notifié de votre demande.');
            setShowCancel(true); // Masquer le bouton "Annuler"
            forcedUpdate();
            setError(null);
            // Mettre à jour l'état ou effectuer d'autres actions si nécessaire
        } catch (error) {
            setError(error.message);
            // Gérer les erreurs
        }
    };

    useEffect((expeditionId, vehicleId) => {
        dispatch(choisir_vehicule(expeditionId, vehicleId));
    }, [ignored]);

    const handleAnnuler = async (expeditionId, vehicleId) => {
        try {
            await dispatch(RetourSurAction(expeditionId, vehicleId));
            alert("RetourSurAction fait avec succès.");
            setShowCancel(false);
            forcedUpdate();
            // Masquer le bouton "Annuler"
            // Autres traitements si nécessaire
        } catch (error) {
            alert('Une erreur est survenue.');
            // Gérer les erreurs
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null);
        }, 5000); // Efface l'erreur après 5 secondes (5000 millisecondes)

        return () => clearTimeout(timer); // Nettoyer le timer lors du démontage du composant
    }, [error]);






    return (
        <div>
            <Navbar activeClass="Dashboard" />
            <div className="mx-3 mt-4">
                {error && (
                    <Alert variant="success" onClose={() => setError(null)} dismissible>
                        {error}
                    </Alert>
                )}
                <Divider orientation="center"> Bienvenue sur notre plateforme CharJi !</Divider>
                <Text strong type="secondary" className='mx-4'>
                    Consultez toutes vos expéditions en un coup d'œil et découvrez les véhicules recommandés pour chacune d'elles, optimisés par nos services pour assurer une livraison efficace et fiable.
                </Text>

                <div className="row mt-5">
                    <div className='col-md-4'>
                        <Card title="L'ensemble de vos expéditions">
                            {expeditions.map(expedition => (
                                <div key={expedition.id} className="col mb-3">
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
                                        className={` ${selectedExpeditionId === expedition.id ? 'bgg ' : ''}`}
                                        onClick={() => handleExpeditionClick(expedition.id)}
                                    >
                                        <div class="card-body" >
                                            <div className='row'>
                                                <div className='d-flex justify-content-start col-sm-5 col-md-12 col-lg-7'>
                                                    <div className='d-flex flex-column '>
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
                                                    <div className='mx-2'>
                                                        <p class="card-text mb-0" >Ville départ</p>
                                                        <p class="card-title mb-1 "><small>{expedition.ville_depart}</small></p>
                                                        <p class="card-text mb-0">Ville d'arrivée</p>
                                                        <p class="card-title"><small>{expedition.ville_arrivee}</small></p>
                                                    </div>
                                                </div>

                                                <div className='col-sm-7 col-md-12 col-lg-5'>
                                                    <div>
                                                        <p class="card-text mb-0" >Description</p>
                                                        <p><small>{expedition.consignes_exp}</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className='mb-2 mt-2' />

                                            <div className='row mx-2'>
                                                <div className='col-sm-6 col-md-12 col-lg-6'>
                                                    <div className='d-flex justify-content-start'>
                                                        <div>
                                                            <p class="card-text mb-0" >Date Expédition</p>
                                                            <p><small>{expedition.date_expedition}</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-sm-6 col-md-12 col-lg-6'>
                                                    <div className='d-flex justify-content-around'>
                                                        <div>
                                                            <p class="card-text mb-0 ">Poids</p>
                                                            <p><small>{expedition.poids} Tonnes</small></p>
                                                        </div>
                                                        <div>
                                                            <p class="card-text mb-0">Volume</p>
                                                            <p><small>{expedition.volume} m³</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </Card>
                    </div>
                    <Card type="inner" title="L'ensemble des véhicules recommandés pour votre expedition " className='col-md-8 g-0'>
                        <div className='row'>
                            <div className='col-sm-6 col-xs-12'>
                                {matchedVehicles.map(vehicule => (
                                    vehicule.prix_propose.length !== 0 &&
                                    <div key={vehicule.id} className="card col  mb-3">
                                        <div class="row g-0">
                                            <div class="col-md-4">
                                                <img src={vehicule.img_vehicule.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + vehicule.img_vehicule : vehicule.img_vehicule} alt="Vehicle" class="img-fluid rounded-start" style={{ height: "28em" }} />
                                            </div>
                                            <div class="col-md-8">
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
                                                    <div>
                                                        <div class="d-flex justify-content-start">
                                                        {vehicule.photo_profil_transporteur && (
                                                            <img data-bs-toggle="modal" data-bs-target={`#exampleModalprofile${vehicule.id}`} src={vehicule.photo_profil_transporteur.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + vehicule.photo_profil_transporteur : vehicule.photo_profil_transporteur} alt="Vehicle" className="img-fluid rounded-circle my-2" style={{ maxWidth: '60px', maxHeight: '35px', cursor: 'pointer' }} />
                                                        )}
                                                            <div className='mx-2 '>
                                                                <p className='mb-0'><small>{vehicule.transporteur.user.first_name} {vehicule.transporteur.user.last_name}</small></p>
                                                                <Rate disabled defaultValue={vehicule.transporteur.note_moyenne} style={{ fontSize: "15px" }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row '>
                                                        <div className='col-6 col-md-12 col-xl-6'>
                                                            <p class="card-text  mb-0">Type Vehicule </p>
                                                            <p class="card-text"><small>{vehicule.type}</small></p>
                                                        </div>
                                                        <div className='col-6 col-md-12 col-xl-6'>
                                                            <p class="card-text  mb-0">Description</p>
                                                            <p class="card-text"><small>{vehicule.description}</small></p>
                                                        </div>
                                                    </div>
                                                    <div className='row my-3'>
                                                        <div className='col-6 col-md-12 col-xl-6'>
                                                            <p class="card-text  mb-0">Capacité chargement</p>
                                                            <p class="card-text"><small>{vehicule.capacite_chargement} Tonne</small></p>
                                                        </div>
                                                        <div className='col-6 col-md-12 col-xl-6'>
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
                                        <div className='row g-0 '>
                                            {vehicule.prix_propose.map(price => (
                                                <>
                                                    <div class=" col-sm-7 col-xs-12 col-md-12 col-lg-7 my-2  text-center">
                                                        <Tag color="volcano" className='px-3 py-2'>Prix proposé : {price.prix_propose} DA</Tag>

                                                    </div>
                                                    {price.annule ? (
                                                        <Button type="primary" danger className='my-2 col-sm-4 col-xs-12 col-md-12 col-lg-4' onClick={() => handleAnnuler(selectedExpeditionId, vehicule.id)}>
                                                            Annuler
                                                        </Button>
                                                    ) : (
                                                        <>
                                                            <Button type="primary" danger className='my-2 col-sm-4 col-xs-12 col-md-12 col-lg-4' onClick={() => handleAcceptOffer(selectedExpeditionId, vehicule.id)}>
                                                                Choisir
                                                            </Button>

                                                        </>
                                                    )}
                                                </>
                                            ))}
                                        </div>

                                        <div className="modal fade" id={`exampleModalprofile${vehicule.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-md">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 className="modal-title fs-5" id={`exampleModalprofile${vehicule.id}`}>profile</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body" >

                                                    {vehicule.photo_profil_transporteur && (

                                                        <div className="text-center mb-3">
                                                            <a href={vehicule.photo_profil_transporteur.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + vehicule.photo_profil_transporteur : vehicule.photo_profil_transporteur} target="_blank" rel="noopener noreferrer">
                                                                <img src={vehicule.photo_profil_transporteur.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + vehicule.photo_profil_transporteur : vehicule.photo_profil_transporteur}
                                                                    alt="Photo de profil" className="img-fluid clickable-image" style={{ width: '20%' }} />
                                                            </a>
                                                        </div>
                                                    )}
                                                        <p>first_name: {vehicule.transporteur.user.first_name}</p>
                                                        <p>last_name: {vehicule.transporteur.user.last_name}</p>
                                                        <p>Email: {vehicule.transporteur.user.email}</p>
                                                        <p>Adresse: {vehicule.transporteur.user.adresse}</p>
                                                        <p>Num telephone: {vehicule.transporteur.tel}</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='col-sm-6 col-xs-12 '>
                                {matchedVehicles.map(vehicule => (
                                    vehicule.prix_propose.length === 0 &&
                                    <div key={vehicule.id} className="card col  mb-3">
                                        <div class="row g-0">
                                            <div class="col-md-4">
                                                <img src={vehicule.img_vehicule.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + vehicule.img_vehicule : vehicule.img_vehicule} alt="Vehicle" class="img-fluid rounded-start" style={{ height: "317px" }} />
                                            </div>
                                            <div class="col-md-8">
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
                                                    <div>
                                                        <div class="d-flex justify-content-start">
                                                        {vehicule.photo_profil_transporteur && (

                                                            <img data-bs-toggle="modal" data-bs-target={`#exampleModalprofile${vehicule.id}`} src={vehicule.photo_profil_transporteur.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + vehicule.photo_profil_transporteur : vehicule.photo_profil_transporteur} alt="Vehicle" className="img-fluid rounded-circle my-2" style={{ maxWidth: '60px', maxHeight: '35px', cursor: 'pointer' }} />
                                                        )}
                                                            <div className='mx-2 '>
                                                                <p className='mb-0'><small>{vehicule.transporteur.user.first_name} {vehicule.transporteur.user.last_name}</small></p>
                                                                <Rate disabled defaultValue={vehicule.transporteur.note_moyenne} style={{ fontSize: "15px" }} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <hr />
                                                    <div className='row '>
                                                        <div className='col-6 col-md-12 col-xl-6'>
                                                            <p class="card-text  mb-0">Type Vehicule </p>
                                                            <p class="card-text"><small>{vehicule.type}</small></p>
                                                        </div>
                                                        <div className='col-6 col-md-12 col-xl-6'>
                                                            <p class="card-text  mb-0">Description</p>
                                                            <p class="card-text"><small>{vehicule.description}</small></p>
                                                        </div>
                                                    </div>
                                                    <div className='row my-3'>
                                                        <div className='col-6 col-md-12 col-xl-6'>
                                                            <p class="card-text  mb-0">Capacité chargement</p>
                                                            <p class="card-text"><small>{vehicule.capacite_chargement} Tonne</small></p>
                                                        </div>
                                                        <div className='col-6 col-md-12 col-xl-6'>
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
                                        <div className='row g-0 mx-3 my-2 '>
                                            <Tag icon={<ExclamationCircleOutlined />} className="px-2" color="warning" >
                                                Ce transporteur n'a pas soumis d'offre pour ce véhicule.<br />
                                                Voulez vous le soliciter ?
                                                <a>
                                                    <Tag color="#87d068" className='mx-2 my-1' onClick={() => handleAcceptOffer(selectedExpeditionId, vehicule.id)}>
                                                        Oui
                                                    </Tag>
                                                </a>
                                            </Tag>
                                        </div>
                                        <div className="modal fade" id={`exampleModalprofile${vehicule.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-md">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 className="modal-title fs-5" id={`exampleModalprofile${vehicule.id}`}>profile</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body" >

                                                    {vehicule.photo_profil_transporteur && (

                                                        <div className="text-center mb-3">
                                                            <a href={vehicule.photo_profil_transporteur.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + vehicule.photo_profil_transporteur : vehicule.photo_profil_transporteur} target="_blank" rel="noopener noreferrer">
                                                                <img src={vehicule.photo_profil_transporteur.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + vehicule.photo_profil_transporteur : vehicule.photo_profil_transporteur}
                                                                    alt="Photo de profil" className="img-fluid clickable-image" style={{ width: '20%' }} />
                                                            </a>
                                                        </div>
                                                    )}
                                                        <p>first_name: {vehicule.transporteur.user.first_name}</p>
                                                        <p>last_name: {vehicule.transporteur.user.last_name}</p>
                                                        <p>Email: {vehicule.transporteur.user.email}</p>
                                                        <p>Adresse: {vehicule.transporteur.user.adresse}</p>
                                                        <p>Num telephone: {vehicule.transporteur.tel}</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                </div>
            </div>

        </div>
    );
}

export default ExpediteurDashboard;

