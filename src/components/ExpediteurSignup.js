import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { create_expediteuruser } from "../actions/auth"
import { Redirect } from "react-router-dom"
import Navbar from './Navbar';
import Alert from 'react-bootstrap/Alert';


const ExpediteurSignup = ({ create_expediteuruser, isAuthenticated, isTransporteur }) => {
  const [expediteur, setExpediteur] = useState({
    username: '',
    first_name: '',
    last_name: '',
    tel: '',
    email: '',
    password: '',
    password2: '',
    adresse: '',
  })


  const handleChange = (e) => setExpediteur({
    ...expediteur,
    [e.target.name]: e.target.value
  })

  const { username, first_name, last_name, tel, email, password, password2, adresse } = expediteur

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
      }, 5000);

      // Nettoyer le timeout lors du démontage du composant
      return () => clearTimeout(timeout);
    }

  }, [formSubmitted, isTransporteur]);

  const validatePasswords = () => {
    let isValid = true;
    let errors = {};

    if (expediteur.password !== expediteur.password2) {
      isValid = false;
      errors.password2 = "Passwords do not match.";
    } else {
      errors.password2 = "Looks good!";
    }

    setErrors(errors);
    return isValid;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000); // Efface l'erreur après 5 secondes (5000 millisecondes)

    return () => clearTimeout(timer); // Nettoyer le timer lors du démontage du composant
  }, [error]);

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




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) {
      return; // Si les mots de passe ne correspondent pas, ne pas soumettre le formulaire
    }

    try {
      const newUser = {
        username,
        first_name,
        last_name,
        tel,
        email,
        password,
        password2,
        adresse,
      };

      // Faire appel à la fonction pour créer l'utilisateur
      const exp = await create_expediteuruser(newUser);
      console.log("expediteur", exp);
      setFormSubmitted(true);
      setError(null);
      // Si tout se passe bien, gérer la réponse (redirection, message de succès, etc.)

    } catch (error) {
      // Gestion spécifique des erreurs
      if (error.message === 'A user with that username already exists.') {
        setError('Ce nom d\'utilisateur est déjà pris. Veuillez en choisir un autre.');
      } else if (error.message === "user with this email already exists.") {
        setError('Un utilisateur avec cet email existe déjà. Veuillez utiliser un autre email.');
      } else {
        setError(error.message);
      }
      console.error(error);
    }
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

  return (
    <div>
      <Navbar className="bgg" />
      <div >
        <div className='container '>
          <div className='row my-5'>
            <div className='col txtr d-none d-sm-block'>
              <div className='d-flex justify-content-start'>
                <div className=' px-5'>
                  <h1> <span style={{ color: "#e2ad68" }}>Welcome</span>,<br />Tell Us More About <br />You And More Details</h1>
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
              <h4 className='mx-3 mb-5 d-block d-sm-block d-sm-none'><span style={{ color: "#e2ad68" }}>Welcome</span>, <br /> Tell Us More About You And More Details</h4>
              {error && (
                <Alert variant="danger" className="mb-5" onClose={() => setError(null)} dismissible>
                  {error}
                </Alert>
              )}
              <div class="position-relative mx-4 mt-2 mb-4">
                <div class="progress " role="progressbar" aria-label="Progress" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{ height: "1px", backgroundColor: "black" }}>
                  <div class="progress-bar pill2line" style={{ width: "100%", backgroundColor: "black" }}></div>
                </div>
                <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill pill-1" style={{ width: "2rem", height: "2rem", backgroundColor: "burlywood", borderColor: "burlywood" }}>1</button>
                <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill pill-2" style={{ width: "2rem", height: "2rem", backgroundColor: "black", borderColor: "black" }}>2</button>
              </div>
              <form class="row g-3 needs-validation txtl " novalidate onSubmit={(e) => handleSubmit(e)}>
                <div className='scroll-bg'>
                  <div className='scroll-div'>
                    <div className='scroll-object px-2'>
                      <div class="col-md-12 mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Adresse e-mail</label>
                        <input type="email" class="form-control" required id="exampleFormControlInput1" placeholder="name@example.com" name='email'
                          value={email}
                          onChange={(e) => handleChange(e)} />
                        <div class="valid-feedback">
                          Looks good!
                        </div>
                      </div>
                      <div class="col-md-12 mb-3 ">

                        <label for="inputPassword5" class="form-label">Mot de passe</label>
                        <input type="password" id="inputPassword5" required class="form-control" aria-describedby="passwordHelpBlock" name='password'
                          value={password}
                          onChange={(e) => handleChange(e)}
                          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$"
                        />
                        <div id="passwordHelpBlock" class="form-text">
                        Votre mot de passe doit comporter entre 8 et 20 caractères, inclure des lettres et des chiffres, et ne doit pas contenir d'espaces, de caractères spéciaux ou d'emoji.                        </div>
                        <div class="valid-feedback">
                          {errors.password && errors.password === "Looks good!" ? "Looks good!" : null}
                        </div>
                      </div>
                      <div class="col-md-12 mb-5 ">
                        <label for="inputPassword5" class="form-label">Confirmer le mot de passe</label>
                        <input type="password" id="inputPassword5" required class="form-control" aria-describedby="passwordHelpBlock" name='password2'
                          value={password2}
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
                            value={first_name}
                            onChange={(e) => handleChange(e)} />
                          <div class="valid-feedback">
                            Looks good!
                          </div>
                        </div>
                        <div class="col-md-4 ">
                          <label for="validationCustom02" class="form-label">Prénom</label>
                          <input type="text" class="form-control" id="validationCustom02" required name='last_name'
                            value={last_name}
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
                              value={username}
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
                            value={adresse}
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
                          <label for="validationCustom05" class="form-label">Numéro de téléphone</label>
                          <input type="tel" pattern="[0]{1}(5|6|7)([0-9]{8})" class="form-control" id="validationCustom05" required name='tel'
                            value={tel}
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
                            j'accepte les conditions générales
                          </label>
                          <div class="invalid-feedback">
                            You must agree before submitting.
                          </div>
                        </div>
                      </div>
                      <div class="col-12 btnj mb-5">
                        <button class="btn btn-primary" type="submit">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>


    </div>)
}
ExpediteurSignup.propTypes = {
  create_expediteuruser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isTransporteur: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isTransporteur: state.auth.isTransporteur
})

