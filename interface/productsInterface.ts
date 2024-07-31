export interface IProductsItems {
    id: string;
    bild: string;
    bildDetailsOne: string;
    bildDetailsTwo: string;
    bildDetailsThree: string;
    bildDetailsFour: string;
    title: string;
    price: string;
    bildDetailsTow: string;
    descriptions:string
    evaluation:number
    colors:string[]
    sizes:string[]
  }
  
  export type TProducts = Partial<IProductsItems>
  
  
  export interface ICategorieItemsMen {
    id: string;
    art: string;
    categories: string;
    title: string;
    price: string;
    size: string;
    bewertung: number;
    bild: string;
  }