import { CurrencyFormatter } from "../util/formatter";
export default function CartItem({ name, quantity, price , onIncrease, onDecrease }) {
  return (
    <div className="cart-item">
      <p>
        `{name}` - `{quantity}` x `{CurrencyFormatter.format(price)}`
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </div>
  );
}