export default connect(mapStateToProps, { create_expediteuruser })(ExpediteurSignup)




// import React, { useState, useEffect } from 'react'
// import { connect } from "react-redux"
// import PropTypes from "prop-types"
// import { create_expediteuruser } from "../actions/auth"
// import { Redirect } from "react-router-dom"

// const ExpediteurSignup = ({ create_expediteuruser, isAuthenticated, isTransporteur }) => {
//   const [expediteur, setExpediteur] = useState({
//     username: '',
//     first_name: '',
//     last_name: '',
//     tel: '',
//     email: '',
//     password: '',
//     password2: ''
//   })


//   const handleChange = (e) => setExpediteur({
//     ...expediteur,
//     [e.target.name]: e.target.value
//   })

//   const { username, first_name, last_name, tel, email, password, password2 } = expediteur

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
//   }, [formSubmitted, isTransporteur]);



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     //implement the register logic
//     const newUser = {
//       username,
//       first_name,
//       last_name,
//       tel,
//       email,
//       password,
//       password2
//     }
//     create_expediteuruser(newUser)
//     setFormSubmitted(true);

//   }

//   if (redirectToLogin) {
//     return <Redirect to="/login" />;
//   }

//   if (formSubmitted) {
//     return (

//       <div className='container'>
//         <h2>Signup expediteur</h2>
//         {showVerificationMessage && (
//           <div className='alert alert-info' role='alert'>
//             Veuillez vérifier votre e-mail pour activer votre compte.
//           </div>
//         )}
//         <div className='row'>
//           <div className='col-md-8 mx-auto'>
//             <form onSubmit={(e) => handleSubmit(e)}>
//               <div className='form-group mb-3'>
//                 <label>username</label>
//                 <input
//                   type='text'
//                   className='form-control'
//                   name='username'
//                   value={username}
//                   onChange={(e) => handleChange(e)}
//                 />
//               </div>

