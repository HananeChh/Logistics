import axios from "axios";
import {
    TRANSPORTEUR_USER_LOADED,
    TRANSPORTEUR_USER_FAILED,
    EXPEDITEUR_USER_LOADED,
    _USER_FAILED,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_TUSER_SUCCESS,
    REGISTER_EUSER_FAILED,
    REGISTER_EUSER_SUCCESS,
    REGISTER_TUSER_FAILED,
    EXPEDITEUR_USER_FAILED,
    TRANSPORTEUR_IMAGES_UPDATED,
    TRANSPORTEUR_IMAGES_UPDATE_FAILED,


} from "../actions/types"



export const getTransporteurUser = () => (dispatch, getState) => {
    const token = getState().auth.token
    const is_transporteur = getState().auth.isTransporteur
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    if (token && is_transporteur) {
        config.headers['Authorization'] = `Token ${token}`
    }
    axios.get('http://127.0.0.1:8000/api/transporteur/dashboard/', config)
        .then(res => {
            dispatch({
                type: TRANSPORTEUR_USER_LOADED,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: TRANSPORTEUR_USER_FAILED
            })
        })
}



// check token and load  user
export const getExpediteurUser = () => (dispatch, getState) => {
    const token = getState().auth.token;
    const is_transporteur = getState().auth.isTransporteur
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token && !is_transporteur) {
        config.headers['Authorization'] = `Token ${token}`
    }

    axios.get('http://127.0.0.1:8000/api/expediteur/dashboard/', config)
        .then(res => {
            dispatch({
                type: EXPEDITEUR_USER_LOADED,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: EXPEDITEUR_USER_FAILED
            })
        })
}


export const create_transporteuruser = ({ username, email, first_name, last_name, tel, password, password2, adresse }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ username, email, first_name, last_name, tel, password, password2, adresse });

    try {
        const res = await axios.post('http://127.0.0.1:8000/api/signup/transporteur/', body, config);

        dispatch({
            type: REGISTER_TUSER_SUCCESS,
            payload: res.data,
        });

        return res.data.transporteur_id;
    } catch (error) {
        dispatch({
            type: REGISTER_TUSER_FAILED,
        });
        // Gestion des erreurs
        if (error.response.data.username) {
            // Erreur avec un code de statut HTTP
            console.error(error.response.data);
            throw new Error(error.response.data.username);
        } else if (error.response.data.email) {
            console.error(error.response.data);
            throw new Error(error.response.data.email);
        }
        else if (error.request) {
            // La requête a été faite mais aucune réponse n'a été reçue
            console.error(error.request);
            throw new Error('Erreur de réseau, veuillez réessayer.');
        } else {
            // Erreur lors de la configuration de la requête
            console.error('Error', error.message);
            throw error;
            throw new Error('Une erreur est survenue, veuillez réessayer.');
        }
    }
};




export const create_expediteuruser = ({ username, first_name, last_name, tel, email, password, password2, adresse }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ username, first_name, last_name, tel, email, password, password2, adresse });
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/signup/expediteur/', body, config);

        dispatch({
            type: REGISTER_EUSER_SUCCESS,
            payload: res.data,
        });

        return res.data;
    } catch (error) {
        dispatch({
            type: REGISTER_EUSER_FAILED,
        });
        // Gestion des erreurs
        if (error.response.data.username) {
            // Erreur avec un code de statut HTTP
            console.error(error.response.data.username);
            throw new Error(error.response.data.username);
        } else if (error.response.data.email) {
            console.error(error.response.data);
            throw new Error(error.response.data.email);
        }
        else if (error.request) {
            // La requête a été faite mais aucune réponse n'a été reçue
            console.error(error.request);
            throw new Error('Erreur de réseau, veuillez réessayer.');
        } else {
            // Erreur lors de la configuration de la requête
            console.error('Error', error.message);
            throw new Error('Une erreur est survenue, veuillez réessayer.');
        }
    }

}



export const login = ({ username, password }) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ username, password })

    return axios.post('http://127.0.0.1:8000/api/login/', body, config)
        .then(response => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data,
            }
            ); // Assurez-vous de dispatcher les données de l'utilisateur
            return response.data;
        })
        .catch(error => {
            
             if (error.response.data.error) {
                // La requête a été faite mais aucune réponse n'a été reçue
                console.error(error.response);
                throw new Error(error.response.data.error,"booo");
            }
            else if (error.response) {
                // Erreur avec un code de statut HTTP
                console.error(error.response.data);
                throw new Error(error.response.data.non_field_errors);
            } 
            else if (error.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                console.error(error.request);
                throw new Error('Erreur de réseau, veuillez réessayer.');
            } else {
                // Erreur lors de la configuration de la requête
                console.error('Error', error.message);
                throw new Error('Une erreur est survenue, veuillez réessayer.');
            }
        });
};


