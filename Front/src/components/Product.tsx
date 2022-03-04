import useProduct from "../hooks/useProduct";
import { BallTriangle } from "react-loader-spinner";

const Product = ({ setRoute, data: product }: any) => {
  const { quantity, message, loading, setQuantity, addProduct } =
    useProduct(product);

  return (
    <div id="productPage">
      {loading && <div>
        <BallTriangle
          color="#3fff00"
          height={200}
          width={200}
        /></div>}
      {message && <p>{message}</p>}
      <div onClick={() => setRoute({ route: "home" })} className="btn btn-primary">Retour</div>
      <div id="productCont">
        <div className="card">
          <img src={product.image} alt="" />
          <p>Figurine de {product.name}</p>
          <p className="quentity">Quantitée {product.quantity}</p>
        </div>
      </div>
      <div id="formCont">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Quantité à ajouter"
          className="form-control"
        />
        <button onClick={addProduct} className="btn btn-primary">Ajouter au panier</button>
      </div>
    </div>
  );
};

export default Product;
