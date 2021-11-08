import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useState } from "react";
// 頁面用元件
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Skill from "./pages/course/Skill";
import Beginner from "./pages/course/Beginner";
import Sled from "./pages/course/Sled";
import Igloo from "./pages/course/Igloo";
import Member from "./pages/Member"
// 組合用元件
import ScrollToTop from "./components/ScrollToTop";

const courses = ["初體驗", "技能班", "雪橇車", "建冰屋"];

function App() {
  //傳入course狀態(使用者要看哪個course)
  const [showCourse, setShowCourse] = useState();

  return (
      <>
    <Router>
        {/* LOGO+標題+導覽列+上方選單 */}
        {/* 主內容區 */}
        {/* 匹配路由表(路徑單一匹配) */}
        {/* 切換顯示的元件畫面放在這下面 */}
        {/* ScrollToTop是為了讓連到另一頁內容時，頁面回到最上方 */}
        暫時代替navbar <br />
        <Link to="/Products">到產品</Link>&nbsp;<Link to="/Orders">到訂單</Link>
        &nbsp;
        <Link
          to="/course/beginner"
          onClick={() => {
            setShowCourse(courses[0]);
          }}
        >        
          到課程-初體驗
        </Link>
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
            <Route path="/Member">
              <Member />
            </Route>
          </Switch>
          {/* end 匹配路由表 */}
        </ScrollToTop>
        {/* 頁尾+版權訊息 */}
    </Router>
      </>
  );
}

export default App;