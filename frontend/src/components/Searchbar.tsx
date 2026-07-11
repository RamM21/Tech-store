import { useState } from "react";
import style from "../style/searchbar.module.css"
import { Link } from "react-router-dom";
import {type Product} from "../types/Products"

export default function Searchbar ({products}: {products: Product[]}) {

    //search by producName, category, productGroup
    /*
    searchbBy:
    name
    category
    productGroup
    */
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);

    //Find products by name
    const productMatches = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    //Categories based on matched products
    const categoryMatches = [
        ...new Set(productMatches.map(p => p.category))
    ];

    //Product groups based on matched products
    const groupMatches = [
        ...new Set(productMatches.map(p => p.productGroup))
    ];

    const showDropdown =
        focused &&
        query.length > 0 &&
        (productMatches.length > 0 ||
        categoryMatches.length > 0 ||
        groupMatches.length > 0);

    return (
        <div className={style.wrapper}>
        <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Search products..."
            className={style.input}
        />
        <span className={style.icon}>🔍</span>

        {showDropdown && (
            <div className={style.dropdown}>
            
            {/* LEFT SIDE: categories + groups */}
            <div className={style.leftColumn}>
                {categoryMatches.length > 0 && (
                <div className={style.section}>
                    <div className={style.sectionTitle}>Categories</div>
                    {categoryMatches.map(cat => (
                    <Link
                        onClick={()=>setQuery("")}
                        key={cat}
                        to={`/category/${cat}`}
                        state={{products:products.filter(p => p.category === cat),
                                preselectedGroup : ""
                        }}
                        className={style.item}
                    >
                        {cat}
                    </Link>
                    ))}
                </div>
                )}

                {groupMatches.length > 0 && (
                <div className={style.section}>
                    <div className={style.sectionTitle}>Product Groups</div>
                    {groupMatches.map(group => (
                    <Link
                        key={group}
                        to={`/category/${productMatches[0]?.category ?? group}`}
                        state={{
                            products: products.filter(p => p.productGroup === group),
                            preselectedGroup: group
                        }}
                        onClick={() => setQuery("")}
                        className={style.item}
                        >
                        {group}
                    </Link>
                    ))}
                </div>
                )}
            </div>

            {/* RIGHT SIDE: product results */}
            <div className={style.rightColumn}>
                {productMatches.length > 0 && (
                <div className={style.section}>
                    <div className={style.sectionTitle}>Products</div>
                    {productMatches.slice(0, 6).map(p => (
                    <Link
                        onClick={()=>setQuery("")}
                        key={p.id}
                        to={`/products/${p.id}`}
                        state={p}
                        className={style.productItem}
                    >
                        <img src={p.image} className={style.thumb} />
                        <span>{p.name}</span>
                    </Link>
                    ))}
                </div>
                )}
            </div>

            </div>
        )}
        </div>
    );
}