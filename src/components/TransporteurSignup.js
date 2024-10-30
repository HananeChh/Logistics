import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { create_transporteuruser, updateTransporteurImages } from '../actions/auth';
import { Redirect } from "react-router-dom";
import Navbar from './Navbar';
import Alert from 'react-bootstrap/Alert';




const TransporteurSignup = ({ create_transporteuruser, updateTransporteurImages }) => {
  const [transporteur, setTransporteur] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    tel: '',
    password: '',
    password2: '',
    adresse: '',
    permis_de_conduire: null,
    carte_grise: null,
    registre_commerce_image1: null,
    registre_commerce_image2: null,
  });

  const [formPart, setFormPart] = useState(1);
  const [transporteurId, setTransporteurId] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [error, setError] = useState(null);

  const [errors, setErrors] = useState({
    password: '',
    password2: ''
  });

  useEffect(() => {
    if (formSubmitted) {
      setShowVerificationMessage(true);

      // Masquer le message après quelques secondes
      const timeout = setTimeout(() => {
        setShowVerificationMessage(false);
        setRedirectToLogin(true);
      }, 6000);

      // Nettoyer le timeout lors du démontage du composant
      return () => clearTimeout(timeout);

    }
  }, [formSubmitted]);


  useEffect(() => {
    const scrollHandler = () => {
      const formContainer = document.querySelector('.scroll-div');
      const pill2Button = document.querySelector('.pill-2');
      const pill2line = document.querySelector('.pill2line');
      const firstNameInput = document.getElementById('step2');


      if (firstNameInput.getBoundingClientRect().top <= formContainer.getBoundingClientRect().top) {
        pill2Button.style.backgroundColor = 'burlywood';
        pill2Button.style.borderColor = 'burlywood';
        pill2line.style.backgroundColor = 'burlywood';

      } else {
        pill2Button.style.backgroundColor = 'black';
        pill2Button.style.borderColor = 'black';
        pill2line.style.backgroundColor = 'black';
      }
    };

    const formContainer = document.querySelector('.scroll-div');
    formContainer.addEventListener('scroll', scrollHandler);


    return () => {
      formContainer.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const validatePasswords = () => {
    let isValid = true;
    let errors = {};

    if (transporteur.password !== transporteur.password2) {
      isValid = false;
      errors.password2 = "Passwords do not match.";
    } else {
      errors.password2 = "Looks good!";
    }

    setErrors(errors);
    return isValid;
  };



  const handleChange = (e) =>
    setTransporteur({
      ...transporteur,
      [e.target.name]: e.target.value,
    });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setTransporteur({
      ...transporteur,
      [name]: files[0],
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000); // Efface l'erreur après 5 secondes (5000 millisecondes)

    return () => clearTimeout(timer); // Nettoyer le timer lors du démontage du composant
  }, [error]);

  const handleSubmitPart1 = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) {
      return; // Si les mots de passe ne correspondent pas, ne pas soumettre le formulaire
    }

    try {
      // Enregistrez les informations du transporteur dans la base de données
      const transporteurResponse = await create_transporteuruser(transporteur);
      console.log("Transporteur Response:", transporteurResponse);
      setError(null);

      // Passez à la deuxième partie du formulaire
      setFormPart(2);
      setTransporteurId(transporteurResponse); // Mettez à jour directement avec la réponse entière
    } catch (error) {
      if (error.message === 'A user with that username already exists.') {
        setError('Ce nom d\'utilisateur est déjà pris. Veuillez en choisir un autre.');
      } else if (error.message === "user with this email already exists.") {
        setError('Un utilisateur avec cet email existe déjà. Veuillez utiliser un autre email.');
      } else {
        setError(error.message);
      } console.error(error);
    }
  };



  const handleSubmitPart2 = async (e) => {
    e.preventDefault();

    // Vérifiez que transporteurId est défini avant d'accéder à sa propriété 'id'

    const formattedTransporteurId = String(transporteurId);


    // Traitez la deuxième partie du formulaire (téléchargement de fichiers) ici
    // Utilisez l'ID du transporteur pour mettre à jour les images
    await updateTransporteurImages(formattedTransporteurId, {
      permis_de_conduire: transporteur.permis_de_conduire,
      carte_grise: transporteur.carte_grise,
      registre_commerce_image1: transporteur.registre_commerce_image1,
      registre_commerce_image2: transporteur.registre_commerce_image2,
    });

    // Réinitialisez le formulaire après la soumission
    setTransporteur({
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      tel: '',
      password: '',
      password2: '',
      permis_de_conduire: null,
      carte_grise: null,
      registre_commerce_image1: null,
      registre_commerce_image2: null,
    });

    setFormSubmitted(true);
  };

  if (redirectToLogin) {
    return <Redirect to="/login" />;
  }
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
  switch (formPart) {

    case 1:
      return (
        <div>
          <Navbar className="bgg" />
          <div >
            <div className='container '>
              <div className='row my-5'>
                <div className='col txtr d-none d-sm-block'>
                  <div className='d-flex justify-content-start'>
                    <div className=' px-5'>
                      <h1> <span style={{ color: "#e2ad68" }}>Welcome</span>,<br />Tell Us More About <br />You And Your Carrier</h1>
                    </div>
                    <div><div className="vertical-line mx-2" style={{ width: "6px", height: "390px" }}></div></div>

                  </div>
                </div>
                <div className='col '>
                  <div className='d-flex justify-content-center txtl'>
                    <h4 className='mx-3 mb-5 d-block d-sm-block d-sm-none'><span style={{ color: "#e2ad68" }}>Welcome</span>, <br /> Tell Us More About You And Your Carrier</h4>
                  </div>
                  {error && (
                    <Alert variant="danger" className="mb-5" onClose={() => setError(null)} dismissible>
                      {error}
                    </Alert>
                  )}
                  <div class="position-relative mx-4 mt-2 mb-4">
                    <div class="progress pill2line" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ height: "1px", backgroundColor: "black" }}>
                      <div class="progress-bar" style={{ width: "50%", backgroundColor: "burlywood" }}></div>
                    </div>
                    <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill pill-1" style={{ width: "2rem", height: "2rem", backgroundColor: "burlywood", borderColor: "burlywood" }}>1</button>
                    <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill pill-2" style={{ width: "2rem", height: "2rem", backgroundColor: "black", borderColor: "black" }}>2</button>
                    <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill pill-3" style={{ width: "2rem", height: "2rem", backgroundColor: "black", borderColor: "black" }}>3</button>
                  </div>
                  <form class="row g-3 needs-validation txtl " novalidate onSubmit={(e) => handleSubmitPart1(e)}>
                    <div className='scroll-bg'>
                      <div className='scroll-div'>
                        <div className='scroll-object px-2'>
                          <div class="col-md-12 mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Adresse e-mail</label>
                            <input type="email" class="form-control" required id="exampleFormControlInput1" placeholder="name@example.com" name='email'
                              value={transporteur.email}
                              onChange={(e) => handleChange(e)} />
                            <div class="valid-feedback">
                              Looks good!
                            </div>
                          </div>
                          <div class="col-md-12 mb-3 ">

                            <label for="inputPassword5" class="form-label">Mot de passe</label>
                            <input type="password" id="inputPassword5" required class="form-control" aria-describedby="passwordHelpBlock" name='password'
                              value={transporteur.password}
                              onChange={(e) => handleChange(e)}
                              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$"
                            />
                            <div id="passwordHelpBlock" class="form-text">
                            Votre mot de passe doit comporter entre 8 et 20 caractères, inclure des lettres et des chiffres, et ne doit pas contenir d'espaces, de caractères spéciaux ou d'emoji.                            </div>
                            <div class="valid-feedback">
                              {errors.password && errors.password === "Looks good!" ? "Looks good!" : null}
                            </div>
                          </div>
                          <div class="col-md-12 mb-5 ">
                            <label for="inputPassword5" class="form-label">Confirmer le mot de passe</label>
                            <input type="password" id="inputPassword5" required class="form-control" aria-describedby="passwordHelpBlock" name='password2'
                              value={transporteur.password2}
                              onChange={(e) => handleChange(e)} />
                            <div className="valid-feedback">
                              {errors.password2 && errors.password2 === "Looks good!" ? "Looks good!" : null}
                            </div>
                            <div className="invalid-feedback" style={{ display: errors.password2 && errors.password2 !== "Looks good!" ? 'block' : 'none' }}>
                              {errors.password2}
                            </div>
                          </div>
                          <div className='row mb-4'>
                            <div class="col-md-4" id='step2'>
                              <label for="validationCustom01" class="form-label">Nom complet</label>
                              <input type="text" class="form-control" id="validationCustom01" required name='first_name'
                                value={transporteur.first_name}
                                onChange={(e) => handleChange(e)} />
                              <div class="valid-feedback">
                                Looks good!
                              </div>
                            </div>
                            <div class="col-md-4 ">
                              <label for="validationCustom02" class="form-label">Prénom</label>
                              <input type="text" class="form-control" id="validationCustom02" required name='last_name'
                                value={transporteur.last_name}
                                onChange={(e) => handleChange(e)} />
                              <div class="valid-feedback">
                                Looks good!
                              </div>
                            </div>
                            <div class="col-md-4">
                              <label for="validationCustomUsername" class="form-label">Username</label>
                              <div class="input-group has-validation">
                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required name='username'
                                  value={transporteur.username}
                                  onChange={(e) => handleChange(e)} />
                                <div class="invalid-feedback">
                                  Please choose a username.
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='row mb-4'>
                            <div class="col-md-6">
                              <label for="validationCustom03" class="form-label">Wilaya</label>
                              <select
                                class="form-select " id="validationServer04" aria-describedby="validationServer04Feedback"
                                name='adresse'
                                value={transporteur.adresse}
                                onChange={(e) => handleChange(e)}
                                required
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
                              <label for="validationCustom05" class="form-label">Numéro de téléphone </label>
                              <input type="tel" pattern="[0]{1}(5|6|7)([0-9]{8})" class="form-control" id="validationCustom05" required name='tel'
                                value={transporteur.tel}
                                onChange={(e) => handleChange(e)}
                                title='Veuillez fournir un numéro de téléphone valide' />
                              <div class="invalid-feedback">
                                Please provide a valid phone number.
                              </div>
                            </div>

                          </div>
                          <div class="col-12 mb-4">
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                              <label class="form-check-label" for="invalidCheck">
                              J'accepte les conditions générales                               </label>
                              <div class="invalid-feedback">
                                You must agree before submitting.
                              </div>
                            </div>
                          </div>
                          <div class="col-12 btnj mb-5">
                            <button class="btn btn-primary" type="submit">Suivant</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>


        </div>
      );

    case 2:
      return (
        <div>
          <Navbar />
          <div >
            <div className='container '>
              <div className='row my-5'>
                <div className='col txtr'>
                  <div className='d-flex justify-content-start'>
                    <div className=' px-5'>
                      <h1> <span style={{ color: "#e2ad68" }}>Welcome</span>,<br />Tell Us More About <br />You And Your Carrier</h1>
                    </div>
                    <div><div className="vertical-line mx-2" style={{ width: "6px", height: "390px" }}></div></div>

                  </div>
                </div>
                <div className='col '>
                  <div className='d-flex justify-content-center txtl'>
                    {showVerificationMessage && (
                      <div className="alert alert-success mt-3" role="alert">
                        Veuillez vérifier votre e-mail avant de pouvoir vous connecter
                      </div>
                    )}
                  </div>
                  <div class="position-relative mx-4 mt-2 mb-5">
                    <div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ height: "1px", backgroundColor: "burlywood" }}>
                      <div class="progress-bar" style={{ width: "50%", backgroundColor: "burlywood" }}></div>
                    </div>
                    <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem", backgroundColor: "burlywood", borderColor: "burlywood" }}>1</button>
                    <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem", backgroundColor: "burlywood", borderColor: "burlywood" }}>2</button>
                    <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style={{ width: "2rem", height: "2rem", backgroundColor: "burlywood", borderColor: "burlywood" }}>3</button>
                  </div>
                  <form class="row g-3 needs-validation txtl " onSubmit={(e) => handleSubmitPart2(e)} novalidate>
                    <div class="col-md-12 mb-2">
                      <label for="formFile" class="form-label" >Permis de conduire</label>
                      <input class="form-control" type="file" required id="formFile1" name='permis_de_conduire' onChange={handleFileChange} />
                      <div class="valid-feedback">
                        Looks good!
                      </div>
                    </div>
                    <div class="col-md-12 mb-2">
                      <label for="formFile" class="form-label" >Carte grise </label>
                      <input class="form-control" type="file" required id="formFile2" name='carte_grise' onChange={handleFileChange} />
                      <div class="valid-feedback">
                        Looks good!
                      </div>
                    </div>
                    <div class="col-md-6 ">
                      <label for="formFile" class="form-label" >Registre commerce première page </label>
                      <input class="form-control" type="file" required id="formFile3" name='registre_commerce_image1' onChange={handleFileChange} />
                      <div class="valid-feedback">
                        Looks good!
                      </div>
                    </div><div class="col-md-6 mb-2">
                      <label for="formFile" class="form-label" >Registre commerce deuxième page </label>
                      <input class="form-control" type="file" required id="formFile4" name='registre_commerce_image2' onChange={handleFileChange} />
                      <div class="valid-feedback">
                        Looks good!
                      </div>
                    </div>

                    <div class="col-12 btnj ">
                      <button class="btn btn-primary" type="submit">Submit</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      );


  };
  TransporteurSignup.propTypes = {
    create_transporteuruser: PropTypes.func.isRequired,
    updateTransporteurImages: PropTypes.func.isRequired,
  };

};


