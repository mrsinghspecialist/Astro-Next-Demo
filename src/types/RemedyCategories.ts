export type CategoriesAPIResponse = {
  success: boolean;
  status: number;
  res: Category[];
};

export type Category = {
  _id: string;
  name: string;
  __v: number;
  slug: string;
  image: string;
  description?: string;
};

export type ProductsAPIResponse = {
  status: boolean;
  res: Product[];
};

export type Product = {
  reviews: any[];
  _id: string;
  name: string;
  slug: string;
  price: number;
  short_description: string;
  description: string;
  longdescription: string;
  original_price: number;
  category: Category;
  image: string;
  images: any[];
  brand: string;
  keyfeatures: string;
  dateCreated: string;
  __v: number;
  id: string;
};
