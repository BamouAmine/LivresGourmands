import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../contexts/CartContext';
import { getBookCover } from '../utils/bookCover';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/ouvrages/${id}`);
        setBook(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Livre introuvable.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAdd = () => {
    addToCart(book, 1);
    navigate('/cart');
  };

  if (loading) {
    return <div className="alert alert-info">Chargement du produit...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="row gy-4">
      <div className="col-lg-5">
        <div className="card shadow-sm">
          <img
            src={getBookCover(book)}
            className="card-img-top"
            alt={book.titre}
            style={{ objectFit: 'cover', height: '420px' }}
          />
          <div className="card-body">
            <h3>{book.titre}</h3>
            <p className="text-muted">{book.auteur}</p>
            <p className="mb-1"><strong>Catégorie :</strong> {book.categorie_id || 'Non précisée'}</p>
            <p className="mb-1"><strong>Stock :</strong> {book.stock}</p>
            <p className="mb-1"><strong>Prix :</strong> {Number(book.prix).toFixed(2)} €</p>
            <p className="text-secondary mt-3">{book.description || 'Description non disponible pour ce livre.'}</p>
            <div className="d-flex gap-2 mt-3 flex-wrap">
              <button className="btn btn-success" onClick={handleAdd} disabled={book.stock === 0}>
                {book.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-7">
        <section className="mb-4">
          <h4>Avis des lecteurs</h4>
          <div className="list-group shadow-sm">
            <div className="list-group-item">
              <strong>Alice</strong>
              <p>Un livre captivant avec une histoire gourmande très bien racontée.</p>
            </div>
            <div className="list-group-item">
              <strong>Marc</strong>
              <p>Excellent contenu, je recommande pour les amoureux de littérature culinaire.</p>
            </div>
            <div className="list-group-item">
              <strong>Sophie</strong>
              <p>Super service et description détaillée du produit.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
