import st from "./Recipe.module.scss";
import bolt__icon from "../../assets/bolt_icon.svg";
import cuisine__icon from "../../assets/cuisine_icon.svg";
import timer__icon from "../../assets/timer_icon.svg";
import cook__icon from "../../assets/cook_icon.svg";
import servings__icon from "../../assets/servings_icon.svg";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { RecipeT } from "../../types";
import axiosInstance from "../../axiosinstance";
import Skeleton from "react-loading-skeleton";

export default function Recipe() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState<RecipeT>({
    id: 0,
    name: "",
    ingredients: [""],
    instructions: [""],
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
    servings: 0,
    difficulty: "",
    cuisine: "",
    caloriesPerServing: 0,
    tags: [""],
    userId: 0,
    image: "",
    rating: 0,
    reviewCount: 0,
    mealType: [""],
  });
  const [recipeLoading, setRecipeLoading] = useState<boolean>(false);
  const [recipeError, setRecipeError] = useState<string | null>(null);

  useEffect(() => {
    setRecipeLoading(true);
    axiosInstance
      .get(`/recipes/${id}`)
      .then((res) => {
        console.log(res);
        setRecipe(res.data);
        setRecipeError(null);
      })
      .catch(() => {
        setRecipeError("Server Error");
      })
      .finally(() => setRecipeLoading(false));
  }, []);

  if (recipeError) {
    return (
      <div className={st.root}>
        <h1 className={st.recipe__error}>{recipeError}</h1>
      </div>
    );
  }

  return (
    <div className={st.root}>
      <div className={st.name__container}>
        <h1 className={st.recipe__name}>{recipe.name || <Skeleton />}</h1>
      </div>

      <div className={st.tags__container}>
        {recipeLoading ? (
          <>
            <Skeleton
              style={{ width: "60px", borderRadius: "1000px", height: "30px" }}
            />
            <Skeleton
              style={{ width: "60px", borderRadius: "1000px", height: "30px" }}
            />
          </>
        ) : (
          recipe.tags.map((tag, index) => (
            <span className={st.recipe__tag} key={index}>
              {tag}
            </span>
          ))
        )}
      </div>

      <div className={st.info__container}>
        <div className={st.difficulty__container}>
          <img src={bolt__icon} alt="bolt icon" />
          <p className={st.difficulty}>
            {recipe.difficulty || <Skeleton style={{ width: "60px" }} />}
          </p>
        </div>

        <div className={st.cuisine__container}>
          <img src={cuisine__icon} alt="cuisine icon" />
          <p className={st.cuisine}>
            {recipe.cuisine || <Skeleton style={{ width: "60px" }} />}
          </p>
        </div>
      </div>

      <div className={st.photo__container}>
        {recipeLoading ? (
          <Skeleton
            containerClassName={st.skeleton__container}
            style={{ height: "428px", width: "100%", borderRadius: "24px" }}
          />
        ) : (
          <img
            className={st.recipe__photo}
            src={recipe.image}
            alt="dish photo"
          />
        )}
      </div>

      <h2>Details</h2>
      <ul className={st.details__list}>
        <li className={st.prep__time}>
          {" "}
          <img src={timer__icon} alt="timer icon" /> Prep time:
          {recipe.prepTimeMinutes}
        </li>
        <li className={st.cook__time}>
          {" "}
          <img src={cook__icon} alt="cook icon" /> Cook time:
          {recipe.cookTimeMinutes}
        </li>
        <li className={st.servings}>
          {" "}
          <img src={servings__icon} alt="servings icon" /> Servings:
          {recipe.servings}
        </li>
      </ul>

      <h2>Ingredients</h2>
      <ul className={st.ingredients__list}>
        {recipe.ingredients.map((ingridient, index) => (
          <li className={st.ingredient} key={index}>
            {ingridient}
          </li>
        ))}
      </ul>

      <h2>Directions</h2>
      <ol className={st.instructions__list}>
        {recipe.instructions.map((instruction, index) => (
          <li className={st.instruction__step} key={index}>
            {instruction}
          </li>
        ))}
      </ol>
    </div>
  );
}
