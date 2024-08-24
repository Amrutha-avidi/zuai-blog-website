import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <>
       <Navbar />
      <Toaster position="bottom left" toastOptions={{ duration: 3000 }} />
      <Outlet  /> {/* This will render the child routes */}
    </>
  );
};

export default Layout;
