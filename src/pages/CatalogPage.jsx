import ProductCard from '../ProductCard.jsx';
import { products } from '../data/products.js';

export default function CatalogPage() {
  return <section>
    <header className="page-intro"><p className="eyebrow">ATELIER · НОВАЯ КОЛЛЕКЦИЯ</p><h1>Одежда для вашего ритма</h1><p>Выберите вещи, которые подходят именно вам.</p></header>
    <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
  </section>;
}
