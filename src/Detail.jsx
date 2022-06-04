import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail() {
  const [size, setSize] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    hasErrored,
  } = useFetch(`products/${id}`);


  if (isLoading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (hasErrored) throw hasErrored;


  // TODO: Display these products details
  return (
    // <h1>Detail</h1>
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select
        id="size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      >
        <option value="">What size?</option>
        {product.skus.map(s => (
          <option key={s.sku} value={s.size}>{s.size}</option>
        ))}
      </select>
      <p>
        <button className="btn btn-primary" disabled={!size} onClick={() => navigate('/cart')}>Add to cart</button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
