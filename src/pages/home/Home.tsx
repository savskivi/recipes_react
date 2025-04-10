import st from "./Home.module.scss";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosinstance";
import RecipeCategory from "../../components/recipe-category/RecipeCategory";
import { RecipeT } from "../../types";
import { mealTypes } from "../../constants";
import { Link } from "react-router";

type Props = {
  isFavorite: (id: number) => RecipeT | null;
  toggleFavorite: (recipe: RecipeT) => void;
};

export default function Home({ isFavorite, toggleFavorite }: Props) {
  const [popularRecipes, setPopularRecipes] = useState<RecipeT[]>([]);
  const [fastRecipes, setFastRecipes] = useState<RecipeT[]>([]);
  const [easyRecipes, setEasyRecipes] = useState<RecipeT[]>([]);
  const [popularRecipesLoading, setPopularRecipesLoading] =
    useState<boolean>(false);
  const [fastRecipesLoading, setFastRecipesLoading] = useState<boolean>(false);
  const [easyRecipesLoading, setEasyRecipesLoading] = useState<boolean>(false);
  const [popularRecipesError, setPopularRecipesError] = useState<string | null>(
    null
  );
  const [fastRecipesError, setFastRecipesError] = useState<string | null>(null);
  const [easyRecipesError, setEasyRecipesError] = useState<string | null>(null);

  useEffect(() => {
    setPopularRecipesLoading(true);
    setFastRecipesLoading(true);
    setEasyRecipesLoading(true);

    axiosInstance
      .get("/recipes?sortBy=rating&order=desc&limit=4")
      .then((res) => {
        console.log(res);
        setPopularRecipesError(null);
        setPopularRecipes(res.data.recipes);
      })
      .catch(() => {
        setPopularRecipesError("Server Error");
      })
      .finally(() => {
        setPopularRecipesLoading(false);
      });

    axiosInstance
      .get("/recipes?sortBy=cookTimeMinutes&order=asc&limit=4")
      .then((res) => {
        console.log(res);
        setFastRecipesError(null);
        setFastRecipes(res.data.recipes);
      })
      .catch(() => {
        setFastRecipesError("Server Error");
      })
      .finally(() => {
        setFastRecipesLoading(false);
      });

    axiosInstance
      .get("/recipes?sortBy=difficulty&order=asc&limit=4")
      .then((res) => {
        console.log(res);
        setEasyRecipesError(null);
        setEasyRecipes(res.data.recipes);
      })
      .catch(() => {
        setEasyRecipesError("Server Error");
      })
      .finally(() => {
        setEasyRecipesLoading(false);
      });
  }, []);

  return (
    <div className={st.root}>
      <RecipeCategory
        loading={popularRecipesLoading}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        title="Popular Recipes"
        list={popularRecipes}
        error={popularRecipesError}
      />

      <h2 className={st.cuisine__title}>Meal Types</h2>

      <div className={st.cuisines__container}>
        <div className={st.cuisines}>
          {mealTypes.map((mealType) => (
            <Link to={`/meal/${mealType.name}`}>
              <div className={st.cuisine__container} key={mealType.id}>
                <img className={st.cuisine__photo} src={mealType.img} />
                <h4 className={st.cuisine__name}>{mealType.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <RecipeCategory
        loading={fastRecipesLoading}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        title="Under 30 Minutes"
        list={fastRecipes}
        error={fastRecipesError}

      />

      <RecipeCategory
        loading={easyRecipesLoading}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        title="Easy Recipes"
        list={easyRecipes}
        error={easyRecipesError}
      />
    </div>
  );
}
