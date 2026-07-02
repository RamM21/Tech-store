import { useParams } from "react-router-dom";

export function ProductDetails() {
  const { id } = useParams();
  return <h1>Product Details for {id}</h1>;
}
