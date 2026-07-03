import { useLocation } from "react-router-dom"
import style from "../style/product.module.css";

export function ProductDetails() {
  
  let product = useLocation().state
  //Show details of product and show same productGroup items below
  /*
  img
  productName
  price
  description
  rating
  itemCount
  location
  */
  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <div className={style.imageContainer}>
          <img src={product.image} alt={product.name} className={style.image} />
        </div>

        <div className={style.info}>
          <h1 className={style.name}>{product.name}</h1>
          <h2 className={style.price}>{product.price} €</h2>

          <p className={style.description}>{product.description}</p>

          <div className={style.details}>
            <div className={style.detailItem}>⭐ Rating: {product.rating}/5</div>
            <div className={style.detailItem}>In stock: {product.itemCount}</div>
            <div className={style.detailItem}>Location: {product.location}</div>
          </div>

          <button className={style.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
