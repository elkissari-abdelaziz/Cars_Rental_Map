import Header from '../includes/Header/Header';
import Sidebar from '../includes/Sidebar/Sidebar';
import Footer from '../includes/Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;