export const logout = () => (dispatch, getState) => {
    const token = getState().auth.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }
    axios.post('http://127.0.0.1:8000/api/logout/', null, config)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        }).catch(err => {
            console.log(err.response.data)
        })
}

export const updateTransporteurImages = (transporteur_id, images) => (dispatch, getState) => {

    if (!transporteur_id) {
        console.error("TransporteurId is not defined.");
        return;
    }

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };



    const formData = new FormData();
    Object.keys(images).forEach((key) => {
        formData.append(key, images[key]);
    });

    axios
        .put(`http://127.0.0.1:8000/api/transporteur-images/${transporteur_id}/`, formData, config)
        .then((res) => {
            dispatch({
                type: TRANSPORTEUR_IMAGES_UPDATED,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: TRANSPORTEUR_IMAGES_UPDATE_FAILED,
            });
            console.log(err.response.data);
        });
};
// Crée une expédition
export const createExpedition = ({ type_marchandise, poids, volume, consignes_exp, ville_depart, ville_arrivee, date_expedition, paiement }) => (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    const body = JSON.stringify({ type_marchandise, poids, volume, consignes_exp, ville_depart, ville_arrivee, date_expedition, paiement });

    axios.post('http://127.0.0.1:8000/expediteurs/expedition/create/', body, config)
        .then(res => {
            // Traitez la réponse comme vous le souhaitez
            console.log(res.data);
        }).catch(err => {
            console.error(err.response.data);
        });
};

//
export const getExpeditionsByExpediteur = () => (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return axios.get('http://127.0.0.1:8000/expediteurs/expedition/create/', config)
        .then(res => res.data)
        .catch(err => {
            console.error(err.response.data);
            throw err;
        });
};
//
export const getMatchedVehiclesForExpedition = (expeditionId) => async (dispatch) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/expediteurs/propose_matched_vehicles/${expeditionId}/`);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//


export const getExpeditions = () => (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return axios.get('http://127.0.0.1:8000/expediteurs/api/expeditions/', config)
        .then(res => res.data)
        .catch(err => {
            console.error(err.response.data);
            throw err;
        });
};

//
export const getMatchedExpeditionForVehicule = (vehiculeId) => async (dispatch) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/expediteurs/matched_expeditions_for_vehicle/${vehiculeId}/`);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//
export const getAllVehicles = () => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const response = await axios.get('http://127.0.0.1:8000/transporteurs/vehicules/', config);
        return response.data;
    } catch (error) {
        console.error(error.response.data);
        throw error;
    }
};
//

export const createVehicule = ({ marque, modele, immatriculation, annee_fabrication, type, capacite_chargement, volume, description, disponibilite, carte_grise, assurance, img_vehicule }) => (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    const formData = new FormData();
    formData.append('marque', marque);
    formData.append('modele', modele);
    formData.append('immatriculation', immatriculation);
    formData.append('annee_fabrication', annee_fabrication);
    formData.append('type', type);
    formData.append('capacite_chargement', capacite_chargement);
    formData.append('volume', volume);
    formData.append('description', description);
    formData.append('disponibilite', disponibilite);
    formData.append('carte_grise', carte_grise);
    formData.append('assurance', assurance);
    formData.append('img_vehicule', img_vehicule);

    axios.post('http://127.0.0.1:8000/transporteurs/vehicules/', formData, config)
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.error(err.response.data);
        });
};
//
export const makeOfferForExpedition = (expeditionId, vehicleId, prix_propose) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const body = JSON.stringify({ prix_propose });

        const res = await axios.post(`http://127.0.0.1:8000/expediteurs/submit_price/${vehicleId}/${expeditionId}/`, body, config);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//

export const choisir_vehicule = (expeditionId, vehicleId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.post(`http://127.0.0.1:8000/expediteurs/choisir_vehicule/${expeditionId}/${vehicleId}/`, null, config);

        return res.data;
    } catch (error) {
        // Gestion des erreurs
        if (error.response) {
            // Erreur avec un code de statut HTTP
            console.error(error.response.data);
            throw new Error(error.response.data.detail);
        } else if (error.request) {
            // La requête a été faite mais aucune réponse n'a été reçue
            console.error(error.request);
            throw new Error('Erreur de réseau, veuillez réessayer.');
        } else {
            // Erreur lors de la configuration de la requête
            console.error('Error', error.message);
            throw new Error('Une erreur est survenue, veuillez réessayer.');
        }
    }
};

