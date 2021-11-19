let storage = localStorage;
function AddCart() {
  let addCart = document.querySelectorAll(".cart");
  addCart.addEventListener("click", (e) => {
    let productInfo = document.querySelector(`#${e.target.id} input`).value;
    alert("value");
  });
}

window.addEventListener("load", AddCart);
