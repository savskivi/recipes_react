import React from "react";
import st from "./RecipeCategory.module.scss";
import RecipeCard from "../recipe-card/RecipeCard";
import { RecipeT } from "../../types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  title: string;
  list: RecipeT[];
  isFavorite: (id: number) => RecipeT | null;
  toggleFavorite: (recipe: RecipeT) => void;
  loading: boolean;
  error: string | null;
};

export default function RecipeCategory({
  title,
  list,
  isFavorite,
  toggleFavorite,
  loading,
  error,
}: Props) {
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton
      style={{ height: "390px", width: "267px", borderRadius: "24px" }}
      key={index}
    />
  ));

  const recipes = list.map((item) => (
    <RecipeCard
      isFavorite={isFavorite}
      toggleFavorite={toggleFavorite}
      key={item.id}
      item={item}
    />
  ));

  if (error) {
    return (
      <div className={st.root}>
        <div className={st.title__container}>
          <h2 className={st.recipes__title}>{error}</h2>
        </div>
      </div>
    );
  }
  return (
    <div className={st.root}>
      <div className={st.title__container}>
        <h2 className={st.recipes__title}>{title}</h2>
      </div>
      <div className={st.recipes__container}>
        <div className={st.recipes__list}>{loading ? skeletons : recipes}</div>
      </div>
    </div>
  );
}
