import { ProductDocument } from 'src/schemas/product.schema';
import { EDirection } from '../constants/sort-direction';
import { ESortField } from '../constants/sort-field';

export type TGetProductsArguments = {
  navigate: {
    skip: number;
    limit: number;
  };
  filters?: {
    category?: ProductDocument['category'];
  };
  sort?: {
    field: ESortField;
    direction: EDirection;
  }[];
};
