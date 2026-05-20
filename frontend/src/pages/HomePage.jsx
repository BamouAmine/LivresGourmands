import { useEffect, useMemo, useState } from 'react';
import api from '../api/axios';
import BookCard from '../components/BookCard';
import BookCarousel from '../components/BookCarousel';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Toutes');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/ouvrages');
        setBooks(response.data);
      } catch (err) {
        setError('Impossible de charger les livres.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(books.map((book) => book.categorie_id || 'Autres'));
    return ['Toutes', ...Array.from(unique)];
  }, [books]);

  const filteredBooks = useMemo(() => {
    if (category === 'Toutes') return books;
    return books.filter((book) => String(book.categorie_id) === String(category));
  }, [books, category]);

  return (
    <div>
      <section className="mb-4">
        <div className="p-5 rounded-4 bg-light text-dark shadow-sm">
          <h1 className="display-6">Livres Gourmands</h1>
          <p className="lead">Découvrez des livres sélectionnés pour les lecteurs exigeants et gourmets.</p>
          <div className="d-flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-4">
        <BookCarousel books={books} />
      </section>

      {loading ? (
        <div className="alert alert-info">Chargement des livres...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <section className="mb-4">
            <h2 className="mb-3">Nos meilleures sélections</h2>
            <div className="row row-cols-1 row-cols-md-3 g-3">
              {filteredBooks.slice(0, 6).map((book) => (
                <div key={book.id} className="col">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3">Catalogue</h2>
            <div className="row row-cols-1 row-cols-md-4 g-3">
              {filteredBooks.map((book) => (
                <div key={book.id} className="col">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
