const qtyIncreaseBtn = document.getElementsByClassName("increase")[0];
const qtyDecreaseBtn = document.getElementsByClassName("decrease")[0];
const qtyValue = document.getElementById("quantity-value");
const addToCartText = document.getElementById("add-to-cart-text");
const image = document.getElementsByClassName("details-image")[0];
const sizePicker = document.getElementsByName("size-picker");
const colorPicker = document.getElementsByName("color-picker");
const addtoCartBtn = document.getElementById("add-to-cart-button");
const addModal = document.getElementById("added-modal");
const addToCartUnit = document.getElementsByClassName("add-to-cart")[0];
const confirmAddBtn = document.getElementById("add-confirm");
const cartStatus = document.getElementById("cart-status");
const cartIcon = document.getElementById("cart-image");
const goToCart = document.getElementById("go-to-cart");
const wishlist = document.getElementById("wishlist");

//object to store prices for different pillows
const costDatabase = {
  B: 39.99,
  C: 19.99,
  F: 79.99,
  R: 29.99,
};

//initializing all pillow variables
let pillowType;
let cost;
let value = 1;
let size = 1;
let currentPrice;
let color = "a";

//setting data per item
window.onload = () => {
  pillowType = document
    .getElementById("details-title")
    .innerHTML.substring(0, 1);
  cost = costDatabase[pillowType];
  addToCartText.innerHTML = `Add 1 pillow to cart <br />
            $${cost}`;

  updateCartDisplay();
  updateWishlist();
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
    // itemsInCart = cartListArr.length;
  }

  if (itemsInCart > 0) {
    cartStatus.innerHTML = `${itemsInCart} ${
      itemsInCart > 1 ? "items" : "item"
    } in cart`;
    cartStatus.style.color = "rgba(17, 94, 152, 1)";
    cartIcon.src = "./images/cart-full.svg";
    goToCart.style.display = "block";
  } else {
    cartStatus.innerHTML = "Cart Empty";
    cartStatus.style.color = "rgba(17, 94, 152, 0.12)";
    cartIcon.src = "./images/Cart.svg";
    goToCart.style.display = "none";
  }
};

//add to cart unit display update
const updateAddToCartDisplay = () => {
  currentPrice = (value * cost * size).toFixed(2);
  addToCartText.innerHTML = `Add ${value} ${
    value > 1 ? "pillows" : "pillow"
  } to cart <br />
            $${currentPrice}`;
  addToCartUnit.style.display = "grid";
};

//updating image color based on selection
const updateImageColor = () => {
  let hueRot;
  let saturation = 1;
  switch (color) {
    case "a":
      hueRot = 0;
      saturation = 1;
      break;
    case "m":
      hueRot = 150;
      saturation = 1;

      break;
    case "c":
      hueRot = 220;
      saturation = 1;
      break;

    case "r":
      hueRot = 0;
      saturation = 0;
      break;
    default:
      hueRot = 0;
      saturation = 1;
  }
  image.style.filter = `hue-rotate(${hueRot}deg) saturate(${saturation})`;
};

//set quantity button active and inactive states
const qtyUpdate = () => {
  if (value === 1) {
    qtyDecreaseBtn.style.opacity = 0.3;
  } else {
    qtyDecreaseBtn.style.opacity = 1;
  }

  if (value === 10) {
    qtyIncreaseBtn.style.opacity = 0.3;
  } else {
    qtyIncreaseBtn.style.opacity = 1;
  }

  updateAddToCartDisplay();
};

//event listeners and quantity counting logic for
qtyIncreaseBtn.addEventListener("click", () => {
  value = parseInt(qtyValue.innerHTML);
  if (value < 10) {
    value++;
  }
  qtyUpdate();
  qtyValue.innerHTML = value.toString();
});

qtyDecreaseBtn.addEventListener("click", () => {
  value = parseInt(qtyValue.innerHTML);
  if (value > 1) {
    value--;
  }
  qtyUpdate();
  qtyValue.innerHTML = value.toString();
});

//tracking size
sizePicker.forEach((pillowSize) => {
  pillowSize.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "Small":
        size = 1;
        break;
      case "Medium":
        size = 2;
        break;
      case "Large":
        size = 3;
        break;
      default:
        size = 1;
    }
    updateAddToCartDisplay();
  });
});

//tracking color
colorPicker.forEach((pillowColor) => {
  pillowColor.addEventListener("click", (e) => {
    color = e.target.id.substring(0, 1);
    updateImageColor();
  });
});

//adding to cart
addtoCartBtn.addEventListener("click", () => {
  const itemToCart = (pillowType + color + size + value).toString();
  let cartStorage = localStorage.getItem("cart");
  if (cartStorage == null) {
    cartStorage = "";
  }
  cartStorage = `${cartStorage} ${itemToCart}`;
  localStorage.setItem("cart", cartStorage);
  addToCartUnit.style.display = "none";
  updateCartDisplay();
});

const updateWishlist = () => {
  let wishlistLS = localStorage.getItem("wishlist");
  if (wishlistLS != null) {
    wishlistLS = wishlistLS.split(",");
    if (wishlistLS.includes(pillowType)) {
      wishlist.src = "./images/wishlist-active.svg";
    } else {
      wishlist.src = "./images/wishlist-inactive.svg";
    }
  } else {
    localStorage.setItem("wishlist", "");
  }
};
wishlist.addEventListener("click", () => {
  let wishlistLS = localStorage.getItem("wishlist");
  if (wishlistLS != null) {
    let newWishlist = wishlistLS.split(",");
    if (newWishlist.includes(pillowType)) {
      newWishlist.splice(newWishlist.indexOf(pillowType), 1);
    } else {
      newWishlist.push(pillowType);
    }
    localStorage.setItem("wishlist", newWishlist);
    updateWishlist();
  }
});
