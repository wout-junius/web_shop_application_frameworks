import { ITag } from "./Tag";

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    tags?: ITag[];
}