export default connect(null, { create_transporteuruser, updateTransporteurImages })(TransporteurSignup);







// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { create_transporteuruser, updateTransporteurImages } from '../actions/auth';
// import { Redirect } from "react-router-dom"



// const TransporteurSignup = ({ create_transporteuruser, updateTransporteurImages }) => {
//   const [transporteur, setTransporteur] = useState({
//     username: '',
//     email: '',
//     first_name: '',
//     last_name: '',
//     tel: '',
//     password: '',
//     password2: '',
//     permis_de_conduire: null,
//     carte_grise: null,
//     registre_commerce_image1: null,
//     registre_commerce_image2: null,
//   });

//   const [formPart, setFormPart] = useState(1);
//   const [transporteurId, setTransporteurId] = useState(null);
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [showVerificationMessage, setShowVerificationMessage] = useState(false);
//   const [redirectToLogin, setRedirectToLogin] = useState(false);


//   useEffect(() => {
//     if (formSubmitted) {
//       setShowVerificationMessage(true);

//       // Masquer le message après quelques secondes
//       const timeout = setTimeout(() => {
//         setShowVerificationMessage(false);
//         setRedirectToLogin(true);
//       }, 5000);

//       // Nettoyer le timeout lors du démontage du composant
//       return () => clearTimeout(timeout);
//     }
//   }, [formSubmitted]);


