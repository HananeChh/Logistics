import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getExpediteurUser, createExpedition } from '../actions/auth';
import Navbar from './Navbar';

function Ajouterexp() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        type_marchandise: '',
        poids: '',
        volume: '',
        consignes_exp: '',
        ville_depart: '',
        ville_arrivee: '',
        date_expedition: '',
        paiement: ''
    });

    useEffect(() => {
        dispatch(getExpediteurUser());
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createExpedition(formData));
        alert("Expedition ajouté avec succès.");
        // Réinitialiser le formulaire après soumission
        setFormData({
            type_marchandise: '',
            poids: '',
            volume: '',
            consignes_exp: '',
            ville_depart: '',
            ville_arrivee: '',
            date_expedition: '',
            paiement: ''
        });
    };
    const marchandiseOptions = [
        { value: 'electronique', label: 'Électronique' },
        { value: 'vetements', label: 'Vêtements' },
        { value: 'meubles', label: 'Meubles' },
        { value: 'produits_alimentaires_perissables', label: 'Produits alimentaires périssables' },
        { value: 'produits_alimentaires_non_perissables', label: 'Produits alimentaires non périssables' },
        { value: 'boissons', label: 'Boissons' },
        { value: 'materiaux_construction_bois', label: 'Matériaux de construction en bois' },
        { value: 'materiaux_construction_acier', label: 'Matériaux de construction en acier' },
        { value: 'materiaux_construction_ciment', label: 'Matériaux de construction en ciment' },
        { value: 'produits_chimiques_pharmaceutiques', label: 'Produits chimiques pharmaceutiques' },
        { value: 'produits_chimiques_industriels', label: 'Produits chimiques industriels' },
        { value: 'produits_dangereux_inflammables', label: 'Produits dangereux inflammables' },
        { value: 'produits_dangereux_toxiques', label: 'Produits dangereux toxiques' },
        { value: 'metaux', label: 'Métaux' },
        { value: 'mineraux', label: 'Minéraux' },
        { value: 'produits_agricoles', label: 'Produits agricoles' },
        { value: 'electromenagers', label: 'Électroménagers' },
        { value: 'articles_menagers', label: 'Articles ménagers' },
        { value: 'machines_lourdes', label: 'Machines lourdes' },
        { value: 'equipements_electroniques', label: 'Équipements électroniques' },
    ];

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
            <Navbar activeClass="Ajouterexp" />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Créer une nouvelle expédition</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Type de marchandise</label>
                            <select
                                class="form-select " id="validationServer04" aria-describedby="validationServer04Feedback" name="type_marchandise"
                                value={formData.type_marchandise}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner un type de marchandise</option>
                                {marchandiseOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Poids</label>
                            <input type="number" required min="0" className="form-control" name="poids" value={formData.poids} onChange={handleChange} placeholder="Poids" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Volume</label>
                            <input type="number" required min="0" className="form-control" name="volume" value={formData.volume} onChange={handleChange} placeholder="Volume" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Consignes d'expédition</label>
                            <input type="text" required className="form-control" name="consignes_exp" value={formData.consignes_exp} onChange={handleChange} placeholder="Consignes d'expédition" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Ville de départ</label>
                            <select
                                class="form-select " id="validationServer04" aria-describedby="validationServer04Feedback" 
                                name="ville_depart"
                                value={formData.ville_depart}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner une ville</option>
                                {wilayas.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Ville d'arrivée</label>
                            <select
                                class="form-select " id="validationServer04" aria-describedby="validationServer04Feedback" 
                                name="ville_arrivee"
                                value={formData.ville_arrivee}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner une ville</option>
                                {wilayas.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Date d'expédition</label>
                            <input type="date" required className="form-control" name="date_expedition" value={formData.date_expedition} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Mode de paiement</label>
                            <select className="form-select" required name="paiement" value={formData.paiement} onChange={handleChange} aria-label="Mode de paiement">
                                <option value="" disabled>Sélectionnez le mode de paiement</option>
                                <option value="main_a_main">Paiement en espèces</option>
                                <option value="par_carte">Carte Edahabia</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mt-3 text-center">
                            <button type="submit" className="btn btn-primary">Enregistrer Expédition</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Ajouterexp;
