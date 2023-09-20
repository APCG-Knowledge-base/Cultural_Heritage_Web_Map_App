import AuthForm from "../components/AuthForm";
import { json, redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { buttonsActions } from "../store/index.js";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

//fucntion will be triggered whenever the form in AuthForm component is submited!
export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode != "login" && mode != "signup") {
    throw json({ message: "Invalid input" }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status == 422 || response.status == 401) {
    localStorage.setItem("userName", "No");
    return response;
  }

  if (!response.ok) {
    localStorage.setItem("userName", "No");
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem("token", token);
  localStorage.setItem("userName", authData.email);

  return redirect("/");
}
