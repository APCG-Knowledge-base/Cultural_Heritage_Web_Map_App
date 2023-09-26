import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import classes from "./AuthForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { buttonsActions } from "../store/index.js";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") == "login";
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isloggedin = useSelector((state) => state.isloggedin);
  const navigate = useNavigate();

  const gohomepage = () => {
    console.log("this is the login status: ", isloggedin);
    navigate("/");
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faArrowLeft}
        size="2x"
        className={classes.gobackbtn}
        onClick={gohomepage}
      />
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Sign up"}</h1>
        {data && data.errors && (
          <ul className={classes.errorList}>
            {Object.values(data.errors).map((err) => (
              <li className={classes.errorItem} key={err}>
                {err}
              </li>
            ))}
          </ul>
        )}
        {data && data.message && (
          <p className={classes.successMessage}>{data.message}</p>
        )}
        {!isLogin && (
          <>
            <p>
              <label htmlFor="name">Name</label>
              <input id="name" type="name" name="name" required />
            </p>
            <p>
              <label htmlFor="Organization">Organization</label>
              <input
                id="Organization"
                type="Organization"
                name="Organization"
                required
              />
            </p>
          </>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {!isLogin && (
          <p>
            <label htmlFor="image">Repeat Password</label>
            <input id="password" type="password" name="password" required />
          </p>
        )}
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Sign up" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
