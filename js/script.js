document.addEventListener("DOMContentLoaded", function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItemsList = document.querySelector('.cart-items');
  const totalElement = document.querySelector('.cart-total');
  const toggleCartButton = document.querySelector('.checkout');
  const cartSidebar = document.querySelector('.shopping-cart');
  let cart = {};


  function toggleCart() {
      cartSidebar.classList.toggle('open');
  }


  toggleCartButton.addEventListener('click', toggleCart);


  addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
          const itemName = button.dataset.item;
          const itemPrice = parseFloat(button.dataset.price.replace('RM ', ''));
          const itemImage = button.dataset.image;


          if (!cart[itemName]) {
              cart[itemName] = { price: itemPrice, quantity: 1, image: itemImage };
          } else {
              cart[itemName].quantity++;
          }
          renderCartItems();
      });
  });


  function renderCartItems() {
      cartItemsList.innerHTML = '';
      let total = 0;


      for (const [itemName, itemDetails] of Object.entries(cart)) {
          total += itemDetails.price * itemDetails.quantity;
          const listItem = document.createElement('li');
          listItem.classList.add('cart-item');


          listItem.innerHTML = `
              <div class="item-details">
                  <img src="${itemDetails.image}" alt="${itemName}" class="cart-item-image">
                  <div>
                      <span class="item-name">${itemName}</span>
                      <span class="item-price">RM ${itemDetails.price.toFixed(2)}</span>
                  </div>
              </div>
              <input type="number" min="1" value="${itemDetails.quantity}">
              <button class="update-quantity">Update</button>
              <button class="remove-item">Remove</button>
          `;


          cartItemsList.appendChild(listItem);
      }


      totalElement.textContent = `Total: RM ${total.toFixed(2)}`;
  }
});




