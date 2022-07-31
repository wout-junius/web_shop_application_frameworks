import { Product } from "./Product";

export interface ISale {
    id: number;
    date: Date;
    products: Product[];
}