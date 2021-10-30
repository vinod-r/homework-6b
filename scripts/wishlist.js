const cartStatus = document.getElementById("cart-status");
const cartIcon = document.getElementById("cart-image");
const goToCart = document.getElementById("go-to-cart");
const backButton = document.getElementsByClassName("back-link")[0];
let removeButtons;

const imageDatabase = {
  B: "./images/bed.jpg",
  C: "./images/couch.jpg",
  F: "./images/floor.jpg",
  R: "./images/round.jpg",
};

const titleDatabase = {
  B: "Bed Pillow",
  C: "Couch Pillow",
  F: "Floor Pouf",
  R: "Round Pillow",
};

const costDatabase = {
  B: 39.99,
  C: 19.99,
  F: 79.99,
  R: 29.99,
};

window.onload = () => {
  updateCartDisplay();
  let wishlistLS = localStorage.getItem("wishlist");
  if (wishlistLS != null) {
    let newWishlist = wishlistLS.split(",");
    newWishlist.forEach((type) => {
      if (type.length > 0) {
        createWishlistItem(type);
      }
    });
  }

  updateWishlistEmpty();

  removeButtons = document.getElementsByClassName("remove-button");
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", (e) => {
      let pillowType = e.target.parentNode.parentNode.parentNode.id;
      wishlistLS = localStorage.getItem("wishlist");
      let newWishlist = wishlistLS.split(",");
      newWishlist.splice(newWishlist.indexOf(pillowType), 1);
      localStorage.setItem("wishlist", newWishlist);
      e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode
      );

      updateWishlistEmpty();
    });
  }
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

const createWishlistItem = (type) => {
  const wishlistItem = document.createElement("div");
  wishlistItem.setAttribute("class", "wishlist-card");
  let image = imageDatabase[type];
  let title = titleDatabase[type];
  let cost = costDatabase[type];
  wishlistItem.setAttribute("id", type);

  wishlistItem.innerHTML = ` <img
              class="product-listing-image"
              src=${image}
              alt=${title}
            />
            <div class="product-info">
              <!-- The card image -->
              <h2 class="card-title">${title}</h2>
              <!-- Card title and info-->
              <p class="product-price">Starting from $${cost}</p>
              <p class="product-content">
                Integer lobortis turpis non velit cursus, id congue sapien
                consectetur. In nisi eros, placerat id volutpat in, congue
                faucibus.
              </p>
            </div>
            <div class="card-link">
              <a href="#" class="remove-button" aria-label="Link to Remove ${title}"
                ><p>Remove</p></a
              >
              <a
                href="./product-details-couch.html"
                class="link"
                aria-label="Link to Customize ${title}"
                >Customize</a
              >
            </div>`;
  document.getElementById("wishlist-body").appendChild(wishlistItem);
};

backButton.addEventListener("click", () => {
  //going back when clicking the close button
  console.log("Works");
  history.go(-1);
});

const updateWishlistEmpty = () => {
  let emptyWishlist = document.getElementsByClassName("empty-wishlist")[0];
  let wishlistLS = localStorage.getItem("wishlist");
  console.log(wishlistLS);
  if (wishlistLS == "" || wishlistLS == null) {
    emptyWishlist.style.display = "grid";
  } else {
    emptyWishlist.style.display = "none";
  }
};