//   const handleChange = (e) =>
//     setTransporteur({
//       ...transporteur,
//       [e.target.name]: e.target.value,
//     });

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setTransporteur({
//       ...transporteur,
//       [name]: files[0],
//     });
//   };

//   const handleSubmitPart1 = async (e) => {
//     e.preventDefault();
//     try {

//       // Passez à la deuxième partie du formulaire
//       setFormPart(3);
//     } catch (error) {
//       // Gérer les erreurs
//       console.error(error);
//     }
//   };
//   const handleSubmitPart3 = async (e) => {
//     e.preventDefault();
//     try {
//       // Enregistrez les informations du transporteur dans la base de données
//       const transporteurResponse = await create_transporteuruser(transporteur);
//       console.log("Transporteur Response:", transporteurResponse);
//       // Passez à la deuxième partie du formulaire
//       setFormPart(2);
//       setTransporteurId(transporteurResponse); // Mettez à jour directement avec la réponse entière
//     } catch (error) {
//       // Gérer les erreurs
//       console.error(error);
//     }
//   };

//   const handleSubmitPart2 = async (e) => {
//     e.preventDefault();

//     // Vérifiez que transporteurId est défini avant d'accéder à sa propriété 'id'

//     const formattedTransporteurId = String(transporteurId);


//     // Traitez la deuxième partie du formulaire (téléchargement de fichiers) ici
//     // Utilisez l'ID du transporteur pour mettre à jour les images
//     await updateTransporteurImages(formattedTransporteurId, {
//       permis_de_conduire: transporteur.permis_de_conduire,
//       carte_grise: transporteur.carte_grise,
//       registre_commerce_image1: transporteur.registre_commerce_image1,
//       registre_commerce_image2: transporteur.registre_commerce_image2,
//     });

//     // Réinitialisez le formulaire après la soumission
//     setTransporteur({
//       username: '',
//       email: '',
//       first_name: '',
//       last_name: '',
//       tel: '',
//       password: '',
//       password2: '',
//       permis_de_conduire: null,
//       carte_grise: null,
//       registre_commerce_image1: null,
//       registre_commerce_image2: null,
//     });

//     setFormSubmitted(true);
//   };

//   if (redirectToLogin) {
//     return <Redirect to="/login" />;
//   }

//   return (

//     <div className=''>

// <nav className="navbar navbar-expand-lg navtxt bgg  py-3 px-3">
//   <div class="container-fluid d-flex justify-content-between">
//     <a class="navbar-brand " href="#">
//       <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top" />
//       CharJi
//     </a>
//     <form class="d-flex btnj btnb" role="search">
//       <button class="btn btn-warnig-outline-success " data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit">Signup</button>
//     </form>
//   </div>

// </nav>
// <div >
//   <div className='container '>
//     <div className='row my-5'>
//       <div className='col txtr'>
//         <div className='d-flex justify-content-start'>
//           <div className=' px-5'>
//             <h1> <span style={{ color: "#e2ad68" }}>Welcome</span>,<br />Tell Us More About <br />You And Your Carrier</h1>
//           </div>
//           <div><div className="vertical-line mx-2" style={{ width: "6px", height: "390px" }}></div></div>

//         </div>
//       </div>
//       <div className='col '>
//         <div className='d-flex justify-content-center txtl'>
//           <h4></h4>
//         </div>
//         <div class="position-relative mx-4 mt-2 mb-5">
//           <div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ height: "1px", backgroundColor: "black" }}>
//             <div class="progress-bar" style={{ width: "50%", backgroundColor: "burlywood" }}></div>
//           </div>
//           <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem", backgroundColor: "burlywood", borderColor: "burlywood" }}>1</button>
//           <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem", backgroundColor: "black", borderColor: "black" }}>2</button>
//           <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style={{ width: "2rem", height: "2rem", backgroundColor: "black", borderColor: "black" }}>3</button>
//         </div>
//         {formPart === 1 && (
//           <form class="row g-3 needs-validation txtl " novalidate onSubmit={(e) => handleSubmitPart1(e)}>
//             <div class="col-md-12 ">

//               <label for="exampleFormControlInput1" class="form-label">Email address</label>
//               <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" name='email'
//                 value={transporteur.email}
//                 onChange={(e) => handleChange(e)} />

//               <div class="valid-feedback">
//                 Looks good!
//               </div>
//             </div>
//             <div class="col-md-12 ">

//               <label for="inputPassword5" class="form-label">Password</label>
//               <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" name='password'
//                 value={transporteur.password}
//                 onChange={(e) => handleChange(e)} />
//               <div id="passwordHelpBlock" class="form-text">
//                 Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
//               </div>
//               <div class="valid-feedback">
//                 Looks good!
//               </div>
//             </div>
//             <div class="col-md-12 ">

//               <label for="inputPassword5" class="form-label">Confirm Password</label>
//               <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" name='password2'
//                 value={transporteur.password2}
//                 onChange={(e) => handleChange(e)} />
//               <div class="valid-feedback">
//                 Looks good!
//               </div>
//             </div>

//             <div class="col-12 btnj">
//               <button class="btn btn-primary" type="submit">Next</button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   </div>
// </div>


//       < nav className="navbar navbar-expand-lg navtxt bgg  py-3 px-3" >
//         <div class="container-fluid d-flex justify-content-between">
//           <a class="navbar-brand " href="#">
//             <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top" />
//             CharJi
//           </a>
//           <form class="d-flex btnj btnb" role="search">
//             <button class="btn btn-warnig-outline-success " data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit">Signup</button>
//           </form>
//         </div>

//       </nav >
//       <div >
//         <div className='container '>
//           <div className='row my-5'>
//             <div className='col txtr'>
//               <div className='d-flex justify-content-start'>
//                 <div className=' px-5'>
//                   <h1> <span style={{ color: "#e2ad68" }}>Welcome</span>,<br />Tell Us More About <br />You And Your Carrier</h1>
//                 </div>
//                 <div><div className="vertical-line mx-2" style={{ width: "6px", height: "360px" }}></div></div>

//               </div>
//             </div>
//             <div className='col '>
//               <div className='d-flex justify-content-center txtl'>
//                 <h4></h4>
//               </div>
//               <div class="position-relative m-4 pb-4">
//                 <div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ height: "1px", backgroundColor: "burlywood" }}>
//                   <div class="progress-bar" style={{ width: "50%", backgroundColor: "burlywood" }}></div>
//                 </div>
//                 <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem", backgroundColor: "burlywood", borderColor: "burlywood" }}>1</button>
//                 <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem", backgroundColor: "burlywood", borderColor: "burlywood" }}>2</button>
//                 <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style={{ width: "2rem", height: "2rem", backgroundColor: "black", borderColor: "black" }}>3</button>
//               </div>
//               {formPart === 3 && (
//                 <form class="row g-3 needs-validation " onSubmit={(e) => handleSubmitPart3(e)} novalidate>
// <div class="col-md-4 ">
//   <label for="validationCustom01" class="form-label">First name</label>
//   <input type="text" class="form-control" id="validationCustom01" required name='first_name'
//     value={transporteur.first_name}
//     onChange={(e) => handleChange(e)} />
//   <div class="valid-feedback">
//     Looks good!
//   </div>
// </div>
// <div class="col-md-4">
//   <label for="validationCustom02" class="form-label">Last name</label>
//   <input type="text" class="form-control" id="validationCustom02" required name='last_name'
//     value={transporteur.last_name}
//     onChange={(e) => handleChange(e)} />
//   <div class="valid-feedback">
//     Looks good!
//   </div>
// </div>
// <div class="col-md-4">
//   <label for="validationCustomUsername" class="form-label">Username</label>
//   <div class="input-group has-validation">
//     <span class="input-group-text" id="inputGroupPrepend">@</span>
//     <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required name='username'
//       value={transporteur.username}
//       onChange={(e) => handleChange(e)} />
//     <div class="invalid-feedback">
//       Please choose a username.
//     </div>
//   </div>
// </div>
// <div class="col-md-6">
//   <label for="validationCustom03" class="form-label">City</label>
//   <input type="text" class="form-control" id="validationCustom03" required />
//   <div class="invalid-feedback">
//     Please provide a valid city.
//   </div>
// </div>
// <div class="col-md-3">
//   <label for="validationCustom04" class="form-label">State</label>
//   <select class="form-select" id="validationCustom04" required>
//     <option selected disabled value="">Choose...</option>
//     <option>...</option>
//   </select>
//   <div class="invalid-feedback">
//     Please select a valid state.
//   </div>
// </div>
// <div class="col-md-3">
//   <label for="validationCustom05" class="form-label">Phone</label>
//   <input type="tel" pattern="[0]{1}(5|6|7)([0-9]{8}" class="form-control" id="validationCustom05" required name='tel'
//     value={transporteur.tel}
//     onChange={(e) => handleChange(e)} />
//   <div class="invalid-feedback">
//     Please provide a valid phone number.
//   </div>
// </div>
// <div class="col-12">
//   <div class="form-check">
//     <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
//     <label class="form-check-label" for="invalidCheck">
//       Agree to terms and conditions
//     </label>
//     <div class="invalid-feedback">
//       You must agree before submitting.
//     </div>
//   </div>
// </div>
//                   <div class="col-12 btnj">
//                     <button class="btn btn-primary" type="submit">Next</button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>



// <nav className="navbar navbar-expand-lg navtxt bgg  py-3 px-3">
//   <div class="container-fluid d-flex justify-content-between">
//     <a class="navbar-brand " href="#">
//       <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top" />
//       CharJi
//     </a>
//     <form class="d-flex btnj btnb" role="search">
//       <button class="btn btn-warnig-outline-success " data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit">Signup</button>
//     </form>
//   </div>

// </nav>
// <div >
//   <div className='container '>
//     <div className='row my-5'>
//       <div className='col txtr'>
//         <div className='d-flex justify-content-start'>
//           <div className=' px-5'>
//             <h1> <span style={{ color: "#e2ad68" }}>Welcome</span>,<br />Tell Us More About <br />You And Your Carrier</h1>
//           </div>
//           <div><div className="vertical-line mx-2" style={{ width: "6px", height: "390px" }}></div></div>

//         </div>
//       </div>
//       <div className='col '>
//         <div className='d-flex justify-content-center txtl'>
//           <h4></h4>
//         </div>
//         <div class="position-relative mx-4 mt-2 mb-5">
//           <div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ height: "1px", backgroundColor: "burlywood" }}>
//             <div class="progress-bar" style={{ width: "50%", backgroundColor: "burlywood" }}></div>
//           </div>
//           <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem", backgroundColor: "burlywood", borderColor: "burlywood" }}>1</button>
//           <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem", backgroundColor: "burlywood", borderColor: "burlywood" }}>2</button>
//           <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style={{ width: "2rem", height: "2rem", backgroundColor: "burlywood", borderColor: "burlywood" }}>3</button>
//         </div>
//         {formPart === 2 && (
//           <form class="row g-3 needs-validation txtl " onSubmit={(e) => handleSubmitPart2(e)} novalidate>
//             <div class="col-md-12 mb-2">
//               <label for="formFile" class="form-label" required>Driving license</label>
//               <input class="form-control" type="file" id="formFile" name='permis_de_conduire' onChange={handleFileChange} />
//               <div class="valid-feedback">
//                 Looks good!
//               </div>
//             </div>
//             <div class="col-md-12 mb-2">
//               <label for="formFile" class="form-label" required>Vehicle registration certificate</label>
//               <input class="form-control" type="file" id="formFile" name='carte_grise' onChange={handleFileChange} />
//               <div class="valid-feedback">
//                 Looks good!
//               </div>
//             </div>
//             <div class="col-md-6 ">
//               <label for="formFile" class="form-label" required>Commercial registry recto </label>
//               <input class="form-control" type="file" id="formFile" name='registre_commerce_image1' onChange={handleFileChange} />
//               <div class="valid-feedback">
//                 Looks good!
//               </div>
//             </div><div class="col-md-6 mb-2">
//               <label for="formFile" class="form-label" required>Commercial registry verso </label>
//               <input class="form-control" type="file" id="formFile" name='registre_commerce_image2' onChange={handleFileChange} />
//               <div class="valid-feedback">
//                 Looks good!
//               </div>
//             </div>

//             <div class="col-12 btnj ">
//               <button class="btn btn-primary" type="submit">Submit</button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   </div>
// </div>


//       {showVerificationMessage && (
//         <div className="alert alert-success mt-3" role="alert">
//           Veuillez vérifier votre e-mail avant de pouvoir vous connecter
//         </div>
//       )}

//     </div>

//   );
// };

// TransporteurSignup.propTypes = {
//   create_transporteuruser: PropTypes.func.isRequired,
//   updateTransporteurImages: PropTypes.func.isRequired,
// };

// export default connect(null, { create_transporteuruser, updateTransporteurImages })(TransporteurSignup);

