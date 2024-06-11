import "./Footer.css";

const Footer = () => {
  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="container row">
          <ul className="footer-list">
            <li className="footer-item">
              <a href="#" className="footer-link">
                About
              </a>
            </li>
            <li className="footer-item">
              <a href="#" className="footer-link">
                Privacy
              </a>
            </li>
            <li className="footer-item">
              <a href="#" className="footer-link">
                Terms
              </a>
            </li>
            <li className="footer-item">
              <a href="#" className="footer-link">
                Developers
              </a>
            </li>
            <li className="footer-item">
              <a href="#" className="footer-link">
                Support
              </a>
            </li>
          </ul>

          <p className="copyright">
            &copy; {currentYear}{" "}
            <a href="#!" className="copyright-link">
              ApoGen
            </a>
            . All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
