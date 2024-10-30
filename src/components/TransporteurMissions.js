import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getExpeditionsByExpediteur, annulerParExpediteur, profileWithId, validerChoixExpediteur, getTransporteurNotifications, deleteExpedition, afficherPosition, getExpediteursParTransporteur, annulerParTransporteur, updatePosition, getTransporteurDetailsTable, RefuserMission } from '../actions/auth';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Button, Layout, Card } from 'antd';
import Alert from 'react-bootstrap/Alert';


function TransporteurMissions() {
    const dispatch = useDispatch();
    const [expeditions, setExpeditions] = useState([]);
    const [filteredExpeditions, setFilteredExpeditions] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [missionsEnAttente, setMissionsEnAttente] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dispatch((getExpediteursParTransporteur()));
                setExpeditions(data);
                const datadetails = await dispatch(getTransporteurDetailsTable());
                setMissionsEnAttente(datadetails.choix_expediteur);
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
            await dispatch(annulerParTransporteur(expeditionId));
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



    const handleUpdatePosition = async (expeditionId, dateExpedition) => {
        try {
            const position = await getCurrentPosition();
            // Vérifie si la date actuelle est égale à la date d'expédition
            const currentDate = new Date();
            const expeditionDate = new Date(dateExpedition);
            if (currentDate.toDateString() === expeditionDate.toDateString()) {
                await dispatch(updatePosition(expeditionId, position.coords.latitude, position.coords.longitude));
                console.log('Position updated avec succes');
                alert(`Mise à jour de votre position effectuée avec succès.`);
            } else {
                // La date actuelle n'est pas la même que la date d'expédition, donc le bouton est désactivé
                alert("Vous ne pouvez mettre à jour votre position que le jour de l'expédition.");
            }
        } catch (error) {
            console.error('Error updating position:', error);
            alert("Error updating position");
        }
    };


    const getCurrentPosition = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve(position);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    };




    const handleRefuserMission = async (choixId) => {
        try {
            await dispatch(RefuserMission(choixId));
            alert('Mission refusée effectuée avec succès.');
            const updatedData = missionsEnAttente.filter(missionEnAttente => missionEnAttente.id !== choixId);
            setMissionsEnAttente(updatedData);

        } catch (error) {
            alert('Une erreur est survenue lors de Mission refusée.');
        }
    };

    const handleValiderChoix = async (choixId) => {
        try {
            await dispatch(validerChoixExpediteur(choixId));
            alert('Validation effectuée avec succès.');
            const updatedData = missionsEnAttente.filter(missionEnAttente => missionEnAttente.id !== choixId);
            setMissionsEnAttente(updatedData);

        } catch (error) {
            if (error.message === "Cette expédition est déjà attribuée à un autre transporteur.") {
                setError('Désolé, cette mission a déjà été assignée à un autre transporteur.');
            } else {
                alert('Une erreur est survenue lors de valider choix.');
            }
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null);
        }, 5000); // Efface l'erreur après 5 secondes (5000 millisecondes)

        return () => clearTimeout(timer); // Nettoyer le timer lors du démontage du composant
    }, [error]);
    const isButtonDisabled = (dateExpedition) => {
        // Récupérer la date actuelle
        const currentDate = new Date();
        // Convertir la date d'expédition en objet Date
        const expeditionDate = new Date(dateExpedition);
        // Comparer les dates
        return currentDate.toDateString() !== expeditionDate.toDateString();
    };


    return (
        <Layout style={{ minHeight: '100vh', height: '100%', backgroundColor: "white" }}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div class="col">
                <Navbar class="row" activeClass="Missions" />
                <div className="mt-4 mx-3">
                    <div className="row">
                        <div className="col">
                            {error && (
                                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                                    {error}
                                </Alert>
                            )}
                            <div className='mb-4'>
                                <h3>Missions</h3>
                            </div>

                            <div className="btn-group" role="group" aria-label="Statut">
                                <button type="button" className={`btn btn-outline-primary ${selectedStatus === 'En attente' ? 'active' : ''}`} onClick={() => handleStatusClick('En attente')}>En attente</button>
                                <button type="button" className={`btn btn-outline-primary ${selectedStatus === 'programmés' ? 'active' : ''}`} onClick={() => handleStatusClick('confirme')}>Programmés</button>
                                <button type="button" className={`btn btn-outline-primary ${selectedStatus === 'en_transit' ? 'active' : ''}`} onClick={() => handleStatusClick('en_transit')}>En Transit</button>
                                <button type="button" className={`btn btn-outline-primary ${selectedStatus === 'livre' ? 'active' : ''}`} onClick={() => handleStatusClick('livre')}>Terminées</button>
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
                                        <th scope="col">Expediteur</th>
                                        <th scope="col">Vehicule</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedStatus === 'En attente' ? (
                                        missionsEnAttente.map(missionEnAttente => (
                                            <tr key={missionEnAttente.id}>
                                                {(missionEnAttente.valide === false && missionEnAttente.ignorer === false) && (
                                                    <>
                                                        <td>{missionEnAttente.expedition.id}</td>
                                                        <td>{missionEnAttente.expedition.type_marchandise}</td>
                                                        <td>{missionEnAttente.expedition.ville_depart}</td>
                                                        <td>{missionEnAttente.expedition.ville_arrivee}</td>
                                                        <td>{missionEnAttente.expedition.date_expedition}</td>

                                                        <td>
                                                            {missionEnAttente.expediteur.user.photo_profil && (
                                                                <img
                                                                    src={missionEnAttente.expediteur.user.photo_profil.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + missionEnAttente.expediteur.user.photo_profil : missionEnAttente.expediteur.user.photo_profil}
                                                                    alt="alt"
                                                                    className='rounded-circle me-1 '
                                                                    style={{ width: '2.3em', cursor: 'pointer' }}
                                                                    data-bs-toggle="modal" data-bs-target={`#exampleModalprofile${missionEnAttente.id}`}
                                                                />
                                                            )}
                                                            {missionEnAttente.expediteur.user.username}
                                                            <div class="modal fade" id={`exampleModalprofile${missionEnAttente.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div class="modal-dialog ">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h1 class="modal-title fs-5" id={`exampleModalprofile${missionEnAttente.id}`}>A propos de l'Expéditeur</h1>
                                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div class="modal-body" >

                                                                            {missionEnAttente.expediteur && (
                                                                                <>
                                                                                    {missionEnAttente.expediteur.user.photo_profil && (
                                                                                        <div className="text-center mb-3">
                                                                                            <a href={missionEnAttente.expediteur.user.photo_profil.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + missionEnAttente.expediteur.user.photo_profil : missionEnAttente.expediteur.user.photo_profil} target="_blank" rel="noopener noreferrer">
                                                                                                <img src={missionEnAttente.expediteur.user.photo_profil.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + missionEnAttente.expediteur.user.photo_profil : missionEnAttente.expediteur.user.photo_profil}
                                                                                                    alt="Photo de profil" className="img-fluid clickable-image rounded me-1 "
                                                                                                    style={{ width: '20%' }}
                                                                                                />

                                                                                            </a>
                                                                                        </div>
                                                                                    )}

                                                                                    <p>first_name: {missionEnAttente.expediteur.user.first_name}</p>
                                                                                    <p>last_name: {missionEnAttente.expediteur.user.last_name}</p>
                                                                                    <p>Email: {missionEnAttente.expediteur.user.email}</p>
                                                                                    <p>Adresse: {missionEnAttente.expediteur.user.adresse}</p>
                                                                                    <p>Num telephone: {missionEnAttente.expediteur.tel}</p>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                        <div class="modal-footer">
                                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{missionEnAttente.vehicule.marque}</td>

                                                        <td className='row '>
                                                            <button type="button" className="col-lg-5 col-9 btn btn-success me-3" onClick={() => handleValiderChoix(missionEnAttente.id)}>Accepter</button>
                                                            <button type="button" className=" col-lg-5 col-9 btn btn-danger " onClick={() => handleRefuserMission(missionEnAttente.id)} >Refuser</button>
                                                        </td>


                                                    </>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        filteredExpeditions.map(expedition => (
                                            <tr key={expedition.id}>
                                                <td>{expedition.id}</td>
                                                <td>{expedition.type_marchandise}</td>
                                                <td>{expedition.ville_depart}</td>
                                                <td>{expedition.ville_arrivee}</td>
                                                <td>{expedition.date_expedition}</td>

                                                {missionsEnAttente.map(missionEnAttente => {
                                                    // Vérifier si l'ID de l'expédition correspond à l'ID de la notification
                                                    if ((missionEnAttente.expedition.id === expedition.id) && (missionEnAttente.valide === true)) {
                                                        return (
                                                            <React.Fragment key={missionEnAttente.id}>
                                                                <td>
                                                                    {missionEnAttente.expediteur.user.photo_profil && (

                                                                        <img
                                                                            src={missionEnAttente.expediteur.user.photo_profil.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + missionEnAttente.expediteur.user.photo_profil : missionEnAttente.expediteur.user.photo_profil}
                                                                            alt="alt"
                                                                            className='rounded-circle me-1 '
                                                                            style={{ width: '2.3em', cursor: 'pointer' }}
                                                                            data-bs-toggle="modal" data-bs-target={`#exampleModalprofile${missionEnAttente.id}`}
                                                                        />)}
                                                                    {missionEnAttente.expediteur.user.username}
                                                                    <div class="modal fade" id={`exampleModalprofile${missionEnAttente.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                        <div class="modal-dialog ">
                                                                            <div class="modal-content">
                                                                                <div class="modal-header">
                                                                                    <h1 class="modal-title fs-5" id={`exampleModalprofile${missionEnAttente.id}`}>A propos de l'Expéditeur</h1>
                                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div class="modal-body" >

                                                                                    {missionEnAttente.expediteur.user.photo_profil && (
                                                                                        <>
                                                                                            <div className="text-center mb-3">
                                                                                                <a href={missionEnAttente.expediteur.user.photo_profil.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + missionEnAttente.expediteur.user.photo_profil : missionEnAttente.expediteur.user.photo_profil} target="_blank" rel="noopener noreferrer">
                                                                                                    <img src={missionEnAttente.expediteur.user.photo_profil.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + missionEnAttente.expediteur.user.photo_profil : missionEnAttente.expediteur.user.photo_profil}
                                                                                                        alt="Photo de profil" className="img-fluid rounded me-1  clickable-image" style={{ width: "20%" }} />
                                                                                                </a>
                                                                                            </div>
                                                                                            <p>first_name: {missionEnAttente.expediteur.user.first_name}</p>
                                                                                            <p>last_name: {missionEnAttente.expediteur.user.last_name}</p>
                                                                                            <p>Email: {missionEnAttente.expediteur.user.email}</p>
                                                                                            <p>Adresse: {missionEnAttente.expediteur.user.adresse}</p>
                                                                                            <p>Num telephone: {missionEnAttente.expediteur.tel}</p>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                                <div class="modal-footer">
                                                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>{missionEnAttente.vehicule.marque}</td>

                                                            </React.Fragment>
                                                        );
                                                    } else {
                                                        // Si aucune notification correspondante n'est trouvée, afficher des cellules vides
                                                        return null;
                                                    }
                                                })}
                                                <td>
                                                    {selectedStatus === 'confirme' && (
                                                        <>
                                                            <button type="button" className={`btn btn-success me-3 ${isButtonDisabled(expedition.date_expedition) ? 'disabled' : ''}`} onClick={() => handleUpdatePosition(expedition.id, expedition.date_expedition)}>Localisation</button>
                                                            <button type="button" className="btn btn-danger px-4" onClick={() => handleCancelExpedition(expedition.id)}>Annuler </button>
                                                        </>
                                                    )}
                                                    {selectedStatus === 'en_transit' && (
                                                        <>
                                                            <button type="button" className="btn btn-success" onClick={() => handleUpdatePosition(expedition.id, expedition.date_expedition)}> Mettre à jour ma localisation</button>
                                                        </>
                                                    )}
                                                    {selectedStatus === 'livre' && (
                                                        <>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>

    );
}

export default TransporteurMissions;
