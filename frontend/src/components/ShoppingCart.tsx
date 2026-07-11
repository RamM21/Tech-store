import style from "../style/shoppincart.module.css"

export default function ShoppingCart() {
    //Show added products in cart with total price and delete products from cart

    /*
    productName
    price
    totalPrice
    rating

    */
    const items = 3; // replace with your cart state later

    return (
        <div className={style.cart}>
            <span className={style.icon}>🛒</span>
            {items > 0 && <span className={style.badge}>{items}</span>}
        </div>
    );
}