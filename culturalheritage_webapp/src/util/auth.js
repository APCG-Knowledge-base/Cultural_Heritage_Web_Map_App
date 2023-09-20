import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function checkAuthNamestorageLoader() {
  const username = localStorage.getItem("userName");
  if (!username || username == "No") {
    return redirect("/auth?mode=login");
  }
  return null;
}
export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=login");
  }
  return null;
}
