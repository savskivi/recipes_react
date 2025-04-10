import React, { useEffect, useState } from "react";
import st from "./Meal.module.scss";
import RecipeCategory from "../../components/recipe-category/RecipeCategory";
import { useParams } from "react-router";
import axiosInstance from "../../axiosinstance";
import { RecipeT } from "../../types";

type Props = {
  isFavorite: (id: number) => RecipeT | null;
  toggleFavorite: (recipe: RecipeT) => void;
};

export default function Meal({ isFavorite, toggleFavorite }: Props) {
  const { name } = useParams();

  const [mealRecipes, setMealRecipes] = useState<RecipeT[]>([]);
  const [mealLoading, setMealLoading] = useState<boolean>(false);
  const [mealError, setMealError] = useState<string | null>(null);

  useEffect(() => {
    setMealLoading(true);

    axiosInstance
      .get(`recipes/meal-type/${name}`)
      .then((res) => {
        console.log(res);
        setMealRecipes(res.data.recipes);
        setMealError(null);
      })
      .catch(() => {
        setMealError("Server Error");
      })
      .finally(() => {
        setMealLoading(false);
      });
  }, []);

  return (
    <div className={st.root}>
      <RecipeCategory
        loading={mealLoading}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        title={name || ""}
        list={mealRecipes}
        error={mealError}
      />
    </div>
  );
}
