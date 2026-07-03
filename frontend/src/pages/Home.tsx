import data from "../assets/products.json"
import style from "../style/home.module.css"
import { Link } from "react-router-dom"
export function Home() {

  //Show different category and productGroup items
  let product = Array.prototype
  function getProduct(){
    product = data
  }
  getProduct()
  //console.log(product)
  /*
  img
  ProductName
  Price
  rating
  */

const renderCategory = (title: string, category: string, products: typeof product) => (
  <section className={style.section}>
    <h2 className={style.sectionTitle}>{title}</h2>

    <div className={style.productLine}>
      {products
        .filter(p => p.category === category)
        .map(p => (
          <Link to="/products/{p.id}" className={style.link} state={p}>
          <div key={p.id} className={style.productCard}>
            
            <img src={p.image} alt={p.name} className={style.productImage} />

            <h3 className={style.productName}>{p.name}</h3>
            <p className={style.productPrice}>{p.price} €</p>
            <p className={style.productRating}>⭐ {p.rating}/5</p>
            
          </div>
          </Link>
        ))}
    </div>
  </section>
);


  return (
    <div className={style.container}>
      {renderCategory("Electronics", "Electronics", product)}
      {renderCategory("Clothing", "Clothing", product)}
      {renderCategory("Outdoors", "Outdoors", product)}
    </div>
  );
}

