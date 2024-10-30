import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import charji from "../images/charJi.jpg"


function Login({ login, isAuthenticated, isTransporteur, loginError }) {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [error, setError] = useState(null);

  const { username, password } = user;

  const loginChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);

    try {
      await login({ username, password });
    } catch (error) {
      if(error.message === "Unable to log in with provided credentials.") {
        setError('Identifiant ou mot de passe incorrect.');
      } else {
        setError(error.message);
      }
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000); // Efface l'erreur après 5 secondes (5000 millisecondes)

    return () => clearTimeout(timer); // Nettoyer le timer lors du démontage du composant
  }, [error]);

  useEffect(() => {
    console.log("Login Error:", loginError);
    if (buttonClicked && loginError && loginError.response && loginError.response.status === 403) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [buttonClicked, loginError]);

  if (isAuthenticated && !showMessage) {
    if (isTransporteur) {
      return <Redirect to="/transporteur/dashboard" />;
    } else {
      return <Redirect to="/expediteur/dashboard" />;
    }
  } else {
    return (
      <div>

        <nav className="navbar navbar-expand-lg navtxt bgg   px-2" style={{ boxShadow: '0 1px 4px rgba(0, 0, 0, 0.07)' }}>
          <div class="container-fluid d-flex justify-content-between">
            <a class="navbar-brand " href="#">
              <img src={charji} alt="" width="110" height="24" class="d-inline-block align-text-top" />
              
            </a>
            <form class="d-flex btnj btnb" role="search">
              <Link to="/">
                <button class="btn btn-warnig-outline-success " data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit">S'inscrire</button>
              </Link>
            </form>
          </div>

        </nav>
        <div >
          <div className='container '>
            <div className='row my-5'>
              <div className='col txtr d-none d-sm-block'>
                <div className='d-flex justify-content-start'>
                  <div className=' px-5'>
                    <h1> <span style={{ color: "#e2ad68" }}>Bienvenue</span>,<br />Entrez Votre Username<br />Et Votre Mot De Passe </h1>
                  </div>
                  <div><div className="vertical-line mx-2" style={{ width: "6px", height: "390px" }}></div></div>

                </div>
              </div>
              <div className='col '>
                <div className='d-flex justify-content-center txtl'>
                  <h4 className='mx-3 mb-3 d-block d-sm-block d-sm-none'><span style={{ color: "#e2ad68" }}>Bienvenue</span>,<br />Entrez Votre Username Et Votre Mot De Passe</h4>
                </div>
                {error && (
                  <Alert variant="danger" onClose={() => setError(null)} dismissible>
                    {error}
                  </Alert>
                )}
                <div class="position-relative mx-4 m-4 pb-4">
                  <div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ height: "1px", backgroundColor: "burlywood" }}>
                    <div class="progress-bar" style={{ width: "50%", backgroundColor: "burlywood" }}></div>
                  </div>
                  <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "7rem", height: "2rem", backgroundColor: "burlywood", borderColor: "burlywood", fontSize: "15px" }}>Connexion</button>
                </div>
                {showMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}

                <form class="row g-3 needs-validation txtl " onSubmit={(e) => handleLoginSubmit(e)} novalidate>
                  <div class="col-md-12 ">
                    <label for="validationCustomUsername" class="form-label">Username</label>
                    <div class="input-group has-validation">
                      <span class="input-group-text" id="inputGroupPrepend">@</span>
                      <input type="text" class="form-control" id="validationCustomUsername" onChange={(e) => loginChange(e)}
                        name="username"
                        value={username} aria-describedby="inputGroupPrepend" required />
                      <div class="invalid-feedback">
                        Please choose a username.
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 ">

                    <label for="inputPassword5" class="form-label">Mot de passe</label>
                    <input type="password" id="inputPassword5" class="form-control" onChange={(e) => loginChange(e)}
                      name="password"
                      value={password} aria-describedby="passwordHelpBlock" />
                    <div id="passwordHelpBlock" class="form-text">
                    Votre mot de passe doit comporter entre 8 et 20 caractères, contenir des lettres et des chiffres, et ne doit pas contenir d'espaces, de caractères spéciaux ou d'émojis.
                    </div>
                    <div class="valid-feedback">
                      Looks good!
                    </div>
                  </div>


                  <div class="col-12 btnj">
                    <button class="btn btn-primary" type="submit">Soumettre</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isTransporteur: PropTypes.bool,
  loginError: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isTransporteur: state.auth.isTransporteur,
  loginError: state.auth.loginError,
});

export default connect(mapStateToProps, { login })(Login);



// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { login } from '../actions/auth';
// import { Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom'


// function Login({ login, isAuthenticated, isTransporteur, loginError }) {
//   const [user, setUser] = useState({
//     username: '',
//     password: ''
//   });

