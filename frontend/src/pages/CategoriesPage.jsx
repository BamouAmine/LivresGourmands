import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import BookCard from '../components/BookCard';

export default function CategoriesPage() {
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState('Toutes');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/ouvrages');
        setBooks(response.data);
      } catch (err) {
        setError('Impossible de charger les ouvrages.');
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
    if (selected === 'Toutes') return books;
    return books.filter((book) => String(book.categorie_id) === String(selected));
  }, [books, selected]);

  return (
    <div>
      <h1 className="mb-4">Catalogue par catégories</h1>

      <div className="mb-4 d-flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn btn-sm ${selected === category ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setSelected(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="alert alert-info">Chargement des catégories...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <div className="mb-4">
            <h4>{selected === 'Toutes' ? 'Tous les ouvrages' : `Catégorie : ${selected}`}</h4>
            <p className="text-muted">{filteredBooks.length} résultat(s) trouvé(s).</p>
          </div>
          <div className="row row-cols-1 row-cols-md-4 g-3">
            {filteredBooks.map((book) => (
              <div key={book.id} className="col">
                <BookCard book={book} />
              </div>
            ))}
          </div>
          {filteredBooks.length === 0 && (
            <div className="alert alert-warning mt-4">Aucun livre trouvé pour cette catégorie.</div>
          )}
        </>
      )}
    </div>
  );
}
