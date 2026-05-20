import { Link } from 'react-router-dom';
import { getBookCover } from '../utils/bookCover';

export default function BookCard({ book }) {
  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={getBookCover(book)}
        className="card-img-top"
        alt={book.titre}
        style={{ height: '230px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{book.titre}</h5>
        <p className="card-text text-muted mb-2">{book.auteur}</p>
        <p className="card-text fw-bold mb-3">{Number(book.prix).toFixed(2)} €</p>
        <p className="card-text text-truncate">{book.description || 'Aucune description disponible.'}</p>
        <div className="mt-auto">
          <Link to={`/product/${book.id}`} className="btn btn-primary w-100">
            Voir le produit
          </Link>
        </div>
      </div>
    </div>
  );
}
