
import ProductProviderProduct from '../models/ProductProviderProduct';
export default {
  render(provider:ProductProviderProduct) {
    return provider.productProvider;
  },
  renderMany(providers:ProductProviderProduct[]) {
    return providers.map(provider => this.render(provider));
  }
}
;
