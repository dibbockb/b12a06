// Api
const allPlantsAPI = "https://openapi.programming-hero.com/api/plants";
const categoriesAPI = "https://openapi.programming-hero.com/api/categories";

const cardGallery = document.getElementsByClassName("card-gallery")[0];
const categoryMenu = document.querySelector(".category-menu");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalElement = document.querySelector(".cart-total");
let cart = [];

// Fetch Categories
fetch(categoriesAPI)
  .then((response) => response.json())
  .then((data) => {
    categoryMenu.innerHTML = "";
    const title = document.createElement("p");
    title.classList.add("category-title");
    title.innerText = "Categories";
    categoryMenu.appendChild(title);

    data.categories.forEach((category) => {
      const newButton = document.createElement("button");
      newButton.classList.add("category-item");
      newButton.innerText = category.category_name;
      newButton.dataset.id = category.id;
      categoryMenu.appendChild(newButton);
    });

    const categoryItems = document.getElementsByClassName("category-item");
    Array.from(categoryItems).forEach((item) => {
      item.addEventListener("click", function () {
        Array.from(categoryItems).forEach((btn) =>
          btn.classList.remove("active-category")
        );
        this.classList.add("active-category");
        const categoryId = this.dataset.id;
        const categoryUrl = `https://openapi.programming-hero.com/api/category/${categoryId}`;
        cardGallery.innerHTML = '<div class="loader"></div>';
        fetch(categoryUrl)
          .then((response) => response.json())
          .then((data) => {
            cardGallery.innerHTML = "";
            const plants = Array.isArray(data.plants) ? data.plants : [];
            if (plants.length === 0) {
              cardGallery.innerHTML =
                "<p>No plants found for this category.</p>";
              return;
            }
            plants.forEach((plant) => {
              const card = document.createElement("div");
              card.classList.add("choose-card");

              const cardImg = document.createElement("img");
              cardImg.classList.add("card-img");
              cardImg.src = plant.image;

              const cardInfo = document.createElement("div");
              cardInfo.classList.add("card-info");

              const cardTitle = document.createElement("p");
              cardTitle.classList.add("card-title");
              cardTitle.textContent = plant.name;

              const cardSubtitle = document.createElement("p");
              cardSubtitle.classList.add("card-subtitle");
              cardSubtitle.innerText = plant.description;

              const cardTagDiv = document.createElement("div");
              cardTagDiv.classList.add("choose-card-tags");

              const cardTag = document.createElement("div");
              cardTag.classList.add("card-tag");
              cardTag.innerText = plant.category;

              const cardPrice = document.createElement("div");
              cardPrice.classList.add("card-price");
              cardPrice.innerText = `৳${plant.price}`;

              const cardButton = document.createElement("button");
              cardButton.classList.add("card-button");
              cardButton.innerText = "Add to Cart";
              cardButton.onclick = function (e) {
                e.stopPropagation();
                addToCart(plant);
              };

              card.append(cardImg, cardInfo, cardTagDiv, cardButton);
              cardInfo.append(cardTitle, cardSubtitle);
              cardTagDiv.append(cardTag, cardPrice);

              cardGallery.appendChild(card);
            });
          });
      });
    });
  });

// Fetch and Update Cards
cardGallery.innerHTML = '<div class="loader"></div>';
fetch(allPlantsAPI)
  .then((response) => response.json())
  .then((data) => {
    cardGallery.innerHTML = "";
    data.plants.forEach((plant) => {
      const card = document.createElement("div");
      card.classList.add("choose-card");

      const cardImg = document.createElement("img");
      cardImg.classList.add("card-img");
      cardImg.src = plant.image;

      const cardInfo = document.createElement("div");
      cardInfo.classList.add("card-info");

      const cardTitle = document.createElement("p");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = plant.name;

      const cardSubtitle = document.createElement("p");
      cardSubtitle.classList.add("card-subtitle");
      cardSubtitle.innerText = plant.description;

      const cardTagDiv = document.createElement("div");
      cardTagDiv.classList.add("choose-card-tags");

      const cardTag = document.createElement("div");
      cardTag.classList.add("card-tag");
      cardTag.innerText = plant.category;

      const cardPrice = document.createElement("div");
      cardPrice.classList.add("card-price");
      cardPrice.innerText = `৳${plant.price}`;

      const cardButton = document.createElement("button");
      cardButton.classList.add("card-button");
      cardButton.innerText = "Add to Cart";
      cardButton.onclick = function (e) {
        e.stopPropagation();
        addToCart(plant);
      };

      card.append(cardImg, cardInfo, cardTagDiv, cardButton);
      cardInfo.append(cardTitle, cardSubtitle);
      cardTagDiv.append(cardTag, cardPrice);

      cardGallery.appendChild(card);
    });
  });

// ------------------------------------------
// Add to cart
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item, idx) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item-text");
    const nameP = document.createElement("p");
    nameP.classList.add("cart-item-title");
    nameP.textContent = item.name;
    const priceP = document.createElement("p");
    priceP.classList.add("cart-item-price");
    priceP.textContent = `৳${item.price}`;
    itemDiv.appendChild(nameP);
    itemDiv.appendChild(priceP);

    const removeBtn = document.createElement("img");
    removeBtn.classList.add("cart-item-remove");
    removeBtn.src = "assets/cart-item-cross.png";
    removeBtn.alt = "Remove";
    removeBtn.style.display = "block";
    removeBtn.style.cursor = "pointer";
    removeBtn.onclick = function () {
      cart.splice(idx, 1);
      updateCart();
    };

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "space-between";
    wrapper.style.alignItems = "center";
    wrapper.appendChild(itemDiv);
    wrapper.appendChild(removeBtn);

    cartItemsContainer.appendChild(wrapper);
    total += item.price;
  });
  cartTotalElement.textContent = `Total : ৳${total}`;
}

function addToCart(plant) {
  cart.push(plant);
  updateCart();
}

// ------------------------------------------
// Card Modal

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.createElement("div");
  modal.classList.add("modalContainer");
  modal.style.display = "none";

  const modalContent = document.createElement("div");
  modalContent.classList.add("modalContainer-content");

  const closeButton = document.createElement("span");
  closeButton.innerHTML = "";
  closeButton.classList.add("modalContainer-close");

  const closeModal = () => {
    modal.classList.remove("is-active");
    setTimeout(() => (modal.style.display = "none"), 100);
  };

  closeButton.addEventListener("click", (fff) => {
    // console.log("close button clicked");
    fff.stopPropagation();
    closeModal();
  });

  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  modalContent.appendChild(closeButton);

  document.body.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
      return;
    }

    const card = e.target.closest(".choose-card");
    if (!card) return;

    const imgSrc = card.querySelector(".card-img")?.src;
    const title = card.querySelector(".card-title")?.textContent;
    const subtitle = card.querySelector(".card-subtitle")?.textContent;
    const tags = Array.from(card.querySelectorAll(".card-tag"))
      .map((tag) => tag.textContent)
      .join(", ");
    const price = card.querySelector(".card-price")?.textContent;

    modalContent.innerHTML = `
      <span class="modalContainer-close">&times;</span>
      <h2>${title}</h2>
      ${imgSrc ? `<img src="${imgSrc}" alt="${title}">` : ""}
      <p><strong>Description:</strong> ${subtitle}</p>
      <p class="modal-tags"><strong>Tag:</strong> ${tags}</p>
      <p class="modal-price">${price}</p>
    `;

    modalContent
      .querySelector(".modalContainer-close")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        closeModal();
      });

    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("is-active"), 10);
  });
});
