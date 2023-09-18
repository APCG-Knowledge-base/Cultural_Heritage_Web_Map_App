import { redirect } from "react-router-dom";

export function checkAuthNamestorageLoader (){
  const username = localStorage.getItem("userName");
  if (!username || username == "No"){
    return redirect("/auth?mode=login")
  }
  return null;
}