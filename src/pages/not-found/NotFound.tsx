import st from "./NotFound.module.scss";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className={st.root}>
      <h1>Page Not Found</h1>
      <Link className={st.link} to={"/"}>
        Go to home page
      </Link>
    </div>
  );
}
