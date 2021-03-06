import ProductProvider from '../models/ProductProvider';
import { format } from 'date-fns';
export default {
  render(provider:ProductProvider) {
    return {
      id: provider.id,
      name: provider.name,
      phone: provider.phone,
      email: provider.email,
      create_at: format(provider.create_at, 'dd/MM/yyyy')
    };
  },
  renderMany(providers:ProductProvider[]) {
    return providers.map(provider => this.render(provider));
  }
}
;
