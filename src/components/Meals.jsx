import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

const requestConfig = {};

export default function Meals() {
  const {
    data: meals,
    isLoading,
    error: httpError,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  return (
    <ul>
      {isLoading && (
        <section>
          <p>Loading...</p>
        </section>
      )}
      {!isLoading && httpError && (
        <section>
          <p>{httpError}</p>
        </section>
      )}
      {!isLoading && !httpError && meals.length > 0 && (
        <section id="meals">
          {meals.map((meal) => (
            <MealItem key={meal.id} meal={meal} />
          ))}
        </section>
      )}
      {!isLoading && !httpError && meals.length === 0 && (
        <section>
          <p>No meals found.</p>
        </section>
      )}
    </ul>
  );
}
