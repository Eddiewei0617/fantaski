// 頁面通用元件
import { useState, useEffect, useRef } from "react";

import "animate.css";
import { getMemberPoints } from "../../components/orders/ModuleDb";
import axios from "axios";
import { API_URL } from "../../config/url";
import Swal from "sweetalert2";

// 渲染兩種不同版面元件
import ProductSquare from "../../components/products/ProductSquare";
import ProductList from "../../components/products/ProductList";
// import AllProducts from "../../components/products/AllProducts";

// 組合用元件
import CarouselP from "../../components/products/CarouselP";
import ScrolldownIcon from "../../components/products/ScrolldownIcon";
import SwitchIcon from "../../components/products/SwitchIcon";
import NavSide from "../../components/products/NavSide";

function Products({
  setItemNumber,
  itemNumber,
  memberInfo,
  cartPositionState,
  handleAddNumber,
}) {
  let storage = localStorage;
  const [square, setSquare] = useState(true);

  // 做收藏標籤的點擊變換 start------------------------------
  const [toggleState, setToggleState] = useState({});
  //點擊後切換目標id的狀態false <-> true
  // const clickToChangeToggle = (e) => {
  //   console.log("e", e.currentTarget.id);
  //   let targetId = e.currentTarget.id;
  //   let oppositeState = !toggleState[targetId];
  //   let newState = { ...toggleState, [targetId]: oppositeState };
  //   setToggleState(newState);
  // };
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

  // // 抓到storage裡面有幾樣商品的字串後，用split將字串轉成陣列就能顯示出有幾個了
  // function handleAddNumber() {
  //   let itemString = storage["addItemList"];
  //   let items = itemString.substr(0, itemString.length - 2).split(", ");
  //   setItemNumber(Number(items.length));
  // }

  // 接收後端傳來的 product_collection 資料
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

  // 傳點到想收藏的資料給後端  // 註: 給一個v變數是因為丟到下面map迴圈裡也需要用到v，所以先在這邊加
  // 因為傳給後端後同時有刪除也有insert，所以要一個判斷是判斷我點的這個商品是不是已經在product_collection裡面出現過了
  async function handleCollect(v) {
    let isDelete = false;
    collected.forEach((item, index) => {
      if (v.id === item.product_id) {
        isDelete = true;
      }
    });
    setCollectUpdate(Math.random());
    try {
      let res = await axios.post(`${API_URL}/products/collection`, {
        isDelete: isDelete,
        memberId: memberInfo[0].id,
        productId: v.id,
      });
    } catch (err) {
      console.error("handleCollect", err);
    }
  }

  // 點擊加入收藏後會有彈跳視窗
  function handleChecked() {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        // toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "已加入收藏",
    });
  }

  // const [allState, setAllState] = useState(false);

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
        <NavSide
          setCategoryId={setCategoryId}
          setCollectUpdate={setCollectUpdate}
          collected={collected}
          handleCollect={handleCollect}
          handleChecked={handleChecked}
          handleAddNumber={handleAddNumber}
          setSquare={setSquare}
        />
        {square ? (
          <ProductSquare
            // clickToChangeToggle={clickToChangeToggle}
            setToggleState={setToggleState}
            toggleState={toggleState}
            setItemNumber={setItemNumber}
            itemNumber={itemNumber}
            categoryId={categoryId}
            memberInfo={memberInfo}
            collected={collected}
            setCollectUpdate={setCollectUpdate}
            cartPositionState={cartPositionState}
            handleCollect={handleCollect}
            handleChecked={handleChecked}
            handleAddNumber={handleAddNumber}
          />
        ) : (
          <ProductList
            // clickToChangeToggle={clickToChangeToggle}
            setToggleState={setToggleState}
            toggleState={toggleState}
            setItemNumber={setItemNumber}
            itemNumber={itemNumber}
            onClick={() => {
              scrollToProduct();
            }}
            categoryId={categoryId}
            memberInfo={memberInfo}
            collected={collected}
            setCollectUpdate={setCollectUpdate}
            handleCollect={handleCollect}
            handleChecked={handleChecked}
            handleAddNumber={handleAddNumber}
          />
        )}
        {/* {allState === true && (
          <AllProducts
            allState={allState}
            setAllState={setAllState}
            setToggleState={setToggleState}
            toggleState={toggleState}
            setItemNumber={setItemNumber}
            itemNumber={itemNumber}
            categoryId={categoryId}
            memberInfo={memberInfo}
            collected={collected}
            setCollectUpdate={setCollectUpdate}
            cartPositionState={cartPositionState}
            handleCollect={handleCollect}
            handleChecked={handleChecked}
            handleAddNumber={handleAddNumber}
          />
        )} */}
      </div>
    </>
  );
}
export default Products;
