import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';


export default function NavBar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Livres Gourmands
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Accueil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">
                Catégories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                Panier
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">
                Tableau de bord
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-3">
              <span className="text-light">{cart.length} article(s)</span>
            </li>
            {user ? (
              <>
                <li className="nav-item me-2">
                  <span className="nav-link text-white">Bonjour, {user.name || user.nom || user.role}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={logout}>
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className="btn btn-outline-light" to="/login">
                  Connexion
                </NavLink>
              </li>
            )}

            <Link to="/register">

            Créer un compte

</Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
