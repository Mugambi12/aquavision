import "./Revenue.css";

const Revenue = () => {
  return (
    <div id="revenue" className="revenue-container">
      <div className="revenue-header">
        <i className="fas fa-arrow-left"></i>
        <div className="revenue-header-content">
          <div className="revenue-invoice-info">
            <span className="cust-invoice">Customer Invoice</span>
            <span className="heading mt-3">Landing Page Design</span>
            <span className="category mt-2">webdesign</span>
            <span className="company mt-2">Askon Tech Ltd</span>
          </div>
          <div className="progress-section">
            <span className="mb-3 label">Progress</span>
            <div className="progress"></div>
          </div>
          <div className="members-section">
            <span className="mb-3 label">Members</span>
            <div className="members">
              <div className="member red">ZS</div>
              <div className="member blue">XM</div>
              <div className="member purple">HW</div>
              <div className="member add">
                <i className="fas fa-plus"></i>
              </div>
            </div>
          </div>
        </div>
        <i className="fas fa-ellipsis-h"></i>
      </div>

      <div className="menu">
        <span className="active">All</span>
        <span>Unpaid</span>
        <span>Paid</span>
      </div>

      <div className="table-container">
        <table className="invoice-table">
          <tbody>
            <tr className="invoice-row">
              <td>
                <div className="status unpaid-bg"></div>
              </td>
              <td>
                <div className="date-info">
                  <span className="month">Mar</span>
                  <span className="date">17</span>
                </div>
              </td>
              <td>34534</td>
              <td>Askon Tech Ltd</td>
              <td>Webpage design</td>
              <td>
                <div className="status-text unpaid">UNPAID</div>
              </td>
              <td>
                <div className="amount unpaid">$500</div>
              </td>
              <td>
                <i className="fas fa-ellipsis-h"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="add-invoice-container">
        <div className="add-invoice">
          <i className="fas fa-plus"></i>
          <span className="invoice-label mt-3">Invoice</span>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
