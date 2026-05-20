import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="text-center py-5">
        <h2>Votre panier est vide</h2>
        <p>Ajoutez des ouvrages depuis la page d'accueil.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Mon panier</h2>
      <div className="table-responsive shadow-sm rounded bg-white">
        <table className="table mb-0">
          <thead className="table-light">
            <tr>
              <th>Produit</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Total</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.titre}</td>
                <td>{Number(item.prix).toFixed(2)} €</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max={item.stock}
                    value={item.quantity}
                    className="form-control form-control-sm"
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  />
                </td>
                <td>{(Number(item.prix) * item.quantity).toFixed(2)} €</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end mt-4">
        <div className="card p-3 shadow-sm" style={{ minWidth: '280px' }}>
          <h5>Total</h5>
          <p className="fs-4 fw-bold">{Number(total).toFixed(2)} €</p>
          <button className="btn btn-success w-100">Valider ma commande</button>
        </div>
      </div>
    </div>
  );
}
