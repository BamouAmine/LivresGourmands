import { useEffect, useState } from 'react';

const initialForm = {
  titre: '',
  auteur: '',
  prix: 0,
  stock: 0,
  categorie_id: ''
};

const roles = ['administrateur', 'gestionnaire', 'editeur', 'client'];

export default function AdminDashboard() {
  const [tab, setTab] = useState('ouvrages');
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadBooks = async () => {
    try {
      const response = await api.get('/ouvrages');
      setBooks(response.data);
    } catch (err) {
      setError('Impossible de charger les ouvrages.');
    }
  };

  const loadOrders = async () => {
    try {
      const response = await api.get('/commande');
      setOrders(response.data);
    } catch (err) {
      setError('Impossible de charger les commandes ou connexion requise.');
    }
  };

  const loadUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (err) {
      setError('Impossible de charger les utilisateurs.');
    }
  };

  useEffect(() => {
    loadBooks();
    loadOrders();
    loadUsers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError('');
      await api.post('/ouvrages', {
        titre: form.titre,
        auteur: form.auteur,
        prix: Number(form.prix),
        stock: Number(form.stock),
        categorie_id: form.categorie_id
      });
      setMessage('Ouvrage ajouté avec succès.');
      setForm(initialForm);
      loadBooks();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l’ajout.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/ouvrages/${id}`);
      loadBooks();
      setMessage('Ouvrage supprimé.');
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de supprimer le livre.');
    }
  };

  const handleUserUpdate = async (userId, role, actif) => {
    try {
      setError('');
      await api.put(`/users/${userId}`, { role, actif });
      setMessage('Utilisateur mis à jour.');
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de mettre à jour l’utilisateur.');
    }
  };

  return (
    <div className="row">
      <aside className="col-lg-3 mb-4">
        <div className="card shadow-sm mb-4">
          <div className="list-group list-group-flush">
            <button
              type="button"
              className={`list-group-item list-group-item-action ${tab === 'ouvrages' ? 'active' : ''}`}
              onClick={() => setTab('ouvrages')}
            >
              Ouvrages
            </button>
            <button
              type="button"
              className={`list-group-item list-group-item-action ${tab === 'commandes' ? 'active' : ''}`}
              onClick={() => setTab('commandes')}
            >
              Commandes
            </button>
            <button
              type="button"
              className={`list-group-item list-group-item-action ${tab === 'utilisateurs' ? 'active' : ''}`}
              onClick={() => setTab('utilisateurs')}
            >
              Utilisateurs
            </button>
          </div>
        </div>
      </aside>

      <section className="col-lg-9">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>Espace administrateur</h2>
            <p className="text-muted">Gérez les livres, commandes et utilisateurs depuis cette interface.</p>
          </div>
        </div>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {tab === 'ouvrages' && (
          <div>
            <h4 className="mb-3">Gestion des ouvrages</h4>
            <div className="row gy-4">
              <div className="col-lg-5">
                <div className="card shadow-sm p-4 h-100">
                  <h5 className="mb-3">Ajouter un nouvel ouvrage</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Titre</label>
                      <input className="form-control" name="titre" value={form.titre} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Auteur</label>
                      <input className="form-control" name="auteur" value={form.auteur} onChange={handleChange} required />
                    </div>
                    <div className="mb-3 row">
                      <div className="col-6">
                        <label className="form-label">Prix</label>
                        <input type="number" className="form-control" name="prix" value={form.prix} onChange={handleChange} required />
                      </div>
                      <div className="col-6">
                        <label className="form-label">Stock</label>
                        <input type="number" className="form-control" name="stock" value={form.stock} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Catégorie</label>
                      <input className="form-control" name="categorie_id" value={form.categorie_id} onChange={handleChange} />
                    </div>
                    <button className="btn btn-primary" type="submit">Ajouter</button>
                  </form>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="card shadow-sm p-4">
                  <h5 className="mb-3">Liste des ouvrages</h5>
                  <div className="list-group">
                    {books.map((book) => (
                      <div key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{book.titre}</strong>
                          <div className="text-muted">{book.auteur} • {Number(book.prix).toFixed(2)} €</div>
                        </div>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(book.id)}>
                          Supprimer
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'commandes' && (
          <div>
            <h4 className="mb-3">Commandes</h4>
            {orders.length === 0 ? (
              <div className="alert alert-secondary">Aucune commande enregistrée pour le moment.</div>
            ) : (
              <div className="table-responsive shadow-sm rounded bg-white">
                <table className="table mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Client</th>
                      <th>Date</th>
                      <th>Montant</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.user_id || '—'}</td>
                        <td>{new Date(order.date_commande).toLocaleDateString()}</td>
                        <td>{order.total != null ? Number(order.total).toFixed(2) : '—'} €</td>
                        <td>{order.status || 'En attente'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'utilisateurs' && (
          <div>
            <h4 className="mb-3">Gestion des utilisateurs</h4>
            {users.length === 0 ? (
              <div className="alert alert-secondary">Aucun utilisateur trouvé.</div>
            ) : (
              <div className="table-responsive shadow-sm rounded bg-white">
                <table className="table mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Rôle</th>
                      <th>Actif</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.nom || '—'}</td>
                        <td>{user.email}</td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={user.role}
                            onChange={(e) => handleUserUpdate(user.id, e.target.value, user.actif)}
                          >
                            {roles.map((roleOption) => (
                              <option key={roleOption} value={roleOption}>
                                {roleOption}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={user.actif ? '1' : '0'}
                            onChange={(e) => handleUserUpdate(user.id, user.role, e.target.value === '1')}
                          >
                            <option value="1">Oui</option>
                            <option value="0">Non</option>
                          </select>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary" onClick={() => handleUserUpdate(user.id, user.role, user.actif)}>
                            Enregistrer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
