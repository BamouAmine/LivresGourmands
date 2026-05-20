import { getBookCover } from '../utils/bookCover';

export default function BookCarousel({ books }) {
  if (!books || books.length === 0) {
    return null;
  }

  const visibleBooks = books.slice(0, 3);

  return (
    <div id="livreCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
      <div className="carousel-inner rounded shadow-sm overflow-hidden">
        {visibleBooks.map((book, index) => (
          <div key={book.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img
              src={getBookCover(book)}
              className="d-block w-100"
              alt={book.titre}
              style={{ maxHeight: '420px', objectFit: 'cover' }}
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h5>{book.titre}</h5>
              <p>{book.auteur}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#livreCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Précédent</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#livreCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Suivant</span>
      </button>
    </div>
  );
}
