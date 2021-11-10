<<<<<<< HEAD
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MountainRoute from "./pages/MountainRoute";
import Member from "./pages/Member";
function App() {
  return (
    <Router>
      <>
        <Link to="/MountainRoute"></Link>
        <Link to="/Member"></Link>
        <Switch>
          <Route path="/MountainRoute">
            <MountainRoute />
          </Route>
          <Route path="/Member">
            <Member />
          </Route>
        </Switch>
      </>
    </Router>
=======
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useState } from "react";

// 引入各分頁(後續寫程式可更動) 頁面用元件
// 課程
import Skill from "./pages/course/Skill";
import Beginner from "./pages/course/Beginner";
import Sled from "./pages/course/Sled";
import Igloo from "./pages/course/Igloo";
import CommentsInMember from "./components/course/commentsinMember/CommentsInMember";
// 商品
import Products from "./pages/product/Products";
import Orders from "./pages/order/Orders";
import Home from "./pages/Home";
// import MountainRoute from "./pages/MountainRoute";
import Forum from "./pages/Forum";
import Member from "./pages/Member";
import Login from "./pages/Login";

// footer 相關連結
// import Aboutus from "./pages/footer/Aboutus";
// import Joinus from "./pages/footer/Joinus";
// import Terms from "./pages/footer/Terms";
// import Servicepolicy from "./pages/footer/Servicepolicy";
// import Privacy from "./pages/footer/Privacy";

// ===========================================

// 組合用元件
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/share/Navbar";
import Footer from "./components/share/Footer";
import Gotop from "./components/share/Gotop";

const courses = ["初體驗", "技能班", "雪橇車", "建冰屋"];

function App() {
  //傳入course狀態(使用者要看哪個course)
  const [showCourse, setShowCourse] = useState();

  return (
    <>
      <Router>
        <Navbar courses={courses} setShowCourse={setShowCourse} />
        {/* LOGO+標題+導覽列+上方選單 */}
        {/* 主內容區 */}
        {/* 匹配路由表(路徑單一匹配) */}
        {/* 切換顯示的元件畫面放在這下面 */}
        {/* ScrollToTop是為了讓連到另一頁內容時，頁面回到最上方 */}
        {/* 暫時代替navbar <br /> */}
        <Link to="/Products">到產品</Link>&nbsp;
        <Link to="/Orders">到訂單</Link>&nbsp;
        <Link to="/course/commentsinmemer">我的點評</Link>&nbsp;
        <Link
          to="/course/beginner"
          onClick={() => {
            setShowCourse(courses[0]);
          }}
        >
          到課程-初體驗
        </Link>
        &nbsp;
        <Link to="/Member">到會員</Link>
        <ScrollToTop>
          <Switch>
            <Route path="/course/beginner">
              <Beginner
                courses={courses}
                showCourse={showCourse}
                setShowCourse={setShowCourse}
              />
            </Route>
            <Route path="/course/commentsinmemer">
              <CommentsInMember setShowCourse={setShowCourse} />
            </Route>
            <Route path="/course/beginner">
              <Beginner
                courses={courses}
                showCourse={showCourse}
                setShowCourse={setShowCourse}
              />
            </Route>
            <Route path="/course/skill">
              <Skill
                courses={courses}
                showCourse={showCourse}
                setShowCourse={setShowCourse}
              />
            </Route>
            <Route path="/course/sled">
              <Sled
                courses={courses}
                showCourse={showCourse}
                setShowCourse={setShowCourse}
              />
            </Route>
            <Route path="/course/igloo">
              <Igloo
                courses={courses}
                showCourse={showCourse}
                setShowCourse={setShowCourse}
              />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/Orders">
              <Orders />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/member">
              <Member />
            </Route>
            <Route path="/forum">
              <Forum />
            </Route>
            {/* <Route path="/mountainroute">
              <MountainRoute />
            </Route> */}
            <Route path="/">
              <Home />
            </Route>

            {/* footer有時間在處理 勿刪!!*/}
            {/* <Route path="/privacy" exact>
              <Privacy />
            </Route>
            <Route path="/servicepolicy" exact>
              <Servicepolicy />
            </Route>
            <Route path="/terms" exact>
              <Terms />
            </Route>
            <Route path="/joinus" exact>
              <Joinus />
            </Route>
            <Route path="/aboutus" exact>
              <Aboutus />
            </Route> */}
          </Switch>
          {/* end 匹配路由表 */}
        </ScrollToTop>
        <Gotop />
        <Footer />
        {/* 頁尾+版權訊息 */}
      </Router>
    </>
>>>>>>> 502df75d6741450fbd30ffb49e3a93cb9fd3eb16
  );
}

export default App;
