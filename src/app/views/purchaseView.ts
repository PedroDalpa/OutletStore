import { format } from 'date-fns';
import Purchase from '../models/Purchase';
export default {
  render(purchase:Purchase) {
    return {
      id: purchase.id,
      fiscalNote: purchase.fiscal_note,
      totalValue: `R$ ${String(purchase.total_value).replace('.', ',')}`,
      createAt: format(purchase.create_at, 'dd/MM/yyyy')
    };
  },
  renderMany(purchases:Purchase[]) {
    return purchases.map(purchase => this.render(purchase));
  }
}
;
