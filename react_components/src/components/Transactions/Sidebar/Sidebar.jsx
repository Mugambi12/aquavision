import "./Sidebar.css";

const Sidebar = ({ toggleView }) => {
  return (
    <div className="transactions-sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <button className="d-flex" onClick={() => toggleView("revenue")}>
            <span className="material-symbols-rounded icon">attach_money</span>
            <span>Revenue</span>
          </button>
        </li>
        <li>
          <button className="d-flex" onClick={() => toggleView("expenses")}>
            <span className="material-symbols-rounded icon">send_money</span>
            <span>Expenses</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
