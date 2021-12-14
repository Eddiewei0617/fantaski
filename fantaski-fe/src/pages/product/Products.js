// 頁面通用元件
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "animate.css";
import axios from "axios";
import Swal from "sweetalert2";

// 網址整合元件
import { API_URL } from "../../config/url";
import { PRODUCTIMAGE_URL } from "../../config/url";

// 渲染兩種不同版面元件
import ProductSquare from "../../components/products/ProductSquare";
import ProductList from "../../components/products/ProductList";

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
  userInfo,
  categoryId,
  setCategoryId,
}) {
  // 想要傳參數給後端新增或找資料 :
  // axios.post(“url”, params, {withCredential:true})
  // params就是{categoryId: category_id} 之類的參數
  // ----------------------------------------------------------------------------
  const [square, setSquare] = useState(true);

  // console.log("userInfo", userInfo);
  // 用一個ref抓到要跳轉到的位置區塊，再寫一個function scrollTo
  // 點小手指跳到商品主頁
  const productSection = useRef(null);
  const scrollToProduct = () =>
    window.scrollTo({
      top: Number(`${productSection.current.offsetTop}`) - 150,
      behavior: "smooth",
    });

  // 接收後端傳來的 product_collection 資料
  const [collected, setCollected] = useState([]);
  const [collectUpdate, setCollectUpdate] = useState(0); // 此狀態是為了讓之後商品點收藏後每次都會重抓一次

  // 抓資料庫該會員的收藏資料，就可以顯示在他登入後的商品頁面上了
  useEffect(async () => {
    try {
      let res = await axios.get(`${API_URL}/products/collectinfo`, {
        withCredentials: true,
      });
      setCollected(res.data);
      console.log("collected", collected);
    } catch (e) {
      console.error("collectinfo", e);
    }
  }, [collectUpdate, userInfo]);

  // 傳點到想收藏的資料給後端  // 註: 給一個v變數是因為丟到下面map迴圈裡也需要用到v，所以先在這邊加
  // 因為傳給後端後同時有刪除也有insert，所以要一個判斷是判斷我點的這個商品是不是已經在product_collection裡面出現過了
  async function handleCollect(v) {
    if (userInfo.code !== 1201) {
      let isDelete = false;
      collected.forEach((item, index) => {
        if (v.id === item.product_id) {
          isDelete = true;
        }
      });
      setCollectUpdate(Math.random());
      try {
        let res = await axios.post(
          `${API_URL}/products/collection`,
          {
            isDelete: isDelete,
            // memberId: userInfo.id,
            productId: v.id,
          },
          { withCredentials: true }
        );
      } catch (err) {
        console.error("handleCollect", err);
      }
    }
  }

  let history = useHistory();
  // 點擊加入收藏後會有彈跳視窗
  async function handleChecked() {
    if (userInfo.code !== 1201) {
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
    } else {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "請先登入會員",
        showConfirmButton: false,
        timer: 1500,
      });
      let toLogin = history.push("/login");
    }
  }

  // 已加入購物車之彈跳視窗
  function alreadyinCart() {
    Swal.fire({
      // title: "Sweet!",
      text: "您已將此商品加入購物車",
      imageUrl: `${PRODUCTIMAGE_URL}/jerry_mouse.jpg`,
      imageWidth: 220,
      imageHeight: 300,
      imageAlt: "已加入購物車圖",
      icon: "error",
    });
  }

  return (
    <>
      <section className="product-ski-area">
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
              userInfo={userInfo}
              alreadyinCart={alreadyinCart}
            />
          ) : (
            <ProductList
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
        </div>
      </section>
    </>
  );
}
export default Products;
