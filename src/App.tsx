import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Recipe from "./pages/recipe/Recipe";
import Menu from "./components/menu/Menu";
import Categories from "./pages/categories/Categories";
import Meal from "./pages/meal/Meal";
import { useEffect, useState } from "react";
import { RecipeT } from "./types";
import Favorites from "./pages/favorites/Favorites";

function App() {
  const [favorites, setFavorites] = useState<RecipeT[]>(getFavorites());

  useEffect(() => {
    saveFavorites();
  }, [favorites]);

  function isFavorite(id: number) {
    return favorites.find((item) => item.id === id) || null;
  }

  function toggleFavorite(recipe: RecipeT) {
    if (isFavorite(recipe.id)) {
      setFavorites((prev) => prev.filter((item) => item.id !== recipe.id));
    } else {
      setFavorites((prev) => [...prev, recipe]);
    }
  }

  function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  function getFavorites(): RecipeT[] {
    const saveFavorites = localStorage.getItem("favorites");
    if (saveFavorites) {
      return JSON.parse(saveFavorites);
    }
    return [];
  }

  return (
    <>
      <Menu />
      <Routes>
        <Route
          path="/"
          element={
            <Home isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
          }
        />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route
          path="/categories"
          element={
            <Categories
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/meal/:name"
          element={
            <Meal isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          }
        />

        {/* <Route path="/recipes_react" element={<Navigate to={"/"} />} />

        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
