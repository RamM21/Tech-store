export type Products = {
  id: string | number;
  name: string;
  price: number;
  maker: string;
  rating: number;
  image: string;
  productGroup: string;
  category: string;
};

export type Product ={
  id: number | string;
  name: string;
  category: string;
  productGroup: string;
  image: string;
  price: number;
}

export type Props = {
  products?: Products[];
  category?: string;
};