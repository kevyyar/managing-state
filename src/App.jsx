import React, {useState, useEffect} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import { getProducts } from "./services/productService";

export default function App() {
  const [size, setSize] = useState('');
  const [products, setProducts] = useState([]);
  const [hasErrored, setHasErrored] = useState(null);

  useEffect(() => {
    getProducts('shoes').then(res => setProducts(res)).catch(err => setHasErrored(err))
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