//
export const getTransporteurNotifications = () => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.get('http://127.0.0.1:8000/transporteurs/notifications/', config);

        // Vérifiez le statut de la réponse
        if (res.status === 200) {
            return res.data; // Retourne les notifications
        } else {
            throw new Error('Une erreur est survenue lors de la récupération des notifications du transporteur.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des notifications du transporteur:', error);
        throw error;
    }
};
//
export const validerChoixExpediteur = (choixId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.post(`http://127.0.0.1:8000/expediteurs/valider_choix/${choixId}/`, null, config);

        return res.data;
    } catch (error) {
        // Gestion des erreurs
        if (error.response) {
            // Erreur avec un code de statut HTTP
            console.error(error.response.data);
            throw new Error(error.response.data.message);
        } else if (error.request) {
            // La requête a été faite mais aucune réponse n'a été reçue
            console.error(error.request);
            throw new Error('Erreur de réseau, veuillez réessayer.');
        } else {
            // Erreur lors de la configuration de la requête
            console.error('Error', error.message);
            throw new Error('Une erreur est survenue, veuillez réessayer.');
        }
    }
};
//
export const getExpediteurNotifications = () => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.get('http://127.0.0.1:8000/expediteurs/notifications/', config);

        // Vérifiez le statut de la réponse
        if (res.status === 200) {
            return res.data; // Retourne les notifications
        } else {
            throw new Error('Une erreur est survenue lors de la récupération des notifications du expediteur.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des notifications du expediteur.', error);
        throw error;
    }
};
// 
export const RetourSurAction = (expeditionId, vehicleId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.post(`http://127.0.0.1:8000/expediteurs/expedition/retour-sur-action/${expeditionId}/${vehicleId}/`, null, config);

        return res.data;
    } catch (error) {
        console.error(error);
        throw error;

    }
};
//
export const annulerParTransporteur = (expeditionId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.post(`http://127.0.0.1:8000/expediteurs/expedition/annuler-par-transporteur/${expeditionId}/`, null, config);

        return res.data;
    } catch (error) {
        console.error(error);
        throw error;

    }
};
//
export const statusConfirmé = () => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                status: 'confirme'
            }
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.get(`http://127.0.0.1:8000/expediteurs/expeditions/status/`, config);

        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//
//
export const annulerParExpediteur = (expeditionId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.post(`http://127.0.0.1:8000/expediteurs/expedition/annuler-par-expediteur/${expeditionId}/`, null, config);

        return res.data;
    } catch (error) {
        console.error(error);
        throw error;

    }
};
// 
export const updateExpedition = (expeditionId, { type_marchandise, poids, volume, consignes_exp, ville_depart, ville_arrivee, date_expedition, paiement }) => (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    const body = JSON.stringify({ type_marchandise, poids, volume, consignes_exp, ville_depart, ville_arrivee, date_expedition, paiement });

    axios.put(`http://127.0.0.1:8000/expediteurs/expedition/${expeditionId}/`, body, config)
        .then(res => {
            // Traitez la réponse comme vous le souhaitez
            console.log(res.data);
        }).catch(err => {
            console.error(err.response.data);
        });
};
//

export const deleteExpedition = (expeditionId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        if (!token) {
            throw new Error('No token found');
        }

        const config = {
            headers: {
                'Authorization': `Token ${token}`,
            },
        };

        const res = await axios.delete(`http://127.0.0.1:8000/expediteurs/expedition/${expeditionId}/`, config);

        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//
export const getExpediteursParTransporteur = () => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },

        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.get(`http://127.0.0.1:8000/transporteurs/expeditions/`, config);

        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//
export const generateFacture = (choixExpediteur) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;


        const response = await fetch(`http://127.0.0.1:8000/expediteurs/generate-facture/${choixExpediteur}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        });

        const blob = await response.blob();
        // Convertir le blob en URL de l'objet
        const factureObjectUrl = URL.createObjectURL(blob);
        return factureObjectUrl;
    } catch (error) {
        console.error("Une erreur s'est produite lors de la génération de la facture :", error);
        throw error;
    }
};

//

export const updatePosition = (expeditionId, latitude, longitude) => (dispatch, getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.post(`http://127.0.0.1:8000/transporteurs/mettre-a-jour-position/${expeditionId}/`, { latitude, longitude }, config)
        .then(res => {
            console.log('Position mise à jour avec succès:', res.data);
            return res.data.address;
            // Dispatch actions or handle response data as needed
        })
        .catch(err => {
            console.error('Erreur lors de la mise à jour de la position:', err);
            // Dispatch actions or handle errors as needed
        });
};

//
export const suivreExpedition = (expeditionId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const response = await axios.get(`http://127.0.0.1:8000/transporteurs/suivre_position_transporteur/${expeditionId}/`, config);

        // Assurez-vous que la réponse contient bien les données de position et les retourne
        return response.data;
    } catch (error) {
        // Gérer les erreurs
        throw error;
    }
};


