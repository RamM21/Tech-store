import { useLocation } from "react-router-dom"
import { useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react";
import style from "../style/category.module.css"
import {type Products} from "../types/Products"
import { type Props } from "../types/Products";


export default function Products({ products: propProducts, category }: Props) {

  //Show products from category and sort by groups, maker, price.

  /*
  img
  productName
  price
  maker
  rating
  category
  productGroup
  */
 


  const location = useLocation();
  const products = propProducts ?? location.state?.products ?? [];
  const preselectedGroup = location.state?.preselectedGroup ?? "";
  category = category ?? products[0].category
  console.log(location.state)
  // Filters
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState(preselectedGroup);
  console.log(group)
  const [maker, setMaker] = useState("");
  const [price, setPrice] = useState(500); // slider max

  // Unique filter options
  const groups = [...new Set(products.map((p: { productGroup: any; }) => p.productGroup))];
  const makers = [...new Set(products.map((p: { maker: any; }) => p.maker))];

  // Apply filters
  const filtered = products.filter((p: { name: string; productGroup: any; maker: string; price: number; }) => {
    return (
      (search === "" || p.name.toLowerCase().includes(search.toLowerCase())) &&
      (group === "" || p.productGroup === group) &&
      (maker === "" || p.maker === maker) &&
      (price === 0 || p.price <= Number(price))
    );
  });
  console.log("filter")
  console.log(filtered)

  return (
    <div className={style.container}>
      <h1 className={style.title}>{category}</h1>

      <div className={style.layout}>
        {/* SIDEBAR FILTERS */}
        <aside className={style.sidebar}>
          <h2>Filters</h2>

          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={style.search}
          />

          <label>Group</label>
          <select value={group} onChange={e => setGroup(e.target.value)} className={style.select}>
            <option value="">All Groups</option>
            {groups.map(g => (
              <option key={String(g)} value={String(g)}>{String(g)}</option>
            ))}
          </select>

          <label>Maker</label>
          <select value={maker} onChange={e => setMaker(e.target.value)} className={style.select}>
            <option value="">All Makers</option>
            {makers.map(m => (
              <option key={String(m)} value={String(m)}>{String(m)}</option>
            ))}
          </select>

          <label htmlFor="priceRange">Max Price: {price}€</label>
          <input
            id="priceRange"
            type="range"
            min="0"
            max="500"
            step="10"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            className={style.slider}
          />
        </aside>

        {/* PRODUCT LIST */}
        <main className={style.products}>
          <div className={style.list}>
            {filtered.map((p: { id: Key | null | undefined; image: string | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | undefined> | null | undefined; price: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; maker: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; rating: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; productGroup: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
              <div key={p.id} className={style.card}>
                <img src={p.image} alt={p.name} className={style.image} />

                <div className={style.info}>
                  <h3 className={style.name}>{p.name}</h3>
                  <p className={style.price}>{p.price} €</p>
                  <p className={style.maker}>Maker: {p.maker}</p>
                  <p className={style.rating}>⭐ {p.rating}/5</p>
                  <p className={style.group}>Group: {p.productGroup}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
