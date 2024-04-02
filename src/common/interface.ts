export interface Product {
  id?: string;
  name: string;
  price: number;
}

export interface Users {
  id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}
export interface Order {
  id?: string;
  user_id: string;
  status: string;
}

export interface OrderProduct {
  id?: string;
  order_id: string;
  product_id: string;
  quantity: number;
}
