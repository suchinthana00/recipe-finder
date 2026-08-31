export type Recipe = {
  id: string;
  name: string;
  image: string;
  category?: string;
  area?: string;
  instructions?: string;
  ingredients: {
    name: string;
    measure: string;
  }[];
  tags?: string[];
  youtube?: string;
};
