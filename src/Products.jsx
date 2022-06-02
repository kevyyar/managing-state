import React, { useState } from "react";
import Spinner from "./Spinner";

import useFetch from "./services/useFetch";
import { useParams } from "react-router-dom";

export default function Products() {
    const [size, setSize] = useState("");
    const { category } = useParams();
    const {
        data: products,
        isLoading,
        hasErrored,
    } = useFetch(`products?category=${category}`);

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

    const filterBySize = size
        ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
        : products;

    if (hasErrored) throw hasErrored;

    if (isLoading) return <Spinner />;

    return (
        <>
            <section id="filters">
                <label htmlFor="size">Filter by Size:</label>{" "}
                <select
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                >
                    <option value="">All sizes</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
                {size && <h2>Found {filterBySize.length} products</h2>}
            </section>
            <section id="products">{filterBySize.map(renderProduct)}</section>
        </>
    );
}
