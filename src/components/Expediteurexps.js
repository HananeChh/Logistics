import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getExpeditionsByExpediteur, annulerParExpediteur, profileWithId, callPaymentApi, noterTransporteur, suivreExpedition, getExpediteurNotifications, deleteExpedition, fetchFacture, RestaurerExpedition, afficherPosition, generateFacture, ValiderLivraison } from '../actions/auth';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import GeoIcon from "../images/geo-fill.svg";
import L from 'leaflet';

import { Button, Card, Rate, Flex } from 'antd';


const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
function Expediteurexps() {
    const dispatch = useDispatch();
    const [expeditions, setExpeditions] = useState([]);
    const [filteredExpeditions, setFilteredExpeditions] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [positions, setPositions] = useState(null);
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [selectedPositions, setSelectedPositions] = useState(null);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dispatch(getExpeditionsByExpediteur());
                setExpeditions(data);
                const notificationsData = await dispatch(getExpediteurNotifications());
                setNotifications(notificationsData);
            } catch (error) {
                console.error(error);
                // Gérer les erreurs
            }
        };
        fetchData();

        // Refresh every 5 seconds

        const interval = setInterval(fetchData, 4000);
        return () => clearInterval(interval);
    }, [dispatch]);

    const handleStatusClick = (status) => {
        setSelectedStatus(status);
        const filtered = expeditions.filter(expedition => expedition.status === status);
        setFilteredExpeditions(filtered);
    };

    const handleCancelExpedition = async (expeditionId) => {
        try {
            await dispatch(annulerParExpediteur(expeditionId));
            // Mettre à jour les expéditions après annulation
            const updatedExpeditions = filteredExpeditions.filter(expedition => expedition.id !== expeditionId);
            setFilteredExpeditions(updatedExpeditions);
            // Afficher un message de succès
            alert("L'expédition a été annulée avec succès.");
        } catch (error) {
            // Gérer les erreurs
            console.error(error);
            alert("Une erreur s'est produite lors de l'annulation de l'expédition.");
        }
    };
    const handleDeleteExpedition = async (expeditionId) => {
        try {
            await dispatch(deleteExpedition(expeditionId));
            // Mettre à jour les expéditions après annulation
            const updatedexpeditions = filteredExpeditions.filter(expedition => expedition.id !== expeditionId);
            setFilteredExpeditions(updatedexpeditions);
            // Afficher un message de succès
            alert("L'expédition a été supprimée avec succès.");
        } catch (error) {
            // Gérer les erreurs
            console.error(error);
            alert("Une erreur s'est produite lors de la suppression de l'expédition.");
        }
    };

    const handleRestaurerExpedition = async (expeditionId) => {
        try {
            await dispatch(RestaurerExpedition(expeditionId));
            // Mettre à jour les expéditions après annulation
            const updatedexpeditions = filteredExpeditions.filter(expedition => expedition.id !== expeditionId);
            setFilteredExpeditions(updatedexpeditions);
            // Afficher un message de succès
            alert("L'expédition a été restaurer avec succès.");
        } catch (error) {
            // Gérer les erreurs
            console.error(error);
            alert("Une erreur s'est produite lors de la restauration de l'expédition.");
        }
    };


    const handleSuivreExpedition = async (expeditionId) => {
        try {
            const positionData = await dispatch(suivreExpedition(expeditionId));
            if (positionData && positionData.positions) {
                setSelectedPositions(positionData.positions);
                setPositions(positionData.positions);

            }
        } catch (error) {
            console.error('Erreur lors du suivi de l\'expédition :', error);
            // Gérer les erreurs
        }
    };

    const customIcon = L.icon({
        iconUrl: GeoIcon,
        iconSize: [38, 95], // Taille de l'icône
        iconAnchor: [22, 94], // Point d'ancrage de l'icône
        popupAnchor: [-3, -76], // Point d'ancrage du popup
    });

    const [factureUrl, setFactureUrl] = useState(null);
    const handlegenerateFacture = async (choixExpediteur) => {
        try {
            const factureObjectUrl = await dispatch(generateFacture(choixExpediteur));
            setFactureUrl(factureObjectUrl);
        } catch (error) {
            console.error('Erreur lors du chargement de la facture :', error);
        }
    };

    const redirectToadial = (expeditionId, vehiculeId) => {
        window.location.href = `http://127.0.0.1:8000/expediteurs/payment/${expeditionId}/${vehiculeId}/`;
    };
    //rating
    const [hover, setHover] = useState(null);
    const [ratings, setRatings] = useState({});
    // Fonction pour gérer le changement de rating
    const handleRateChange = async (transporteurId, newValue) => {
        try {
            // Mettre à jour l'état des ratings
            setRatings(prevRatings => ({
                ...prevRatings,
                [transporteurId]: newValue
            }));

            // Dispatch de l'action pour noter le transporteur
            await dispatch(noterTransporteur(transporteurId, newValue));
            alert("Votre évaluation a été enregistrée avec succès.");
        } catch (error) {
            console.error('Erreur lors de la notation du transporteur :', error);
        }
    };

    const [profileData, setProfileData] = useState(null);

    const handleProfile = async (UserId) => {
        try {
            const data = await dispatch(profileWithId(UserId));
            setProfileData(data);

        } catch (error) {
            alert(`Erreur lors du chargement du profile`);
            console.error('Erreur lors du profile', error);
        }
    };

    const handlevaliderlivraison = async (expeditionId) => {
        try {
            await dispatch(ValiderLivraison(expeditionId));
            const updatedexpeditions = filteredExpeditions.filter(expedition => expedition.id !== expeditionId);
            setFilteredExpeditions(updatedexpeditions);
            // Afficher un message de succès
            alert("L'expédition a été livrée avec succès.");
        } catch (error) {
            // Gérer les erreurs
            console.error(error);
            alert("Une erreur s'est produite lors de la validation de la livraison de l'expédition.");
        }
    };


    return (
        <div>
            <Navbar activeClass="Expeditions" />
            <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        <div className='mb-4'>
                            <h3>Expeditions</h3>
                        </div>
                        <div className="btn-group" role="group" aria-label="Statut">
                            <button type="button" className={`btn btn-outline-primary ${selectedStatus === 'en_attente_confirmation' ? 'active' : ''}`} onClick={() => handleStatusClick('en_attente_confirmation')}>Non Programmés</button>
                            <button type="button" className={`btn btn-outline-primary ${selectedStatus === 'programmés' ? 'active' : ''}`} onClick={() => handleStatusClick('confirme')}>Programmés</button>
                            <button type="button" className={`btn btn-outline-primary ${selectedStatus === 'en_transit' ? 'active' : ''}`} onClick={() => handleStatusClick('en_transit')}>En Transit</button>
                            <button type="button" className={`btn btn-outline-primary ${selectedStatus === 'livre' ? 'active' : ''}`} onClick={() => handleStatusClick('livre')}>Terminées</button>
                            <button type="button" className={`btn btn-outline-primary ${selectedStatus === 'annule' ? 'active' : ''}`} onClick={() => handleStatusClick('annule')}>Annulées</button>
                        </div>

                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#N°</th>
                                    <th scope="col">Type de Marchandise</th>
                                    <th scope="col">Ville de départ</th>
                                    <th scope="col">Ville d'arrivée</th>
                                    <th scope="col">Date d'expédition</th>
                                    {(selectedStatus !== 'en_attente_confirmation' && selectedStatus !== 'annule') && (
                                        <>
                                            <th scope="col">Transporteur</th>
                                            <th scope="col">Vehicule</th>
                                        </>
                                    )}

                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpeditions.map(expedition => {
                                    // Stockage temporaire de la dernière notification correspondant à l'expédition actuelle
                                    let lastNotification = null;
                                    for (let i = notifications.length - 1; i >= 0; i--) {
                                        if (notifications[i].expedition.id === expedition.id) {
                                            lastNotification = notifications[i];
                                            break; // Sortir de la boucle dès que la dernière notification est trouvée
                                        }
                                    }
                                    // Rendu JSX pour chaque expédition
                                    return (
                                        <tr key={expedition.id}>
                                            <td>{expedition.id}</td>
                                            <td>{expedition.type_marchandise}</td>
                                            <td>{expedition.ville_depart}</td>
                                            <td>{expedition.ville_arrivee}</td>
                                            <td>{expedition.date_expedition}</td>
                                            {
                                                // Affichage du bouton "Facture" uniquement si la dernière notification existe et satisfait la condition
                                                (lastNotification) && (selectedStatus !== 'en_attente_confirmation' && selectedStatus !== 'annule') && (
                                                    <React.Fragment >
                                                        <td>
                                                            {lastNotification.transporteur.photo_profil && (
                                                                <img
                                                                    src={lastNotification.transporteur.photo_profil.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + lastNotification.transporteur.photo_profil : lastNotification.transporteur.photo_profil} alt="alt"
                                                                    className='rounded-circle me-1'
                                                                    style={{ width: '2.3em', cursor: 'pointer' }}
                                                                    data-bs-toggle="modal" data-bs-target={`#exampleModalprofile${expedition.id}`}
                                                                    onClick={() => handleProfile(lastNotification.transporteur.id_user)}
                                                                />)}
                                                            {lastNotification.transporteur.username}
                                                            <div class="modal fade" id={`exampleModalprofile${expedition.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div class="modal-dialog modal-xl">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h1 class="modal-title fs-5" id={`exampleModalprofile${expedition.id}`}>Profile du Transporteur</h1>
                                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div class="modal-body" >
                                                                            {profileData && (

                                                                                <div className="card">
                                                                                    <div className="card-body">
                                                                                        <h3 className="card-title text-center">Informations Personnelles</h3>
                                                                                        <div className="row">
                                                                                            <div className="col-md-6">
                                                                                                <p className="mb-1"><strong>Prénom:</strong> {profileData.first_name}</p>
                                                                                                <p className="mb-1"><strong>Nom:</strong> {profileData.last_name}</p>
                                                                                                <p className="mb-1"><strong>Email:</strong> {profileData.email}</p>
                                                                                                <p className="mb-1"><strong>Wilaya:</strong> {profileData.adresse}</p>
                                                                                                <p className="mb-1"><strong>Num telephone:</strong> {profileData.transporteur.tel}</p>
                                                                                                <p className="mb-1"><strong>Notation: </strong>
                                                                                                    {[...Array(5)].map((star, index) => {
                                                                                                        const ratingValue = index + 1;
                                                                                                        return (
                                                                                                            <label key={index}>
                                                                                                                <FaStar
                                                                                                                    className="star"
                                                                                                                    size={25}
                                                                                                                    color={profileData.transporteur.note_moyenne >= ratingValue ? "#ffc107" : "#e4e5e9"}
                                                                                                                    onMouseEnter={() => setHover(ratingValue)}
                                                                                                                    onMouseLeave={() => setHover(null)}
                                                                                                                />
                                                                                                            </label>
                                                                                                        );
                                                                                                    })}
                                                                                                </p>


                                                                                            </div>
                                                                                            <div className="col-md-6 text-center">
                                                                                                {profileData.photo_profil && (
                                                                                                    <div className="mb-3">
                                                                                                        <img src={profileData.photo_profil} alt="Photo de profil" className="img-fluid rounded-circle" style={{ maxWidth: '150px' }} />
                                                                                                    </div>
                                                                                                )}


                                                                                            </div>
                                                                                        </div>
                                                                                        <hr />
                                                                                        <h3>Parc Automobile</h3>
                                                                                        <div className="row">
                                                                                            {profileData.vehicules.map(vehicle => (
                                                                                                <div key={vehicle.id} className="col-lg-4 col-md-6 mb-3">
                                                                                                    <div class="row g-0 ">
                                                                                                        <div class="col-4">
                                                                                                            <img src={vehicle.img_vehicule.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + vehicle.img_vehicule : vehicle.img_vehicule} alt="Vehicle" class="img-fluid rounded-start" style={{ height: "350px" }} />
                                                                                                        </div>
                                                                                                        <div class="col-8">
                                                                                                            <Card
                                                                                                                type="inner"
                                                                                                                title={
                                                                                                                    <>
                                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="danger" class="bi bi-truck me-1" viewBox="0 0 16 16">
                                                                                                                            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                                                                                                                        </svg> {vehicle.marque} {vehicle.modele}
                                                                                                                    </>}
                                                                                                                extra={<a>#{vehicle.id}</a>}
                                                                                                                headStyle={{ background: '#f5f5f5' }}
                                                                                                            >
                                                                                                                <div className='row '>
                                                                                                                    <div className='col-sm-6 col-lg-12 col-xl-6'>
                                                                                                                        <p class="card-text  mb-0">Type vehicule</p>
                                                                                                                        <p class="card-text"><small>{vehicle.type}</small></p>
                                                                                                                    </div>
                                                                                                                    <div className='col-sm-6 col-lg-12 col-xl-6'>
                                                                                                                        <p class="card-text  mb-0">Description</p>
                                                                                                                        <p class="card-text"><small>{vehicle.description}</small></p>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div className='row my-3'>
                                                                                                                    <div className='col-sm-6 col-lg-12 col-xl-6'>
                                                                                                                        <p class="card-text  mb-0">Capacité chargement</p>
                                                                                                                        <p class="card-text"><small>{vehicle.capacite_chargement} Tonne</small></p>
                                                                                                                    </div>
                                                                                                                    <div className='col-sm-6 col-lg-12 col-xl-6'>
                                                                                                                        <p class="card-text  mb-0">Volume vehicule</p>
                                                                                                                        <p class="card-text"><small>{vehicle.volume} m³</small></p>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div class="border py-1  text-center">
                                                                                                                    <p class="card-text  mb-0">Immatriculation : {vehicle.immatriculation}</p>
                                                                                                                </div>
                                                                                                            </Card>
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>
                                                                                            ))}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div class="modal-footer">
                                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{lastNotification.vehicule.marque}</td>

                                                    </React.Fragment>
                                                )
                                            }
                                            <td>

                                                <td>
                                                    {(() => {
                                                        switch (selectedStatus) {
                                                            case 'confirme':
                                                                return (
                                                                    <>
                                                                        <div className='d-flex justify-content-start'>
                                                                            <button type="button" className="col-6 btn btn-danger" onClick={() => handleCancelExpedition(expedition.id)}>Annuler</button>
                                                                            <button type="button" onClick={() => handlegenerateFacture(lastNotification.choix_expediteur_id)} data-bs-toggle="modal" data-bs-target={`#exampleModalfacture${expedition.id}`} className="col-6 btn btn-warning mx-xl-4"> Voir Facture</button>

                                                                        </div>
                                                                        {/* <p>{lastNotification.choix_expediteur_id}id choixexp</p>
                                                                        <p>{lastNotification.id}idnotif</p> */}



                                                                        <div class="modal fade" id={`exampleModalfacture${expedition.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                            <div class="modal-dialog modal-xl">
                                                                                <div class="modal-content">
                                                                                    <div class="modal-header">
                                                                                        <h1 class="modal-title fs-5" id={`exampleModalfacture${expedition.id}`}>Facture</h1>
                                                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                    </div>
                                                                                    <div class="modal-body" >
                                                                                        {factureUrl && (
                                                                                            <div>
                                                                                                <iframe src={factureUrl} title="Facture PDF" width="100%" height="350px"></iframe>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                    <div class="modal-footer">
                                                                                        {(() => {
                                                                                            switch (expedition.paiement) {
                                                                                                case "par_carte":
                                                                                                    return (
                                                                                                        <button type="button" className="btn btn-success" onClick={() => redirectToadial(expedition.id, lastNotification.vehicule.id)}>Payer</button>
                                                                                                    );
                                                                                                case "Virement_bancaire":
                                                                                                    return (
                                                                                                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Payer</button>
                                                                                                    );
                                                                                                default:
                                                                                                    return null;
                                                                                            }
                                                                                        })()}

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </>
                                                                );

                                                            case 'en_attente_confirmation':
                                                                return (
                                                                    <>
                                                                        <Link to={`/expediteur/UpdateExpeditionForm/${expedition.id}`} className="mx-4">
                                                                            <button type="button" className="btn btn-warning">Modifier</button>
                                                                        </Link>
                                                                        <button type="button" className="btn btn-danger mx-3" onClick={() => handleDeleteExpedition(expedition.id)}>supprimer</button>
                                                                    </>
                                                                );
                                                            case 'annule':
                                                                return (
                                                                    <button type="button" className="btn btn-success" onClick={() => handleRestaurerExpedition(expedition.id)}>Restaurer</button>
                                                                );
                                                            case 'en_transit':
                                                                return (
                                                                    <>
                                                                        <button type="button" className="btn btn-warning" onClick={() => handleSuivreExpedition(expedition.id)} data-bs-toggle="offcanvas" data-bs-target={`#offcanvasRight-${expedition.id}`} aria-controls={`offcanvasRight-${expedition.id}`}>
                                                                            Suivre
                                                                        </button>
                                                                        <button type="button" className="btn btn-success mx-xl-2" onClick={() => handlevaliderlivraison(expedition.id)} >Valider Livraison</button>

                                                                        <div class="offcanvas offcanvas-end w-50" tabindex="-1" id={`offcanvasRight-${expedition.id}`} aria-labelledby={`offcanvasRightLabel-${expedition.id}`}>
                                                                            <div class="offcanvas-header">
                                                                                <h5 class="offcanvas-title" id={`offcanvasRightLabel-${expedition.id}`}>Suivi de l'expedition N° {expedition.id} "{expedition.type_marchandise}"</h5>
                                                                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                                            </div>
                                                                            <div class="offcanvas-body">
                                                                                <MapContainer center={selectedPositions ? [selectedPositions[0].latitude, selectedPositions[0].longitude] : [0, 0]} zoom={3} style={{ height: '350px', width: '100%' }}>
                                                                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                                                    {selectedPositions && selectedPositions.map((position, index) => (
                                                                                        <Marker key={index} position={[position.latitude, position.longitude]} icon={customIcon}>
                                                                                            <Popup>
                                                                                                Date: {position.date}<br />
                                                                                                Ville: {position.ville}<br />
                                                                                                Quartier: {position.quartier}<br />
                                                                                                Rue: {position.rue}
                                                                                            </Popup>
                                                                                        </Marker>
                                                                                    ))}
                                                                                </MapContainer>

                                                                                <table class="table">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th>Date</th>
                                                                                            <th>Ville</th>
                                                                                            <th>Quartier</th>
                                                                                            <th>Rue</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {positions && positions.map((position, index) => (
                                                                                            <tr key={index}>
                                                                                                <td>{position.date}</td>
                                                                                                <td>{position.ville}</td>
                                                                                                <td>{position.quartier}</td>
                                                                                                <td>{position.rue}</td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </>

                                                                );
                                                            case 'livre':
                                                                return (
                                                                    <div>

                                                                        <Flex gap="middle" vertical>
                                                                            <Rate
                                                                                tooltips={desc}
                                                                                onChange={handleRateChange.bind(null, lastNotification.choix_expediteur_id)}
                                                                                value={ratings[lastNotification.choix_expediteur_id] || 0} // Utilisation du rating actuel ou 0 si non défini
                                                                            />
                                                                            {ratings[lastNotification.choix_expediteur_id] ? <span></span> : null}
                                                                        </Flex>

                                                                    </div>
                                                                );
                                                            default:
                                                                return null;
                                                        }
                                                    })()}
                                                </td>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expediteurexps;
