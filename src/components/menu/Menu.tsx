import st from "./Menu.module.scss";
import logo from "../../assets/logo.svg";
import { Link, NavLink } from "react-router";

export default function Menu() {
  return (
    <div className={st.root}>
      <header>
        <Link to={"/"}>
          <div className={st.logo}>
            <img src={logo} alt="logo" />
            <span className={st.logo__name}>Freshly</span>
          </div>
        </Link>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? st.header__link_active : st.header__link
            }
          >
            Recipes
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? st.header__link_active : st.header__link
            }
          >
            Categories
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? st.header__link_active : st.header__link
            }
          >
            Favorites
          </NavLink>
        </nav>
      </header>
    </div>
  );
}