//               <div className='form-group mb-3'>
//                 <label>Email</label>
//                 <input
//                   type='text'
//                   className='form-control'
//                   name='email'
//                   value={email}
//                   onChange={(e) => handleChange(e)}
//                 />
//               </div>
//               <div className='form-group mb-3'>
//                 <label>first_name</label>
//                 <input
//                   type='text'
//                   className='form-control'
//                   name='first_name'
//                   value={first_name}
//                   onChange={(e) => handleChange(e)}
//                 />
//               </div>
//               <div className='form-group mb-3'>
//                 <label>last_name</label>
//                 <input
//                   type='text'
//                   className='form-control'
//                   name='last_name'
//                   value={last_name}
//                   onChange={(e) => handleChange(e)}
//                 />
//               </div>
//               <div className='form-group mb-3'>
//                 <label>tel</label>
//                 <input
//                   type='text'
//                   className='form-control'
//                   name='tel'
//                   value={tel}
//                   onChange={(e) => handleChange(e)}
//                 />
//               </div>
//               <div className='form-group mb-3'>
//                 <label>password</label>
//                 <input
//                   type='text'
//                   className='form-control'
//                   name='password'
//                   value={password}
//                   onChange={(e) => handleChange(e)}
//                 />
//               </div>
//               <div className='form-group mb-3'>
//                 <label>Confirm password</label>
//                 <input
//                   type='text'
//                   className='form-control'
//                   name='password2'
//                   value={password2}
//                   onChange={(e) => handleChange(e)}
//                 />
//               </div>
//               <button type='submit' className='btn btn-primary'>
//                 Signup
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     )
//   }


//   return (
//     <div className='container'>
//       <h2>signup expediteur</h2>
//       <div className='row'>
//         <div className='col-md-8 mx-auto'>
//           <form onSubmit={e => handleSubmit(e)}>
//             <div className='form-group mb-3'>
//               <label>username</label>
//               <input type='text'
//                 className='form-control'
//                 name='username'
//                 value={username}
//                 onChange={(e) => handleChange(e)}
//               />
//             </div>

//             <div className='form-group mb-3'>
//               <label>Email</label>
//               <input type='text'
//                 className='form-control'
//                 name='email'
//                 value={email}
//                 onChange={(e) => handleChange(e)}
//               />
//             </div>
//             <div className='form-group mb-3'>
//               <label>first_name</label>
//               <input type='text'
//                 className='form-control'
//                 name='first_name'
//                 value={first_name}
//                 onChange={(e) => handleChange(e)}
//               />
//             </div>
//             <div className='form-group mb-3'>
//               <label>last_name</label>
//               <input type='text'
//                 className='form-control'
//                 name='last_name'
//                 value={last_name}
//                 onChange={(e) => handleChange(e)}
//               />
//             </div>
//             <div className='form-group mb-3'>
//               <label>tel</label>
//               <input type='text'
//                 className='form-control'
//                 name='tel'
//                 value={tel}
//                 onChange={(e) => handleChange(e)}
//               />
//             </div>
//             <div className='form-group mb-3'>
//               <label>password</label>
//               <input type='text'
//                 className='form-control'
//                 name='password'
//                 value={password}
//                 onChange={(e) => handleChange(e)}
//               />
//             </div>
//             <div className='form-group mb-3'>
//               <label>Confirm password</label>
//               <input type='text'
//                 className='form-control'
//                 name='password2'
//                 value={password2}
//                 onChange={(e) => handleChange(e)}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary">Signup</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }
// ExpediteurSignup.propTypes = {
//   create_expediteuruser: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool,
//   isTransporteur: PropTypes.bool
// }

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   isTransporteur: state.auth.isTransporteur
// })

// export default connect(mapStateToProps, { create_expediteuruser })(ExpediteurSignup)