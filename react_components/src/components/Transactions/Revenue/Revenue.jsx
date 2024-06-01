import "./Revenue.css";

const Revenue = () => {
  return (
    <div id="revenue" class="revenue-container">
      <div class="revenue-header">
        <i class="fas fa-arrow-left"></i>
        <div class="revenue-header-content">
          <div class="revenue-invoice-info">
            <span class="cust-invoice">Customer Invoice</span>
            <span class="heading mt-3">Landing Page Design</span>
            <span class="category mt-2">webdesign</span>
            <span class="company mt-2">Askon Tech Ltd</span>
          </div>
          <div class="progress-section">
            <span class="mb-3 label">Progress</span>
            <div class="progress"></div>
          </div>
          <div class="members-section">
            <span class="mb-3 label">Members</span>
            <div class="members">
              <div class="member red">ZS</div>
              <div class="member blue">XM</div>
              <div class="member purple">HW</div>
              <div class="member add">
                <i class="fas fa-plus"></i>
              </div>
            </div>
          </div>
        </div>
        <i class="fas fa-ellipsis-h"></i>
      </div>

      <div class="menu">
        <span class="active">All</span>
        <span>Unpaid</span>
        <span>Paid</span>
      </div>

      <div class="table-container">
        <table class="invoice-table">
          <tbody>
            <tr class="invoice-row">
              <td>
                <div class="status unpaid-bg"></div>
              </td>
              <td>
                <div class="date-info">
                  <span class="month">Mar</span>
                  <span class="date">17</span>
                </div>
              </td>
              <td>34534</td>
              <td>Askon Tech Ltd</td>
              <td>Webpage design</td>
              <td>
                <div class="status-text unpaid">UNPAID</div>
              </td>
              <td>
                <div class="amount unpaid">$500</div>
              </td>
              <td>
                <i class="fas fa-ellipsis-h"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="add-invoice-container">
        <div class="add-invoice">
          <i class="fas fa-plus"></i>
          <span class="invoice-label mt-3">Invoice</span>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
