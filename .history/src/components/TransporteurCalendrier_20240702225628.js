import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'react-calendar/dist/Calendar.css';
import { getExpediteursParTransporteur, profileWithId } from '../actions/auth';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Badge, Calendar, Layout, Button, Card, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

interface Event {
  type: BadgeProps['status'];
  content: string;
}

const aggregateExpeditionsByMonth = (expeditions: any[]) => {
  const aggregatedData: { [key: string]: number } = {};

  expeditions.forEach(expedition => {
    const monthKey = dayjs(expedition.date_expedition).format('YYYY-MM');
    if (aggregatedData[monthKey]) {
      aggregatedData[monthKey]++;
    } else {
      aggregatedData[monthKey] = 1;
    }
  });

  return aggregatedData;
};

const MyCalender = () => {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [expeditions, setExpeditions] = useState([]);
  const [allExpeditions, setAllExpeditions] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Définir selectedDate comme un état local
  const [expeditionsByMonth, setExpeditionsByMonth] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(getExpediteursParTransporteur());
        setAllExpeditions(data); // Stockez les données initiales
        const aggregatedData = aggregateExpeditionsByMonth(data.filter(expedition => expedition.status === "confirme"));
        setExpeditionsByMonth(aggregatedData);
      } catch (error) {
        console.error(error);
        // Gérer les erreurs
      }
    };
    fetchData();
  }, [dispatch]);

  const getListData = (value: Dayjs, allExpeditions: any[]): Event[] => {
    // Obtenez la date sous forme de chaîne (ex: 'YYYY-MM-DD')
    const dateString = value.format('YYYY-MM-DD');
    // Filtrer les expéditions pour cette date
    const expeditionsForDate = allExpeditions.filter(expedition => {
      return dayjs(expedition.date_expedition).format('YYYY-MM-DD') === dateString && expedition.status !== "en_attente_confirmation";
    });

    // Créer une liste de badges avec les couleurs appropriées pour chaque type de marchandise
    const badges = expeditionsForDate.map((expedition, index) => {
      return {
        type: getStatusColor(index),
        content: expedition.type_marchandise,
        status: expedition.status,

      };
    });
    return badges;
  };

  // Fonction pour obtenir la couleur en fonction du statut
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'confirme':
        return 'gold'; // Exemple de couleur pour le statut "confirme"
      case 'en_transit':
        return 'cyan'; // Exemple de couleur pour le statut "en_transit"
      case 'livre':
        return 'green'; // Exemple de couleur pour le statut "livre"
      case 'annule':
        return 'red'; // Exemple de couleur pour le statut "annule"
      default:
        return 'default'; // Couleur par défaut si le statut n'est pas reconnu
    }
  };

  const getMonthData = (value: Dayjs): number | undefined => {
    const monthKey = value.format('YYYY-MM');
    return expeditionsByMonth[monthKey];
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <span>Backlog</span><br/>
        <small>Nombre d'expéditions programmés: {num} </small>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value, allExpeditions); // Passer allExpeditions à getListData
    return (
      <div className="events">
        {listData.map((item, index) => (
          item.status === "confirme" ? (
            <Badge.Ribbon key={index} color={getStatusColor(item.status)} text={`${item.content}`} style={{ whiteSpace: 'nowrap'}} className='me-2 ' >
              <Badge key={index} color={getStatusColor(item.status)} className='mb-1'/>
            </Badge.Ribbon>
          ) : (
            <Badge key={index} color={getStatusColor(item.status)} text={item.content} style={{ whiteSpace: 'nowrap' }} />
          )
        ))}
      </div>
    );
  };

  const cellRender: Calendar['props']['cellRender'] = (current: Dayjs, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  const handleDateClick = (value: Dayjs) => {
    // Obtenez la date sous forme de chaîne (ex: 'YYYY-MM-DD')
    const dateString = value.format('YYYY-MM-DD');
    setSelectedDate(dateString);
    // Filtrer les expéditions pour cette date
    const expeditionsForDate = allExpeditions.filter(expedition => {
      return dayjs(expedition.date_expedition).format('YYYY-MM-DD') === dateString && expedition.status !== "en_attente_confirmation";
    });
    setExpeditions(expeditionsForDate);

  };

  const handleProfile = async (UserId) => {
    try {
      const data = await dispatch(profileWithId(UserId));
      setProfileData(data);

    } catch (error) {
      alert(`Erreur lors du profile`);
      console.error('Erreur lors du profile', error);
    }
  };

  const getStatusOfExp = (status: string): string => {
    switch (status) {
      case 'confirme':
        return 'Programmé'; 
      case 'en_transit':
        return 'En Transit'; 
      case 'livre':
        return 'Livré'; 
      case 'annule':
        return 'Annulé'; 
  
    }
  };
  return (
      <div className='row mt-3 d-flex flex-column-reverse flex-lg-row mx-1'>
        <div className='col-lg-4 '>
          <Card title={`Missions pour la date "${dayjs(selectedDate).format('YYYY-MM-DD')}"`}>
            {expeditions && expeditions.map(expedition => (
              <Badge.Ribbon color={getStatusColor(expedition.status)} text={getStatusOfExp(expedition.status)} style={{ whiteSpace: 'nowrap' }} >
                <Card type="inner" title={`#${expedition.id} ${expedition.type_marchandise}`} className=" mb-3" key={expedition.id}>
                  <div class="card-body">
                    <div className='row'>
                      <div className='d-flex flex-column col-1'>
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
                      <div className='col-6'>
                        <p class="card-text mb-0" >Ville de départ</p>
                        <p class="card-title mb-1 "><small>{expedition.ville_depart}</small></p>
                        <p class="card-text mb-0">Ville d'arrivée</p>
                        <p class="card-title"><small>{expedition.ville_arrivee}</small></p>
                      </div>
                      <div className='col-4'>
                          <p class="card-text mb-0" >Description</p>
                          <p><small>{expedition.consignes_exp}</small></p>
                      </div>
                    </div>
                    <hr className='mb-2 mt-2' />
                    <div className='row mx-2'>
                      <div className='col-6'>
                        <div className='d-flex justify-content-start'>
                          <div>
                            <p class="card-text mb-0" >Date Expédition</p>
                            <p><small>{expedition.date_expedition}</small></p>
                          </div>
                        </div>
                      </div>
                      <div className='col-6'>
                        <div className='d-flex justify-content-around'>
                          <div>
                            <p class="card-text mb-0 ">Poids</p>
                            <p><small>{expedition.poids} kg</small></p>
                          </div>
                          <div>
                            <p class="card-text mb-0">Volume</p>
                            <p><small>{expedition.volume} m³</small></p>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                  <div class="modal fade" id={`exampleModalprofile${expedition.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-md">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id={`exampleModalprofile${expedition.id}`}>A propos de l'Expéditeur</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" >

                          {profileData && (
                            <>
                              <div className="text-center mb-3">
                                {profileData.photo_profil && (
                                   <a href={profileData.photo_profil.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + profileData.photo_profil : profileData.photo_profil} target="_blank" rel="noopener noreferrer">
                                   <img src={profileData.photo_profil.startsWith('/media/images/') ? 'http://127.0.0.1:8000' + profileData.photo_profil : profileData.photo_profil}
                                     alt="Photo de profil" className="img-fluid clickable-image" 
                                     style={{ width: '30%' }}
                                     />
                                 </a>
                                )}
                               
                              </div>
                              <p>first_name: {profileData.first_name}</p>
                              <p>last_name: {profileData.last_name}</p>
                              <p>Email: {profileData.email}</p>
                              <p>Adresse: {profileData.adresse}</p>
                              <p>Num telephone: {profileData.expediteur.tel}</p>
                            </>
                          )}
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button type="primary" block data-bs-toggle="modal" data-bs-target={`#exampleModalprofile${expedition.id}`} onClick={() => handleProfile(expedition.expediteur)}>Détails de l'Expéditeur</Button>
                </Card>
              </Badge.Ribbon>
            ))}

          </Card>
        </div>

        <div className='col-lg-8 col-12'>
          <Card type="inner" title="Agenda des Missions">
            <Badge color="gold" text="Programé" />
            <Badge color="cyan" text="En Transit" className='mx-3' />
            <Badge color="green" text="Livré" />
            <Badge color="red" text="Annulé" className='mx-3' />

            <Calendar cellRender={cellRender} onSelect={handleDateClick} />
          </Card>

        </div>
      </div>

  );
};


const TransporteurCalendrier = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh', height: '100%', backgroundColor: "white" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div class="col">
        <Navbar class="row" activeClass="Calendrier"/>
          <MyCalender />
      </div>

    </Layout>
  );
};

export default TransporteurCalendrier;

