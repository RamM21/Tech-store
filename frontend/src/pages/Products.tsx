import { useLocation } from "react-router-dom"
import { useState } from "react";
import style from "../style/category.module.css"

export function Products() {

  //Show products from category and sort by groups, maker, price.

  let products = useLocation().state
  /*
  img
  productName
  price
  maker
  rating
  category
  productGroup
  */

  // Filters
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");
  const [maker, setMaker] = useState("");
  const [price, setPrice] = useState("");

  // Unique filter options
  const groups = [...new Set(products.map((p: { productGroup: any; }) => p.productGroup))];
  const makers = [...new Set(products.map((p: { maker: any; }) => p.maker))];

  // Apply filters
  const filtered = products.filter(p => {
    return (
      (search === "" || p.name.toLowerCase().includes(search.toLowerCase())) &&
      (group === "" || p.productGroup === group) &&
      (maker === "" || p.maker === maker) &&
      (price === "" || p.price <= Number(price))
    );
  });

  return (
    <div className={style.container}>
      <h1 className={style.title}>{products.category} Products</h1>

      {/* FILTER BAR */}
      <div className={style.filters}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={style.search}
        />

        <select value={group} onChange={e => setGroup(e.target.value)} className={style.select}>
          <option value="">All Groups</option>
          {groups.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select value={maker} onChange={e => setMaker(e.target.value)} className={style.select}>
          <option value="">All Makers</option>
          {makers.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select value={price} onChange={e => setPrice(e.target.value)} className={style.select}>
          <option value="">Max Price</option>
          <option value="50">Under 50€</option>
          <option value="100">Under 100€</option>
          <option value="200">Under 200€</option>
          <option value="500">Under 500€</option>
        </select>
      </div>

      {/* PRODUCT LIST */}
      <div className={style.list}>
        {filtered.map(p => (
          <div key={p.id} className={style.card}>
            <img src={p.image} alt={p.name} className={style.image} />

            <div className={style.info}>
              <h3 className={style.name}>{p.name}</h3>
              <p className={style.price}>{p.price} €</p>
              <p className={style.maker}>Maker: {p.maker}</p>
              <p className={style.rating}>⭐ {p.rating}</p>
              <p className={style.group}>Group: {p.productGroup}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
