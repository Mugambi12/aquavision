import "./Sidebar.css";

const Sidebar = ({ toggleView, currentView }) => {
  return (
    <div className="transactions-sidebar">
      <div className="transactions-sidebar-header">
        <span className="material-symbols-rounded header-icon">menu</span>
        <span className="header-text">Menu</span>
      </div>
      <ul>
        <li>
          <button
            className={`d-flex sidebar-button ${
              currentView === "revenue" ? "active" : ""
            }`}
            onClick={() => toggleView("revenue")}
          >
            <span className="material-symbols-rounded icon">attach_money</span>
            <span>Revenue</span>
          </button>
        </li>
        <li>
          <button
            className={`d-flex sidebar-button ${
              currentView === "expenses" ? "active" : ""
            }`}
            onClick={() => toggleView("expenses")}
          >
            <span className="material-symbols-rounded icon">send_money</span>
            <span>Expenses</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
