import { useCallback, useEffect, useState } from "react";
import st from "./Categories.module.scss";
import axiosInstance from "../../axiosinstance";
import searchIcon from "../../assets/search.svg";
import RecipeCategory from "../../components/recipe-category/RecipeCategory";
import { RecipeT } from "../../types";
import { debounce } from "lodash";
import { recipesPerPage, sortValues } from "../../constants";
import ReactPaginate from "react-paginate";

type Props = {
  isFavorite: (id: number) => RecipeT | null;
  toggleFavorite: (recipe: RecipeT) => void;
};

export default function Categories({ isFavorite, toggleFavorite }: Props) {
  const [tags, setTags] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<RecipeT[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [sortId, setSortId] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const [recipesLoading, setRecipesLoading] = useState<boolean>(false);
  const [recipesError, setRecipesError] = useState<string | null>(null);

  const selectedSort = sortValues.find((item) => item.id === sortId);
  const pageCount = Math.ceil(total / limit);

  const handlePageClick = (event: {selected: number}) => {
    const newOffset = (event.selected * limit) % total;
    setSkip(newOffset);
  };

  const handleSearch = useCallback(
    debounce((searchValue: string) => {
      setSearch(searchValue);
    }, 500),
    []
  );

  useEffect(() => {
    axiosInstance.get("/recipes/tags").then((res) => {
      console.log(res);
      setTags(res.data);
    });
  }, []);

  useEffect(() => {
    setRecipesLoading(true);

    let path = "/recipes";
    if (selectedCategory && !search) {
      path += `/tag/${selectedCategory}?`;
    } else if (search) {
      path += `/search?q=${search}&`;
    }
    if (!search) {
      path += `?sortBy=${selectedSort?.sortBy}&order=${selectedSort?.order}&`;
    }

    path += `limit=${limit}&skip=${skip}`;

    axiosInstance
      .get(path)
      .then((res) => {
        setRecipesError(null);
        setRecipes(res.data.recipes);
        setTotal(res.data.total);

      })
      .catch(() => {
        setRecipesError("Server Error");
      })
      .finally(() => {
        setRecipesLoading(false);
      });
  }, [selectedCategory, search, selectedSort, limit, skip]);

  return (
    <div className={st.root}>
      <div className={st.wrap}>
        <div className={st.title__wrap}>
          <h1 className={st.title}>Categories</h1>
        </div>

        <div className={st.filter__container}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={st.select__container}
          >
            <option value="">All</option>
            {tags.map((tag, index) => {
              return (
                <option value={tag} key={index}>
                  {tag}
                </option>
              );
            })}
          </select>

          <div className={st.search__container}>
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                handleSearch(e.target.value);
              }}
              type="text"
              placeholder="Search recipe..."
              className={st.search__input}
            />
            <img
              className={st.search__icon}
              src={searchIcon}
              alt="search icon"
            />
          </div>
        </div>

        <div className={st.sortby__container}>
          <h3>Sort by</h3>

          <select
            className={st.select__container}
            value={sortId}
            onChange={(e) => setSortId(+e.target.value)}
          >
            {sortValues.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}{" "}
                {item.order === "asc" ? (
                  <span>&#8593;</span>
                ) : (
                  <span>&#8595;</span>
                )}
              </option>
            ))}
          </select>
        </div>

        <div className={st.perPage__container}>
          <h3>Show recipes per page</h3>

          <div className={st.checkboxes__container}>
            {recipesPerPage.map((perPage) => (
              <div className={st.radio__container} key={perPage.id}>
                <input
                  value={perPage.value}
                  checked={perPage.value === limit}
                  id={`${perPage.id}-radio`}
                  onChange={(e) => setLimit(+e.target.value)}
                  type="radio"
                  name="perPage"
                />
                <label htmlFor={`${perPage.id}-radio`}>{perPage.value}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RecipeCategory
        loading={recipesLoading}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        title={selectedCategory}
        list={recipes}
        error={recipesError}
      />

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className={st.pagination}
        activeClassName={st.pagination__active}
      />
    </div>
  );
}
