import ProductSubCategory from '../models/ProductSubCategory';
import { format } from 'date-fns';
export default {
  render(subCategory:ProductSubCategory) {
    return {
      id: subCategory.id,
      name: subCategory.name,
      categoryName: subCategory.productCategory.name,
      create_at: format(subCategory.create_at, 'dd/MM/yyyy')

    };
  },
  renderMany(subCategorys:ProductSubCategory[]) {
    return subCategorys.map(subCategory => this.render(subCategory));
  }
}
;
