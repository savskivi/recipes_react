import st from "./RecipeCard.module.scss";
import like__icon from "../../assets/like_icon.svg";
import comment__icon from "../../assets/comment_icon.svg";
import rating__icon from "../../assets/rating_icon.svg";
import likeFill__icon from "../../assets/fillLike_icon.svg";
import { RecipeT } from "../../types";
import { useNavigate } from "react-router";

type Props = {
  item: RecipeT;
  isFavorite: (id: number) => RecipeT | null;
  toggleFavorite: (recipe: RecipeT) => void;
};

export default function RecipeCard({
  item,
  isFavorite,
  toggleFavorite,
}: Props) {
  const navigate = useNavigate();
  return (
    <div className={st.root} onClick={() => navigate(`/recipe/${item.id}`)}>
      <img className={st.recipe__photo} src={item.image} alt="" />

      <div className={st.recipe__info}>
        <h3 className={st.recipe__name}>{item.name}</h3>
        <div className={st.tags__container}>
          {item.tags.map((tag, index) => (
            <span className={st.recipe__tag} key={index}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className={st.recipe__icons} onClick={(e) => e.stopPropagation()}>
        <div
          className={st.recipe__icon}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item);
          }}
        >
          {isFavorite(item.id) ? (
            <img className={st.likeFill__icon} src={likeFill__icon} alt="" />
          ) : (
            <img src={like__icon} alt="" />
          )}
        </div>

        <div className={st.recipe__icon}>
          <img src={comment__icon} alt="" />
          <span>{item.reviewCount}</span>
        </div>

        <div className={st.recipe__icon}>
          <img src={rating__icon} alt="" />
          <span>{item.rating}</span>
        </div>
      </div>
    </div>
  );
}
