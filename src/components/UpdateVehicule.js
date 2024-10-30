import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateVehicule } from '../actions/auth';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Layout } from 'antd';

function UpdateVehicule({ match }) {
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);

    const vehiculeId = match.params.vehiculeId;
    const [formData, setFormData] = useState({
        marque: '',
        modele: '',
        immatriculation: '',
        annee_fabrication: '',
        type: '',
        capacite_chargement: '',
        volume: '',
        carte_grise: null,
        assurance: null,
        description: '',
        img_vehicule: null,
        disponibilite: true,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateVehicule(vehiculeId, formData));
        alert("Modification du véhicule effectuée avec succès.")
    };
    const typeOptions = [
        { value: 'camion_leger', label: 'Camion léger' },
        { value: 'pickup', label: 'Pickup' },
        { value: 'benne', label: 'Benne' },
        { value: 'citerne', label: 'Citerne' },
        { value: 'frigorifique', label: 'Frigorifique' },
        { value: 'fourgon', label: 'Fourgon' },
        { value: 'plateau', label: 'Plateau' },
        { value: 'grue', label: 'Grue' },
        { value: 'malaxeur', label: 'Malaxeur' },
        { value: 'porte_conteneurs', label: 'Porte conteneurs' },
        { value: 'remorque', label: 'Remorque' },
    ];

    return (
        <Layout style={{ minHeight: '100vh', height: '100%', backgroundColor: "white" }}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div class="col">
                <Navbar  />
                <div className='d-flex justify-content-center my-4'>
                    <h3>Modification du véhicule Numero #{vehiculeId}</h3>
                </div>
                <div className="container mt-4 px-3">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label htmlFor="marque" className="form-label">Marque</label>
                                    <input type="text"  required className="form-control" id="marque" name="marque" value={formData.marque} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label htmlFor="modele" className="form-label">Modèle</label>
                                    <input type="text" required className="form-control" id="modele" name="modele" value={formData.modele} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label htmlFor="immatriculation" className="form-label">Immatriculation</label>
                                    <input  type="Number" min="0" required className="form-control" id="immatriculation" name="immatriculation" value={formData.immatriculation} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label htmlFor="annee_fabrication" className="form-label">Année de Fabrication</label>
                                    <input type="number" min="1900" required max="2024" className="form-control" id="annee_fabrication" name="annee_fabrication" value={formData.annee_fabrication} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label for="validationServer04" className="form-label">Type</label>
                                    <select class="form-select " id="validationServer04" aria-describedby="validationServer04Feedback" name="type" value={formData.type} onChange={handleChange} required>
                                        <option selected value="">Sélectionner un type</option>
                                        {typeOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label htmlFor="capacite_chargement" className="form-label">Capacité de Chargement</label>
                                    <input type="number" min="0" required className="form-control" id="capacite_chargement" name="capacite_chargement" value={formData.capacite_chargement} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label htmlFor="volume" className="form-label">Volume</label>
                                    <input type="number" min="0" required className="form-control" id="volume" name="volume" value={formData.volume} onChange={handleChange} />
                                </div>
                            </div>
                            {/* <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Disponibilité</label>
                                    <select className="form-select" name="disponibilite" value={formData.disponibilite} onChange={handleChange}>
                                        <option value={true}>Disponible</option>
                                        <option value={false}>Non disponible</option>
                                    </select>
                                </div>
                            </div> */}
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" required className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Carte grise</label>
                                    <input type="file" required className="form-control" name="carte_grise" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Assurance</label>
                                    <input type="file" required className="form-control" name="assurance" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Image du véhicule</label>
                                    <input type="file" required className="form-control" name="img_vehicule" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Mettre à Jour</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default UpdateVehicule;
