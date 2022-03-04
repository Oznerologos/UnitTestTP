import React from "react";
import useHome from "../hooks/useHome";
import Header from "./Header";
import Footer from "./Footer";
import { BallTriangle } from "react-loader-spinner";

const Home = ({ setRoute }: { setRoute: (data: any) => void }) => {
  const { loading, products } = useHome();
  return (
    <div>
      <Header />
      {loading && <div id="loaderCont">
        <BallTriangle
          color="#3fff00"
          height={300}
          width={300}
        />
      </div>}
      <div onClick={() => setRoute({ route: "cart" })} className="btn btn-primary">Voir mon panier</div>
      <div id="productCont">
        {products.map((product) => {
          return (
            <React.Fragment>
              <div
                onClick={() => setRoute({ route: "product", data: product })} className="card"
              >
                <img src={product.image} alt="" />
                <p>Figurine de {product.name}</p>
                <p className="quantity">Quantitée {product.quantity}</p>
              </div>

            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
