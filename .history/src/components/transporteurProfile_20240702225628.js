import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { profile, updatePhotoProfile, deleteVehicule, updateTransporteur } from '../actions/auth';
import Navbar from './Navbar';
import { FaStar } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { Layout } from 'antd';
import { Button, Card, Rate } from 'antd';
import { Link } from 'react-router-dom';


const { Meta } = Card;

function Profile() {
    const dispatch = useDispatch();
    const [profileData, setProfileData] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [collapsed, setCollapsed] = useState(false);


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await dispatch(profile());
                setProfileData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfile();

         // Refresh profile every 5 seconds
        const interval = setInterval(fetchProfile, 5000);
        return () => clearInterval(interval);
    }, [dispatch]);

    const handlePhotoChange = (e) => {
        setPhotoFile(e.target.files[0]);
        handleSubmit(e.target.files[0]);
    };

    const handleSubmit = async (file) => {
        try {
            if (file) {
                await dispatch(updatePhotoProfile(file));
                const data = await dispatch(profile());
                setProfileData(data);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleDeleteVEhicule = async (vehicleId) => {
        try {
            await dispatch(deleteVehicule(vehicleId));

            alert(" Votre vehicule a été supprimée avec succès.");
        } catch (error) {
            // Gérer les erreurs
            console.error(error);
            alert("Une erreur s'est produite lors de la suppression du Vehicule.");
        }
    };

    //update
    // Initialisez l'état local avec les données initiales
    const [transporteurData, setExpediteurData] = useState({
        tel: '' // Champ pour le numéro de téléphone (tel)
    });

    const [userData, setUserData] = useState({
        first_name: '', // Champ pour le prénom
        last_name: '', // Champ pour le nom
        adresse: '' // Champ pour l'adresse
    });

    const handleSubmitup = (e) => {
        e.preventDefault();

        const formData = {
            transporteur_data: {
                tel: transporteurData.tel
            },
            user_data: {
                first_name: userData.first_name,
                last_name: userData.last_name,
                adresse: userData.adresse
            }
        };

        dispatch(updateTransporteur(formData));
    };

    const handleExpediteurChange = (e) => {
        const { name, value } = e.target;
        setExpediteurData({
            ...transporteurData,
            [name]: value
        });
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };


    const wilayas = [
        { value: 'Adrar', label: 'Adrar' },
        { value: 'Chlef', label: 'Chlef' },
        { value: 'Laghouat', label: 'Laghouat' },
        { value: 'Oum El Bouaghi', label: 'Oum El Bouaghi' },
        { value: 'Batna', label: 'Batna' },
        { value: 'Béjaïa', label: 'Béjaïa' },
        { value: 'Biskra', label: 'Biskra' },
        { value: 'Béchar', label: 'Béchar' },
        { value: 'Blida', label: 'Blida' },
        { value: 'Bouira', label: 'Bouira' },
        { value: 'Tamanrasset', label: 'Tamanrasset' },
        { value: 'Tébessa', label: 'Tébessa' },
        { value: 'Tlemcen', label: 'Tlemcen' },
        { value: 'Tiaret', label: 'Tiaret' },
        { value: 'Tizi Ouzou', label: 'Tizi Ouzou' },
        { value: 'Alger', label: 'Alger' },
        { value: 'Djelfa', label: 'Djelfa' },
        { value: 'Jijel', label: 'Jijel' },
        { value: 'Sétif', label: 'Sétif' },
        { value: 'Saïda', label: 'Saïda' },
        { value: 'Skikda', label: 'Skikda' },
        { value: 'Sidi Bel Abbès', label: 'Sidi Bel Abbès' },
        { value: 'Annaba', label: 'Annaba' },
        { value: 'Guelma', label: 'Guelma' },
        { value: 'Constantine', label: 'Constantine' },
        { value: 'Médéa', label: 'Médéa' },
        { value: 'Mostaganem', label: 'Mostaganem' },
        { value: 'M\'sila', label: 'M\'sila' },
        { value: 'Mascara', label: 'Mascara' },
        { value: 'Ouargla', label: 'Ouargla' },
        { value: 'Oran', label: 'Oran' },
        { value: 'El Bayadh', label: 'El Bayadh' },
        { value: 'Illizi', label: 'Illizi' },
        { value: 'Bordj Bou Arreridj', label: 'Bordj Bou Arreridj' },
        { value: 'Boumerdès', label: 'Boumerdès' },
        { value: 'El Tarf', label: 'El Tarf' },
        { value: 'Tindouf', label: 'Tindouf' },
        { value: 'Tissemsilt', label: 'Tissemsilt' },
        { value: 'El Oued', label: 'El Oued' },
        { value: 'Khenchela', label: 'Khenchela' },
        { value: 'Souk Ahras', label: 'Souk Ahras' },
        { value: 'Tipaza', label: 'Tipaza' },
        { value: 'Mila', label: 'Mila' },
        { value: 'Aïn Defla', label: 'Aïn Defla' },
        { value: 'Naâma', label: 'Naâma' },
        { value: 'Aïn Témouchent', label: 'Aïn Témouchent' },
        { value: 'Ghardaïa', label: 'Ghardaïa' },
        { value: 'Relizane', label: 'Relizane' }
    ];
    return (
        <Layout style={{ minHeight: '100vh', height: '100%', backgroundColor: "white" }}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div class="col">
                <Navbar class="row" activeClass="dashboard"/>
                <div className=" container mt-4">
                    <div className="row">
                        <div className="col">
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
                                                <p className="mb-1"><strong>Téléphone:</strong> {profileData.tel}</p>
                                                <p className="mb-1"><strong>Notation: </strong>
                                                    {[...Array(5)].map((star, index) => {
                                                        const ratingValue = index + 1;
                                                        return (
                                                            <label key={index}>
                                                                <FaStar
                                                                    className="star"
                                                                    size={25}
                                                                    color={profileData.note_moyenne >= ratingValue ? "#ffc107" : "#e4e5e9"}
                                                                    onMouseEnter={() => setHover(ratingValue)}
                                                                    onMouseLeave={() => setHover(null)}
                                                                />
                                                            </label>
                                                        );
                                                    })}
                                                </p>
                                                <button type="button" class="btn mt-2 btn-secondary " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                            Modifier Profil 
                                        </button>
                                            </div>
                                            <div className="col-md-6 text-center">
                                                {profileData.photo_profil && (
                                                    <div className="mb-3">
                                                        <img src={profileData.photo_profil} alt="Photo de profil" className="img-fluid rounded-circle" style={{ maxWidth: '150px' }} />
                                                    </div>
                                                )}
                                                <label htmlFor="photoFile" className="btn btn-secondary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-fill" viewBox="0 0 16 16">
                                                        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"></path>
                                                        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"></path>
                                                    </svg>
                                                    <span className='mx-2'>Modifier la photo</span>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="photoFile"
                                                    accept="image/*"
                                                    onChange={handlePhotoChange}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Mdification Profil</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <form class="row g-3 needs-validation txtl " onSubmit={handleSubmitup}>

                                                        <div class="modal-body">

                                                            <div className='row mb-4'>
                                                                <div class="col-md-6" id='step2'>
                                                                    <label for="validationCustom01" class="form-label">Nom complet</label>
                                                                    <input type="text" class="form-control" id="validationCustom01" name='first_name'
                                                                        value={userData.first_name} onChange={handleUserChange} required
                                                                    />
                                                                    <div class="valid-feedback">
                                                                        Looks good!
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 ">
                                                                    <label for="validationCustom02" class="form-label">Prénom</label>
                                                                    <input type="text" class="form-control" id="validationCustom02" name='last_name'
                                                                        value={userData.last_name} onChange={handleUserChange} required
                                                                    />
                                                                    <div class="valid-feedback">
                                                                        Looks good!
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className='row mb-4'>
                                                                <div class="col-md-6">
                                                                    <label for="validationCustom03" class="form-label">Wilaya</label>
                                                                    <select
                                                                        class="form-select " id="validationServer04" aria-describedby="validationServer04Feedback"
                                                                        name="adresse" value={userData.adresse} onChange={handleUserChange} required
                                                                    >
                                                                        <option value="">Sélectionner une ville</option>
                                                                        {wilayas.map((option) => (
                                                                            <option key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    <div class="invalid-feedback">
                                                                        Please provide a valid city.
                                                                    </div>
                                                                </div>

                                                                <div class="col-md-6">
                                                                    <label for="validationCustom05" class="form-label">Numéro de téléphone</label>
                                                                    <input required type="tel" pattern="[0]{1}(5|6|7)([0-9]{8})" class="form-control" id="validationCustom05" name='tel'
                                                                        value={transporteurData.tel} onChange={handleExpediteurChange}
                                                                        title='Veuillez fournir un numéro de téléphone valide' />
                                                                    <div class="invalid-feedback">
                                                                        Please provide a valid phone number.
                                                                    </div>
                                                                </div>

                                                            </div>



                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                                            <button type="submit" class="btn btn-primary">Enregistrer</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />

                                        <h3>Documents</h3>
                                        <div className="row">

                                            <div className="col-md-4">
                                                {profileData.registre_commerce_image1 &&
                                                    <Card
                                                        className='mb-3'
                                                        hoverable
                                                        style={{ width: 240 }}
                                                        cover={
                                                            <a href={profileData.registre_commerce_image1} target="_blank" rel="noopener noreferrer" className="d-block mb-2">
                                                                <img src={profileData.registre_commerce_image1} alt="Registre de commerce 1" className="img-fluid" style={{ maxWidth: '200px' }} />
                                                            </a>
                                                        }
                                                    >
                                                        <Meta title="Registre de Commerce" description="première  page" />
                                                    </Card>
                                                }

                                            </div>
                                            <div className='col-md-4'>
                                                {profileData.registre_commerce_image2 &&
                                                    <Card
                                                        hoverable
                                                        style={{ width: 240 }}
                                                        cover={
                                                            <a href={profileData.registre_commerce_image2} target="_blank" rel="noopener noreferrer" className="d-block mb-2">
                                                                <img src={profileData.registre_commerce_image2} alt="Registre de commerce 2" className="img-fluid" style={{ maxWidth: '200px' }} />
                                                            </a>}
                                                    >
                                                        <Meta title="Registre de Commerce" description="deuxième  page" />
                                                    </Card>
                                                }
                                            </div>
                                            <div className="col-md-4">
                                                {profileData.permis_de_conduire &&
                                                    <Card
                                                        hoverable
                                                        style={{ width: 240 }}
                                                        cover={
                                                            <a href={profileData.permis_de_conduire} target="_blank" rel="noopener noreferrer" className="d-block mb-2">
                                                                <img src={profileData.permis_de_conduire} alt="Permis de conduire" className="img-fluid" style={{ maxWidth: '200px' }} />
                                                            </a>}
                                                    >
                                                        <Meta title="Permis de Conduire" />
                                                    </Card>

                                                }
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
                                                        <div className='mt-1 d-flex justify-content-around"'>
                                                            <Link to={`/transporteur/UpdateVehicule/${vehicle.id}`} >
                                                                <Button block className=' px-5'>Modifier</Button>
                                                            </Link>
                                                            <Button type="primary" className='mx-2' danger block onClick={() => handleDeleteVEhicule(vehicle.id)}>
                                                                Supprimer
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </Layout>


    );


}

export default Profile;
