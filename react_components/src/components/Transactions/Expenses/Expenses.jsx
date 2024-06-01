import "./Expenses.css";

const Expenses = () => {
  return (
    <div id="expenses" className="expenses-section">
      <h2>Expenses</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-05-30</td>
            <td>$200</td>
            <td>Office Supplies</td>
          </tr>
          <tr>
            <td>2024-05-29</td>
            <td>$100</td>
            <td>Transport</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;
