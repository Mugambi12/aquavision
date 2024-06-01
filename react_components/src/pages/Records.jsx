import Navbar from "../components/Navbar/Navbar";
import Invoices from "../components/Invoices/Invoices";
import Footer from "../components/Footer/Footer";

const Records = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Invoices />
      </div>
      <Footer />
    </>
  );
};

export default Records;
