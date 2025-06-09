import { CurrencyFormatter } from "../util/formatter";
import { useContext } from "react";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = () => {
    cartCtx.addItem(meal);
  };
  // Determine the image URL based on environment
  const imageUrl = import.meta.env.PROD
    ? `https://web-production-fbd2a.up.railway.app/${meal.image}`
    : `http://localhost:3000/${meal.image}`;
    
  return (
    <li className="meal-item">
      <article>
        <img src={imageUrl} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {CurrencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <div className="meal-item-actions">
          <Button onClick={addToCartHandler}>Add to Cart</Button>
        </div>
      </article>
    </li>
  );
}
