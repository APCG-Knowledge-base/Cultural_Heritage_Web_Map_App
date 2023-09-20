import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import MainMap from "../components/MainMap";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { buttonsActions } from "../store/index.js";


function RootLayout() {
  // const navigation = useNavigation();
  const tok = localStorage.getItem("token")
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tok) {
      return;
    }
    setTimeout(() => {
      dispatch(buttonsActions.userinfoopen(false));
      dispatch(buttonsActions.logincheck(false));
      localStorage.removeItem('token')
    }, 1*60*60*1000)
  }, [tok]);

  return (
    <>
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
