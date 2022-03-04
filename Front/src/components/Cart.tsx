import React from "react";
import useCart from "../hooks/useCart";
import { BallTriangle } from "react-loader-spinner";

const Cart = ({ setRoute }: { setRoute: (data: any) => void }) => {
  const { loading, products, message, loadCart, removeToCart } = useCart();
  return (
    <div>
      {loading && <div>
        <BallTriangle
          color="#3fff00"
          height={200}
          width={200}
        />
      </div>}
      {message && <p>{message}</p>}
      <div onClick={() => setRoute({ route: "home" })} className="btn btn-primary">Retour</div>
      <div id="productCont">
        {products.map((product) => {
          return (
            <React.Fragment>
              <div>
                <div className="card">
                  <img src={product.image} alt="" />
                  <p>Figurine de {product.name}</p>
                  <p className="quantity">Quantitée {product.quantity}</p>
                </div>
                <button onClick={() => removeToCart(product)} className="btn btn-danger">
                  Supprimer du panier
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
