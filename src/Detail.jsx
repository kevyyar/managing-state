import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail() {
  const { id } = useParams();
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
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
