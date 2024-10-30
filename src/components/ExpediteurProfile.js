import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { profile, updatePhotoProfile, updateExpediteur } from '../actions/auth';
import Navbar from './Navbar';

function ProfileExpediteur() {
    const dispatch = useDispatch();
    const [profileData, setProfileData] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await dispatch(profile());
                setProfileData(data);
            } catch (error) {
                console.error(error);
            }
        };
    
        // Fetch profile initially
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

    //update
 // Initialisez l'état local avec les données initiales
 const [expediteurData, setExpediteurData] = useState({
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
      expediteur_data: {
        tel: expediteurData.tel
      },
      user_data: {
        first_name: userData.first_name,
        last_name: userData.last_name,
        adresse: userData.adresse
      }
    };

    dispatch(updateExpediteur(formData));
  };

  const handleExpediteurChange = (e) => {
    const { name, value } = e.target;
    setExpediteurData({
      ...expediteurData,
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
        <div>
            <Navbar activeClass="Dashboard" />
            <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        {profileData && (
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title text-center">Mon Profil</h2>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h3>Informations Personnelles</h3>
                                            <p><strong>Nom:</strong> {profileData.last_name}</p>
                                            <p><strong>Prénom:</strong> {profileData.first_name}</p>
                                            <p><strong>Email:</strong> {profileData.email}</p>
                                            <p><strong>Wilaya:</strong> {profileData.adresse}</p>
                                            <p><strong>Téléphone:</strong> {profileData.tel}</p>
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
                                    <hr />
                                    <div className="row">
                                        <div className="col">
                                            {profileData.registre_commerce_image1 && profileData.registre_commerce_image2 &&
                                                <h3>Documents</h3>}
                                            <div className="row">
                                                {profileData.registre_commerce_image1 &&
                                                    <div className="col-md-6">
                                                        <h4>Registre de Commerce Image 1</h4>
                                                        <a href={profileData.registre_commerce_image1} target="_blank" rel="noopener noreferrer">
                                                            <img src={profileData.registre_commerce_image1} alt="registre de commerce image1" className="img-fluid clickable-image" />
                                                        </a>
                                                    </div>
                                                }
                                                {profileData.registre_commerce_image2 &&
                                                    <div className="col-md-6">
                                                        <h4>Registre de Commerce Image 2</h4>
                                                        <a href={profileData.registre_commerce_image2} target="_blank" rel="noopener noreferrer">
                                                            <img src={profileData.registre_commerce_image2} alt="registre de commerce image2" className="img-fluid clickable-image" />
                                                        </a>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-secondary " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        Modifier Profil
                                    </button>
                                    <div class="modal fade" id="staticBackdrop"  tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Mdification Profil</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <form class="row g-3 needs-validation txtl "  onSubmit={handleSubmitup}>

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
                                                                    value={expediteurData.tel} onChange={handleExpediteurChange} 
                                                                    title='Veuillez fournir un numéro de téléphone valide' />
                                                                <div class="invalid-feedback">
                                                                    Please provide a valid phone number.
                                                                </div>
                                                            </div>

                                                        </div>

                                                      

                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                                        <button type="submit"  class="btn btn-primary">Enregistrer</button>
                                                    </div>
                                                    </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ProfileExpediteur;
