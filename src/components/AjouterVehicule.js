import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createVehicule } from '../actions/auth';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Button, Layout, Card } from 'antd';


function AjouterVehicule() {
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);

    const [formData, setFormData] = useState({
        marque: '',
        modele: '',
        immatriculation: '',
        annee_fabrication: '',
        type: '',
        capacite_chargement: '',
        volume: '',
        description: '',
        disponibilite: true,
        carte_grise: null,
        assurance: null,
        img_vehicule: null
    });

    const handleChange = (e) => {
        if (e.target.name === 'carte_grise' || e.target.name === 'assurance' || e.target.name === 'img_vehicule') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createVehicule(formData));
        alert("Véhicule ajouté avec succès.")

        // Réinitialiser le formulaire après soumission
        setFormData({
            marque: '',
            modele: '',
            immatriculation: '',
            annee_fabrication: '',
            type: '',
            capacite_chargement: '',
            volume: '',
            description: '',
            disponibilite: true,
            carte_grise: null,
            assurance: null,
            img_vehicule: null
        });
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
                <Navbar class="row" activeClass="dashboard"/>
                <div className='row  m-4'>
                    <h2 className="mb-4">Ajouter un véhicule</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label className="form-label">Marque</label>
                                <input type="text" className="form-control" name="marque" required value={formData.marque} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Modèle</label>
                                <input type="text" className="form-control" name="modele" required value={formData.modele} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Immatriculation</label>
                                <input type="Number" min="0" className="form-control" name="immatriculation" required value={formData.immatriculation} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label className="form-label">Année de mise en circulation</label>
                                <input type="Number" min="1900" max="2024" className="form-control" name="annee_fabrication" required value={formData.annee_fabrication} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <label for="validationServer04"  className="form-label">Type</label>
                                <select class="form-select " id="validationServer04" aria-describedby="validationServer04Feedback" name="type" value={formData.type} onChange={handleChange} required>
                                    <option selected  value="">Sélectionner un type</option>
                                    {typeOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Capacité de chargement</label>
                                <input type="Number" min="0" className="form-control" name="capacite_chargement" required value={formData.capacite_chargement} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label className="form-label">Volume</label>
                                <input type="Number" min="0" className="form-control" name="volume" value={formData.volume} required onChange={handleChange} />
                            </div>
                            <div className="col-md-8">
                                <label className="form-label">Description</label>
                                <input type="text" className="form-control" name="description" value={formData.description} required onChange={handleChange} />
                            </div>
                            {/* <div className="col-md-4">
                                <label className="form-label">Disponibilité</label>
                                <select className="form-select" name="disponibilite" value={formData.disponibilite} onChange={handleChange}>
                                    <option value={true}>Disponible</option>
                                    <option value={false}>Non disponible</option>
                                </select>
                            </div> */}
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label className="form-label">Carte grise</label>
                                <input type="file" className="form-control" required name="carte_grise" onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Assurance</label>
                                <input type="file" className="form-control" required name="assurance" onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Image du véhicule</label>
                                <input type="file" className="form-control" required name="img_vehicule" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col mt-4 text-center">
                                <button type="submit" className="btn btn-primary">Enregistrer Véhicule</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </Layout>

    );
}

export default AjouterVehicule;
