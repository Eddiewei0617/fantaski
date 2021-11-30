import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      {/* fixed-bottom */}
      <footer className="footer-lg text-center footer-bg">
        <div className="container">
          <section className="footer-main">
            <article className="footer-main-article">
              <h2>歡迎來到FANTA SKI</h2>
              <p>
                給⾃⼰⼀個奇幻夢想的地⽅，任何事情都可能發⽣。
                <br />
                我們為您提供您沒玩過的最新體驗。
                <br />
                在這個充滿歡樂像夢⼀樣的滑雪場!
              </p>
            </article>
          </section>
          <section className="footer-about-us">
            <ul className="list-unstyled">
              <li>
                <Link className="footer-link" to="/aboutus">
                  關於我們
                </Link>
              </li>
              <li className="footer-right-line"></li>
              <li>
                <Link className="footer-link" to="/joinus">
                  加入FANTA SKI
                </Link>
              </li>
              <li className="footer-right-line"></li>
              <li>
                <Link className="footer-link" to="/terms">
                  使用者條款
                </Link>
              </li>
              <li className="footer-right-line"></li>
              <li>
                <Link className="footer-link" to="/servicepolicy">
                  服務契約
                </Link>
              </li>
              <li className="footer-right-line"></li>
              <li>
                <Link className="footer-link" to="/privacy">
                  隱私權政策
                </Link>
              </li>
            </ul>
          </section>
          <hr className="divider" />
          <section className="footer-under-text">
            <p>© 2021 學⽣專題製作</p>
            <small>圖素來源:"Designed by Freepik/pexel/unsplash/Google"</small>
          </section>
        </div>
      </footer>
    </>
  );
}

export default Footer;
