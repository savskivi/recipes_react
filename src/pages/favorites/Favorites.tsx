import st from "./Favorites.module.scss";
import { RecipeT } from "../../types";
import RecipeCategory from "../../components/recipe-category/RecipeCategory";

type Props = {
  isFavorite: (id: number) => RecipeT | null;
  toggleFavorite: (recipe: RecipeT) => void;
  favorites: RecipeT[];
};

export default function Favorites({isFavorite, toggleFavorite, favorites}: Props) {


  return <div className={st.root}>
          <RecipeCategory error={null} loading={false} isFavorite = {isFavorite} toggleFavorite = {toggleFavorite} title="Favorite Recipes" list={favorites} />
  </div>;
}
