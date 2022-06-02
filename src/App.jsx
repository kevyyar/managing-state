import React, {useState, useEffect} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from "./Spinner";

import { getProducts } from "./services/productService";

export default function App() {
  const [size, setSize] = useState('');
  const [products, setProducts] = useState([]);
  const [hasErrored, setHasErrored] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const data = await getProducts('shoes');
        setProducts(data);
      } catch (error) {
        setHasErrored(error);
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, [])

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }


  const filterBySize = size ? products.filter(p => p.skus.find(s => s.size === parseInt(size))) : products;

  if(hasErrored) throw hasErrored;

  if(isLoading) return <Spinner />;

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            {size && <h2>Found {filterBySize.length} products</h2>}
          </section>
          <section id="products">
            {filterBySize.map(renderProduct)}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
