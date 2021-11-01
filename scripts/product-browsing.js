const cartStatus = document.getElementById("cart-status");
const cartIcon = document.getElementById("cart-image");
const goToCart = document.getElementById("go-to-cart");

window.onload = () => {
  updateCartDisplay();
};

//drawing the cart
const updateCartDisplay = () => {
  const cartList = localStorage.getItem("cart");
  let itemsInCart = 0;
  if (cartList != null) {
    console.log(cartList);
    let cartListArr = cartList.split(" ");
    cartListArr.forEach((product) => {
      if (product.length > 0) {
        itemsInCart = itemsInCart + parseInt(product.substring(3));
      }
    });
  }

  if (itemsInCart > 0) {
    cartStatus.innerHTML = `${itemsInCart} ${
      itemsInCart > 1 ? "items" : "item"
    } in cart`;
    cartStatus.style.color = "rgba(17, 94, 152, 1)";
    cartIcon.src = "./images/cart-full.svg";
    console.log(cartIcon);
    goToCart.style.display = "block";
  } else {
    cartStatus.innerHTML = "Cart Empty";
    cartStatus.style.color = "rgba(17, 94, 152, 0.12)";
    cartIcon.src = "./images/Cart.svg";
    goToCart.style.display = "none";
  }
};

//links to individual pages
document.getElementById("couch").addEventListener("click", () => {
  window.location = "./product-details-couch.html";
});

document.getElementById("bed").addEventListener("click", () => {
  window.location = "./product-details-bed.html";
});

document.getElementById("floor").addEventListener("click", () => {
  window.location = "./product-details-floor.html";
});

document.getElementById("round").addEventListener("click", () => {
  window.location = "./product-details-round.html";
});