//
export const RestaurerExpedition = (expeditionId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.post(`http://127.0.0.1:8000/expediteurs/expedition/restaurer/${expeditionId}/`, null, config);

        return res.data;
    } catch (error) {
        console.error(error);
        throw error;

    }
};
//ne fonctionne pas
export const callPaymentApi = async (expeditionId, vehiculeId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/payment/${expeditionId}/${vehiculeId}/`);
        return response.data.redirect_url;
    } catch (error) {
        throw new Error(`Une erreur s'est produite lors de l'appel à l'API de paiement: ${error.message}`);
    }
};
//

export const rechercheExpedition = (typeExp) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                type_marchandise: typeExp
            }
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.get(`http://127.0.0.1:8000/transporteurs/recherche-expeditions/`, config);

        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//

export const profile = () => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },

        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.get(`http://127.0.0.1:8000/api/profile/`, config);

        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//
export const noterTransporteur = (choixExpediteur, noteTransporteur) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const data = {
            note_transporteur: noteTransporteur
        };

        const res = await axios.post(`http://127.0.0.1:8000/expediteurs/noter_transporteur/${choixExpediteur}/`, data, config)
        console.log(res.data.message)

        return (res.data.message);

    } catch (error) {
        console.error(error);
        throw error;
    }
};
//
export const updatePhotoProfile = (photoFile) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const formData = new FormData();

        // Ajoutez le fichier photo_profil au FormData
        formData.append('photo_profil', photoFile);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', // Définissez le type de contenu comme 'multipart/form-data'
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.post(`http://127.0.0.1:8000/api/update-profile-photo/`, formData, config)
        console.log(res.data.message)

        return res.data.message;

    } catch (error) {
        console.error(error);
        throw error;
    }
};
//

export const profileWithId = (idUser) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },

        };

        // if (token) {
        //     config.headers['Authorization'] = `Token ${token}`;
        // }

        const res = await axios.get(`http://127.0.0.1:8000/api/user/${idUser}`, config);

        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//
export const getTransporteurDetailsTable = () => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.get('http://127.0.0.1:8000/transporteurs/details-table/', config);

        // Vérifiez le statut de la réponse
        if (res.status === 200) {
            return res.data; // Retourne les notifications
        } else {
            throw new Error('Une erreur est survenue lors de la récupération de table details du transporteur.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de  table details  du transporteur:', error);
        throw error;
    }
};
//
export const RefuserMission = (choixId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.post(`http://127.0.0.1:8000/transporteurs/ignorer-choix/${choixId}/`, null, config);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;

    }
};
//
export const notificationisReadExp = (notifId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.post(`http://127.0.0.1:8000/expediteurs/notification-exp/read/${notifId}/`, null, config);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;

    }
};
//
export const notificationisReadTr = (notifId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.post(`http://127.0.0.1:8000/transporteurs/notification-transpo/read/${notifId}/`, null, config);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;

    }
};
//
export const transporteurStat = (startDate, endDate) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                start_date: startDate,
                end_date: endDate
            }
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.get(`http://127.0.0.1:8000/transporteurs/stats/`, config);

        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//
export const ValiderLivraison = (expeditionId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const res = await axios.post(`http://127.0.0.1:8000/expediteurs/expedition-termine/${expeditionId}/`, null, config);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;

    }
};
//

export const updateVehicule = (vehicleId, formData) => (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    const formPayload = new FormData();
    for (const key in formData) {
        formPayload.append(key, formData[key]);
    }

    axios.put(`http://127.0.0.1:8000/transporteurs/vehicules/${vehicleId}/`, formPayload, config)
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.error(err.response.data);
        });
};
//
export const deleteVehicule = (vehicleId) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        if (!token) {
            throw new Error('No token found');
        }

        const config = {
            headers: {
                'Authorization': `Token ${token}`,
            },
        };

        const res = await axios.delete(`http://127.0.0.1:8000/transporteurs/vehicules/${vehicleId}/`, config);

        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//

export const updateExpediteur = (formData) => (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.put('http://127.0.0.1:8000/api/expediteur-update/', formData, config)
        .then(res => {
            console.log(res.data);
            // Vous pouvez ajouter ici un dispatch pour mettre à jour le state global si nécessaire
        }).catch(err => {
            console.error(err.response.data);
        });
};
//

export const updateTransporteur = (formData) => (dispatch, getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.put('http://127.0.0.1:8000/api/transporteur-update/', formData, config)
        .then(res => {
            console.log(res.data);
            // Vous pouvez ajouter ici un dispatch pour mettre à jour le state global si nécessaire
        }).catch(err => {
            console.error(err.response.data);
        });
};