// assigning dom elements to variables

const backButton = document.getElementsByClassName("back-link")[0];
const cartBody = document.getElementById("cart-body");
const cartList = localStorage.getItem("cart");
const cartHeader = document.getElementById("cart-header");
const subtotalDisp = document.getElementById("final-sub-amount");
const totalDisp = document.getElementById("final-total-amount");
const taxDisp = document.getElementById("final-tax-amount");
const cartIsEmpty = document.getElementById("cart-empty-display");
const cartTotalBlock = document.getElementById("cart-total-block");

const costDatabase = {
  B: 39.99,
  C: 19.99,
  F: 79.99,
  R: 29.99,
};

let subtotal = 0;

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
  subtotal += parseInt(pillowQuantity * pillowSize * pillowValue);

  let cartImageSrc;
  let cartImageAlt;
  switch (pillowType) {
    case "B":
      cartImageSrc = "./images/bed.jpg";
      cartImageAlt = "Bed Pillow";
      break;
    case "C":
      cartImageSrc = "./images/couch.jpg";
      cartImageAlt = "Couch Pillow";
      break;
    case "F":
      cartImageSrc = "./images/floor.jpg";
      cartImageAlt = "Floor Pouf";
      break;
    case "R":
      cartImageSrc = "./images/round.jpg";
      cartImageAlt = "Round Pillow";
      break;
  }

  let productTitle;
  switch (pillowType) {
    case "B":
      productTitle = "Bed Pillow";
      break;
    case "C":
      productTitle = "Couch Pillow";
      break;
    case "F":
      productTitle = "Floor Pouf";
      break;
    case "R":
      productTitle = "Round Pillow";
      break;
  }

  let productColor;
  switch (pillowColor) {
    case "a":
      productColor = "After School Special";
      break;
    case "m":
      productColor = "Morning Haze";
      break;
    case "c":
      productColor = "Cozy Denim";
      break;
    case "r":
      productColor = "Rainy Day";
      break;
  }

  let productSize;
  switch (pillowSize) {
    case "1":
      productSize = "Small";
      break;
    case "2":
      productSize = "Medium";
      break;
    case "3":
      productSize = "Large";
      break;
  }

  // Generating cart item with dynamic content

  let cartItem = document.createElement("div");
  cartItem.setAttribute("class", "cart-item");
  cartItem.innerHTML = `<div class="cart-product">
                        <img src=${cartImageSrc} alt=${cartImageAlt}>
                        <h1>${productTitle}</h1>
                        <div class="cart-product-details">
                        <h3 class="cart-product-color">${productColor}</h3>
                        <h3 class="cart-product-size">${productSize}</h3>
                        </div>
                        </div>
                        <div class="cart-quantity">${pillowQuantity}</div>
                        <div class="cart-subtotal">$${(
                          pillowQuantity *
                          pillowSize *
                          pillowValue
                        ).toFixed(2)}</div>
                        <button class="cart-delete-item">
                        <img class="cart-delete-icon" src="./images/close-icon.svg" alt="Delete Icon">
                        </button>
                        </div>
                        `;
  cartBody.appendChild(cartItem);
};

// Generating cart on page load
window.onload = () => {
  console.log(cartList);
  if (cartList != "" && cartList != null) {
    let cartItems = cartList.split(" ");
    cartItems = cartItems.splice(1);
    cartItems.forEach((item) => {
      createNewItem(item);
    });

    let deleteButtons = document.getElementsByClassName("cart-delete-icon");

    // For Loop to run through all the delete buttons

    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", (e) => {
        e.target.parentNode.parentNode.parentNode.removeChild(
          e.target.parentNode.parentNode
        );

        let item = cartItems[i];
        let pillowType = item[0];
        let pillowSize = item[2];
        let pillowQuantity = item.substring(3);
        let pillowValue = costDatabase[pillowType];

        //update Subtotal when removing cart Item.

        subtotal -= parseInt(pillowQuantity * pillowSize * pillowValue);

        // removing the item from the array and updating local storage
        let newCart = "";
        if (cartItems.length === 1) {
          cartItems = [];
          redrawCart();
        } else {
          cartItems.splice(i, 1);
        }

        cartItems.forEach((item) => {
          newCart = `${newCart} ${item}`;
        });

        updateValues();
        localStorage.setItem("cart", newCart);
      });
    }

    //updating all the values changed by removing an item
    updateValues();
  } else {
    //redrawing Cart to update all values when a change happens.
    redrawCart();
  }
};

//Updating all values in the cart details section
const updateValues = () => {
  subtotal = subtotal.toFixed(2);
  subtotalDisp.innerHTML = `$${subtotal}`;
  let tax = (subtotal * 0.18).toFixed(2);
  taxDisp.innerHTML = `$${tax}`;
  totalDisp.innerHTML = `$${(parseInt(subtotal) + parseInt(tax)).toFixed(2)}`;
};

// redrawing cart to show items / empty state based on cart item in Local Storage
const redrawCart = () => {
  cartIsEmpty.style.display = "grid";
  cartHeader.style.display = "none";
  cartBody.style.display = "none";
  cartTotalBlock.style.display = "none";
};
