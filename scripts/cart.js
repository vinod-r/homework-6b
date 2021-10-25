const backButton = document.getElementsByClassName("back-link")[0];
const cartBody = document.getElementById("cart-body");
const cartList = localStorage.getItem("cart");

const costDatabase = {
  B: 39.99,
  C: 19.99,
  F: 79.99,
  R: 29.99,
};

//back button logic
backButton.addEventListener("click", () => {
  history.go(-1);
});

//create a new Cart Item with js
const createNewItem = (item) => {
  let pillowType = item[0];
  let pillowColor = item[1];
  let pillowSize = item[2];
  let pillowQuantity = item.substring(3);
  let pillowValue = costDatabase[pillowType];

  let cartItem = document.createElement("div");
  cartItem.setAttribute("class", "cart-item");
  cartBody.appendChild(cartItem);

  let cartProduct = document.createElement("div");
  cartProduct.setAttribute("class", "cart-product");
  cartItem.appendChild(cartProduct);

  let cartImage = document.createElement("img");
  switch (pillowType) {
    case "B":
      cartImage.src = "./images/bed.jpg";
      cartImage.alt = "Bed Pillow";
      break;
    case "C":
      cartImage.src = "./images/couch.jpg";
      cartImage.alt = "Couch Pillow";
      break;
    case "F":
      cartImage.src = "./images/floor.jpg";
      cartImage.alt = "Floor Pouf";
      break;
    case "R":
      cartImage.src = "./images/round.jpg";
      cartImage.alt = "Round Pillow";
      break;
  }

  cartProduct.appendChild(cartImage);

  let productTitle = document.createElement("h1");
  switch (pillowType) {
    case "B":
      productTitle.innerHTML = "Bed Pillow";
      break;
    case "C":
      productTitle.innerHTML = "Couch Pillow";
      break;
    case "F":
      productTitle.innerHTML = "Floor Pouf";
      break;
    case "R":
      productTitle.innerHTML = "Round Pillow";
      break;
  }
  cartProduct.appendChild(productTitle);

  let cartProductDetails = document.createElement("div");
  cartProductDetails.setAttribute("class", "cart-product-details");
  cartProduct.appendChild(cartProductDetails);

  let cartProductColor = document.createElement("h3");
  cartProductColor.setAttribute("class", "cart-product-color");
  switch (pillowColor) {
    case "a":
      cartProductColor.innerHTML = "After School Special";
      break;
    case "m":
      cartProductColor.innerHTML = "Morning Haze";
      break;
    case "c":
      cartProductColor.innerHTML = "Cozy Denim";
      break;
    case "r":
      cartProductColor.innerHTML = "Rainy Day";
      break;
  }
  cartProductDetails.appendChild(cartProductColor);

  let cartProductSize = document.createElement("h3");
  cartProductSize.setAttribute("class", "cart-product-size");
  switch (pillowSize) {
    case "1":
      cartProductSize.innerHTML = "Small";
      break;
    case "2":
      cartProductSize.innerHTML = "Medium";
      break;
    case "3":
      cartProductSize.innerHTML = "Large";
      break;
  }

  cartProductDetails.appendChild(cartProductSize);

  let cartQuantity = document.createElement("div");
  cartQuantity.setAttribute("class", "cart-quantity");
  cartQuantity.innerHTML = pillowQuantity;
  cartItem.appendChild(cartQuantity);

  let cartSubtotal = document.createElement("div");
  cartSubtotal.setAttribute("class", "cart-subtotal");
  cartSubtotal.innerHTML = `$${(
    pillowQuantity *
    pillowSize *
    pillowValue
  ).toFixed(2)}`;
  cartItem.appendChild(cartSubtotal);

  let cartButton = document.createElement("button");
  cartButton.setAttribute("class", "cart-delete-item");
  cartItem.appendChild(cartButton);

  let closeButton = document.createElement("img");
  closeButton.setAttribute("class", "cart-delete-icon");
  closeButton.src = "./images/close-icon.svg";
  closeButton.alt = "Delete Icon";
  cartButton.appendChild(closeButton);
};

window.onload = () => {
  if (cartList != null) {
    let cartItems = cartList.split(" ");
    cartItems = cartItems.splice(1);
    cartItems.forEach((item) => {
      createNewItem(item);
    });

    let deleteButtons = document.getElementsByClassName("cart-delete-icon");

    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", (e) => {
        e.target.parentNode.parentNode.parentNode.removeChild(
          e.target.parentNode.parentNode
        );

        let newCart = "";
        if (cartItems.length === 1) {
          cartItems = [];
        } else {
          cartItems.splice(i, 1);
        }

        cartItems.forEach((item) => {
          newCart = `${newCart} ${item}`;
        });

        localStorage.setItem("cart", newCart);
      });
    }
  }
};
