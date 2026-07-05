import {  Link } from "react-router-dom";
import  Searchbar  from "./Searchbar"
import  ShoppingCart  from "./ShoppingCart";
import { useState } from "react";
import data from "../assets/products.json"
import style from "../style/navbar.module.css";

export function Navbar() {

  //Have working category and productGroup, searchBar and shoppingCart
 let products = data
  /*
  home
  categories
  searchBar
  shoppingCart
  */

  const [open, setOpen] = useState(false);
  const [hoverCategory, setHoverCategory] = useState<string | null>(null);
  const [hoveringGroups, setHoveringGroups] = useState(false);

  // Build structure: { category: [productGroups] }
  const categoryMap: Record<string, Set<string>> = {};
  products.forEach(p => {
    if (!categoryMap[p.category]) {
      categoryMap[p.category] = new Set();
    }
    categoryMap[p.category].add(p.productGroup);
  });

  
  const hideGroups = () => {
    // Hide only if NOT hovering groups
    if (!hoveringGroups) {
      setHoverCategory(null);
    }
  };

  return (
    <nav className={style.nav}>
      <div className={style.left}>
        <Link to="/" onClick={()=>setOpen(false)} className={style.logo}>TechiStore</Link>

        <div className={style.dropdown}>
          <button
            className={style.dropbtn}
            onClick={() => setOpen(prev => !prev)}
          > 
            Products ▼
          </button>

          {open && (
            <div className={style.dropdownContent}>
              
              {/* LEFT COLUMN: CATEGORIES */}
              <div
                className={style.categoryColumn}
                onMouseLeave={hideGroups}
              >
                {Object.keys(categoryMap).map(category => (
                  <Link
                    key={category}
                    to={`/category/${category}`}
                    state={{
                      products: products.filter(p => p.category === category),
                      preselectedGroup: null
                    }}
                    onClick={() => setOpen(false)}
                    className={style.link}
                  >
                    <div
                      className={style.categoryItem}
                      onMouseEnter={() => setHoverCategory(category)}
                    >
                      {category}
                    </div>
                  </Link>
                ))}
                
              </div>

              {/* RIGHT COLUMN: GROUPS (visible when hovering category OR groups) */}
              {hoverCategory && (
                <div
                  className={style.groupColumn}
                  onMouseEnter={() => {setHoveringGroups(true);
                    setTimeout(() => {
                      if (!hoveringGroups) {
                        setHoverCategory(null);
                      }
                    }, 0);
                  }}
                  onMouseLeave={() => {
                    setHoveringGroups(false)
                    setTimeout(() => {
                      if (!hoveringGroups) {
                        setHoverCategory(null);
                      }
                    }, 0);
                  }}
                >
                  <div className={style.groupList}>
                    {[...categoryMap[hoverCategory]].map(group => (
                      <Link
                        key={group}
                        to={`/category/${hoverCategory}`}
                        state={{
                          products: products.filter(p => p.productGroup === group),
                          preselectedGroup: group
                        }}
                        onClick={() => setOpen(false)}
                        className={style.dropdownLink}
                      >
                        {group}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </div>

      <div className={style.center}>
        <Searchbar products={products} />
      </div>

      <div>
        <ShoppingCart />
      </div>
    </nav>
  );
}
