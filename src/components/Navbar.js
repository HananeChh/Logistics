import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, profile, getTransporteurNotifications, profileWithId, notificationisReadExp, validerChoixExpediteur, getExpediteurNotifications, notificationisReadTr } from '../actions/auth';
import { Toast } from 'bootstrap';
import { Avatar, Badge, Space } from 'antd';
import charji from "../images/charJi.jpg"


function Navbar({ className, activeClass }) {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [notificationsE, setNotificationsE] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const toastRefs = useRef([]); // Tableau de références de toast

  const fetchNotifications = async () => {
    try {
      const notificationsData = await dispatch(getTransporteurNotifications());
      setNotifications(notificationsData.filter(notification => notification.is_read === false));
    } catch (error) {
      // Gérer les erreurs
    }
  };

  const fetchNotificationsE = async () => {
    try {
      const notificationsEData = await dispatch(getExpediteurNotifications());
      setNotificationsE(notificationsEData.filter(notification => notification.is_read === false));
    } catch (error) {
      // Gérer les erreurs
    }
  };
  useEffect(() => {
    if (state.isTransporteur) {
      fetchNotifications();
    }
    else if (!state.isTransporteur) {
      fetchNotificationsE();
    };
  }, []);

  const toggleNotifications = async () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      if (state.isTransporteur) {
        fetchNotifications();
      }
      else if (!state.isTransporteur) {
        fetchNotificationsE();
      };
    }
  };


  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach((notification, index) => {
        const toastElement = toastRefs.current[index];
        if (toastElement) {
          const toastBootstrap = new Toast(toastElement);
          toastBootstrap.show();
        }
      });
    }
  }, [notifications]);

  useEffect(() => {
    if (notificationsE.length > 0) {
      notificationsE.forEach((notification, index) => {
        const toastElement = toastRefs.current[index];
        if (toastElement) {
          const toastBootstrap = new Toast(toastElement);
          toastBootstrap.show();
        }
      });
    }
  }, [notificationsE]);

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
  }, [dispatch]);

  const handleValiderChoix = async (choixId) => {
    try {
      await dispatch(validerChoixExpediteur(choixId));
      alert('Validation effectuée avec succès.');
      setShowNotifications(false);
    } catch (error) {
      alert('Une erreur est survenue.');
    }
  };

  const handleReadNotification = async (notifId) => {
    await dispatch(notificationisReadTr(notifId))
    const updatedNotifications = notifications.filter(notification => notification.id !== notifId);
    setNotifications(updatedNotifications);
  };

  const handleReadNotificationE = async (notifId) => {
    await dispatch(notificationisReadExp(notifId))
    const updatedNotifications = notificationsE.filter(notification => notification.id !== notifId);
    setNotificationsE(updatedNotifications);
  };

  const calculateTimeDifference = (createdAt) => {
    const apiDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - apiDate;
    const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesDifference = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const secondsDifference = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

    if (daysDifference > 0) {
      return `${daysDifference} j`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference}h`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} min${minutesDifference > 1 ? 's' : ''}`;
    } else {
      return `${secondsDifference} s`;
    }
  };


  const authLink = (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {state.isAuthenticated && (
        state.isTransporteur ?
          <>
            <div className="nav-tabs-wrapper w-100">
              <ul className="nav me-auto mb-2 mb-lg-0">
                <li className="nav-item ">
                  <a className={`nav-link ${activeClass === 'dashboard' ? 'active' : ''}`} aria-current="page" href="#/transporteur/dashboard">Tableau de bord</a>
                </li>
                <li className="nav-item mx-4">
                  <a className={`nav-link ${activeClass === 'Missions' ? 'active' : ''}`} href="#/transporteur/Missions">Missions</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeClass === 'Calendrier' ? 'active' : ''}`} href="#/transporteur/Calendrier">Calendrier</a>
                </li>
              </ul>
            </div>
            <form className="d-flex" role="search">
              <Link className='me-4 my-1 '>
                <Badge count={notifications.length} overflowCount={10} >
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleNotifications} width="23" height="23" fill="currentColor" class="bi bi-bell " viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                  </svg>
                </Badge>
              </Link>
              <div>
                {profileData.photo_profil ? (
                  <a href="#/transporteur/profile">
                    <img src={profileData.photo_profil} alt="Photo de profil" className="img-fluid rounded-circle me-2" style={{ maxWidth: '60px', maxHeight: "35px" }} />
                  </a>
                ) :
                  (
                    <a className="nav-link" href="#/transporteur/profile">Profile</a>
                  )}
              </div>
              <span className='me-2 my-2 welcome' >
                <strong style={{ color: "black" }}>{state.user ? `Welcome${'\u00A0'}${state.user.username}` : ''}</strong>
              </span>
            </form>
          </>
          :
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a class="navbar-brand mx-2" href="#">
              <img src={charji} alt="" width="110" height="24" class="d-inline-block align-text-top" />
              
            </a>
            <div className="nav-tabs-wrapper w-100">
              <ul className="nav me-auto justify-content-center mb-2 mb-lg-0">
                <li className="nav-item ">
                  <a className={`nav-link ${activeClass === 'Dashboard' ? 'active' : ''}`} aria-current="page" href="#/expediteur/dashboard">Tableau de bord</a>
                </li>
                <li className="nav-item mx-4">
                  <a className={`nav-link ${activeClass === 'Ajouterexp' ? 'active' : ''}`} href="#/expediteur/Ajouterexp">Ajouter Expedition</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeClass === 'Expeditions' ? 'active' : ''}`} href="#/expediteur/Expeditions">Mes Expéditions</a>
                </li>
              </ul>
            </div>
            <form className="d-flex " role="search">
              <Link className='mx-3 my-1'>
                <Badge count={notificationsE.length} overflowCount={10}>
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleNotifications} width="23" height="23" fill="currentColor" class="bi bi-bell " viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                  </svg>
                </Badge>
              </Link>
              <Link className='mx-3 my-1'>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => dispatch(logout())} width="23" height="23" fill="" class="bi bi-box-arrow-right " viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                </svg>
              </Link>
              <div>
                {profileData.photo_profil ? (
                  <a className="nav-link" href="#/expediteur/profile">
                    <img src={profileData.photo_profil} alt="Photo de profil" className="img-fluid rounded-circle me-2" style={{ maxWidth: '60px', maxHeight: "35px" }} />
                  </a>
                ) :
                  (
                    <a className="nav-link" href="#/expediteur/profile">Profile</a>
                  )}
              </div>
              <span className='me-2 my-2 welcome' >
                <strong style={{ color: "black" }}>{state.user ? `Welcome${'\u00A0'}${state.user.username}` : ''}</strong>
              </span>
            </form>
          </div>

      )}


    </div>
  );

  const publicLink = (
    <>
      <a class="navbar-brand mx-2" href="#">
        <img src={charji} alt="" width="110" height="24" class="d-inline-block align-text-top" />
        
      </a>
      <Link to="/login" className="nav-link  ms-auto" >
        <div class="d-flex btnj btnb mx-2" >
          <button class="btn btn-warnig-outline-success " type="submit">Se connecter</button>
        </div>
      </Link>
    </>
  );

  return (
    <Fragment>
      <nav className={`navbar navbar-expand-lg  bg-white  ${className}`} style={{ boxShadow: '0 1px 4px rgba(0, 0, 0, 0.07)' }}>
        <div className="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {state.isAuthenticated ? authLink : publicLink}
          </div>
        </div>
      </nav>

      {state.isTransporteur ?
        <>
          {showNotifications && (
            <div className="position-relative">
              <div className="toast-container top-0 end-0 p-2 me-1 bg-light bg-opacity-75 scroll-notifications " >
                {notifications.map((notification, index) => (
                  <div className="toast mb-3" role="alert" aria-live="assertive" data-bs-autohide="false" aria-atomic="true" key={notification.id} ref={el => toastRefs.current[index] = el}>
                    <div className="toast-header">
                      {notification.expediteur.photo_profil && (
                        <img src={notification.expediteur.photo_profil.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + notification.expediteur.photo_profil : notification.expediteur.photo_profil}
                          className="rounded-circle  me-2" alt="..." style={{ width: '30px', height: '30px', objectFit: 'cover' }} />
                      )}

                      <strong className="me-auto">{notification.expediteur.firstname} {notification.expediteur.lastname}
                        {/* <small className="text-body-secondary"> a choisi votre offre </small> */}
                      </strong>
                      <small className="text-body-secondary">Il y a {calculateTimeDifference(notification.created_at)}</small>
                      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => handleReadNotification(notification.id)}></button>
                    </div>
                    <div className="toast-body">
                      {notification.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
        :
        <>
          {showNotifications && (
            <div className="position-relative">
              <div className="toast-container top-0 end-0 p-2 me-1 bg-light bg-opacity-75 scroll-notifications">
                {notificationsE.map((notification, index) => (
                  <div className="toast mb-3" role="alert" aria-live="assertive" data-bs-autohide="false" aria-atomic="true" key={notification.id} ref={el => toastRefs.current[index] = el}>
                    <div className="toast-header">
                      {notification.transporteur.photo_profil && (
                        <img src={notification.transporteur.photo_profil.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + notification.transporteur.photo_profil : notification.transporteur.photo_profil}
                          className="rounded-circle me-2" alt="..." style={{ width: '30px', height: '30px', objectFit: 'cover' }} />
                      )}
                      <strong className="me-auto">{notification.transporteur.firstname} {notification.transporteur.lastname}
                        {/* <small className="text-body-secondary"> a choisi votre offre </small> */}
                      </strong>
                      <small className="text-body-secondary">Il y a {calculateTimeDifference(notification.created_at)}</small>
                      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => handleReadNotificationE(notification.id)}></button>
                    </div>
                    <div className="toast-body">
                      {notification.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      }

    </Fragment>
  );
}

export default Navbar;