//   const [showMessage, setShowMessage] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [buttonClicked, setButtonClicked] = useState(false);

//   const { username, password } = user;

//   const loginChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setButtonClicked(true);

//     try {
//       await login({ username, password });
//     } catch (error) {
//       console.log("Error in handleLoginSubmit:", error);

//       if (error.response && error.response.status === 403) {
//         let errorMessageFromServer = error.response.data.error;

//         // Vérifiez si le message d'erreur est 'Account not approved by admin'
//         if (errorMessageFromServer === 'Account not approved by admin') {
//           console.log('Account not approved by admin');
//         }

//         setErrorMessage(errorMessageFromServer);
//         setShowMessage(true);

//         const displayDuration = 5000;
//         setTimeout(() => {
//           setShowMessage(false);
//           setErrorMessage('');
//         }, displayDuration);
//       } else {
//         console.error(error);
//       }
//     }
//   };

//   useEffect(() => {
//     console.log("Login Error:", loginError);
//     if (buttonClicked && loginError && loginError.response && loginError.response.status === 403) {
//       setShowMessage(true);
//     } else {
//       setShowMessage(false);
//     }
//   }, [buttonClicked, loginError]);

//   if (isAuthenticated && !showMessage) {
//     if (isTransporteur) {
//       return <Redirect to="/transporteur/dashboard" />;
//     } else {
//       return <Redirect to="/expediteur/dashboard" />;
//     }
//   } else {
//     return (
//       <div className="">

//         <nav className="navbar navbar-expand-lg navtxt bgg  py-3 px-3">
//           <div class="container-fluid d-flex justify-content-between">
//             <a class="navbar-brand " href="#">
//               <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top" />
//               CharJi
//             </a>
//             <form class="d-flex btnj btnb" role="search">
//             <Link to="/">
//               <button class="btn btn-warnig-outline-success " data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit">Signup</button>
//             </Link>
//             </form>
//           </div>

//         </nav>
//         <div >
//           <div className='container '>
//             <div className='row my-5'>
//               <div className='col txtr'>
//                 <div className='d-flex justify-content-start'>
//                   <div className=' px-5'>
//                     <h1> <span style={{ color: "#e2ad68" }}>Welcome</span>,<br />Enter Your Username <br />And Your Password </h1>
//                   </div>
//                   <div><div className="vertical-line mx-2" style={{ width: "6px", height: "390px" }}></div></div>

//                 </div>
//               </div>
//               <div className='col '>
//                 <div className='d-flex justify-content-center txtl'>
//                   <h4></h4>
//                 </div>
//                 <div class="position-relative mx-4 m-4 pb-4">
//                   <div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ height: "1px", backgroundColor: "burlywood" }}>
//                     <div class="progress-bar" style={{ width: "50%", backgroundColor: "burlywood" }}></div>
//                   </div>
//                   <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "6rem", height: "2rem", backgroundColor: "burlywood", borderColor: "burlywood", fontSize: "15px" }}>Signin</button>
//                 </div>
//                 {showMessage && (
//                   <div className="alert alert-danger">{errorMessage}</div>
//                 )}
//                 <form class="row g-3 needs-validation txtl " onSubmit={(e) => handleLoginSubmit(e)} novalidate>
//                   <div class="col-md-12 ">
//                     <label for="validationCustomUsername" class="form-label">Username</label>
//                     <div class="input-group has-validation">
//                       <span class="input-group-text" id="inputGroupPrepend">@</span>
//                       <input type="text" class="form-control" id="validationCustomUsername" onChange={(e) => loginChange(e)}
//                         name="username"
//                         value={username} aria-describedby="inputGroupPrepend" required />
//                       <div class="invalid-feedback">
//                         Please choose a username.
//                       </div>
//                     </div>
//                   </div>
//                   <div class="col-md-12 ">

//                     <label for="inputPassword5" class="form-label">Password</label>
//                     <input type="password" id="inputPassword5" class="form-control" onChange={(e) => loginChange(e)}
//                       name="password"
//                       value={password} aria-describedby="passwordHelpBlock" />
//                     <div id="passwordHelpBlock" class="form-text">
//                       Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
//                     </div>
//                     <div class="valid-feedback">
//                       Looks good!
//                     </div>
//                   </div>


//                   <div class="col-12 btnj">
//                     <button class="btn btn-primary" type="submit">Submit</button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     );
//   }
// }

// Login.propTypes = {
//   login: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool,
//   isTransporteur: PropTypes.bool,
//   loginError: PropTypes.object,
// };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   isTransporteur: state.auth.isTransporteur,
//   loginError: state.auth.loginError,
// });

// export default connect(mapStateToProps, { login })(Login);
