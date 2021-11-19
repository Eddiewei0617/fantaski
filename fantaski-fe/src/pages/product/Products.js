// 頁面通用元件
import { useState, useEffect, useRef } from "react";
import "animate.css";
import { getMemberPoints } from "../../components/orders/ModuleDb";
import axios from "axios";
import { API_URL } from "../../config/url";

// 渲染兩種不同版面元件
import ProductSquare from "../../components/products/ProductSquare";
import ProductList from "../../components/products/ProductList";

// 組合用元件
import CarouselP from "../../components/products/CarouselP";
import ScrolldownIcon from "../../components/products/ScrolldownIcon";
import SwitchIcon from "../../components/products/SwitchIcon";
import NavSide from "../../components/products/NavSide";

function Products({ setItemNumber, itemNumber }) {
  const [square, setSquare] = useState(true);

  // 做收藏標籤的點擊變換 start------------------------------
  const [toggleState, setToggleState] = useState({});
  //點擊後切換目標id的狀態false <-> true
  const clickToChangeToggle = (e) => {
    console.log("e", e.currentTarget.id);
    let targetId = e.currentTarget.id;
    let oppositeState = !toggleState[targetId];
    let newState = { ...toggleState, [targetId]: oppositeState };
    setToggleState(newState);
  };
  // 做收藏標籤的點擊變換 end------------------------------

  // 用一個ref抓到要跳轉到的位置區塊，再寫一個function scrollTo
  // 點小手指跳到商品主頁
  const productSection = useRef(null);
  const scrollToProduct = () =>
    window.scrollTo({
      top: Number(`${productSection.current.offsetTop}`) - 150,
      behavior: "smooth",
    });

  // 商品種類狀態，有1~8，預設為1(單板)
  const [categoryId, setCategoryId] = useState(1);

  const [memberInfo, setMemberInfo] = useState(null);
  useEffect(() => {
    getMemberPoints(setMemberInfo);
  }, []);
  // console.log("memberInfo", memberInfo);

  // 接收後端傳來的product_collection資料
  const [collected, setCollected] = useState([]);
  const [collectUpdate, setCollectUpdate] = useState(0); // 此狀態是為了讓之後商品點收藏後每次都會重抓一次
  useEffect(async () => {
    try {
      let res = await axios.post(`${API_URL}/products/collectinfo`, {
        memberID: 1,
      });
      setCollected(res.data);
    } catch (e) {
      console.error("collectinfo", e);
    }
  }, [collectUpdate]);
  // console.log("collected", collected);

  return (
    <>
      <CarouselP />
      <ScrolldownIcon
        onClick={() => {
          scrollToProduct();
        }}
      />
      <SwitchIcon setSquare={setSquare} square={square} />

      <div className="d-flex main_area" ref={productSection}>
        <NavSide setCategoryId={setCategoryId} />
        {square ? (
          <ProductSquare
            clickToChangeToggle={clickToChangeToggle}
            setToggleState={setToggleState}
            toggleState={toggleState}
            setItemNumber={setItemNumber}
            itemNumber={itemNumber}
            categoryId={categoryId}
            memberInfo={memberInfo}
            collected={collected}
            setCollectUpdate={setCollectUpdate}
          />
        ) : (
          <ProductList
            clickToChangeToggle={clickToChangeToggle}
            setToggleState={setToggleState}
            toggleState={toggleState}
            setItemNumber={setItemNumber}
            itemNumber={itemNumber}
            onClick={() => {
              scrollToProduct();
            }}
            categoryId={categoryId}
          />
        )}
      </div>
    </>
  );
}
export default Products;
