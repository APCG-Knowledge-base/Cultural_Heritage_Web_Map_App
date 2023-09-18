import { Outlet, useNavigation } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import MainMap from '../components/MainMap';

function RootLayout() {
  // const navigation = useNavigation();

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