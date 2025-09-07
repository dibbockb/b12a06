// APIs
const allPlantsAPI = "https://openapi.programming-hero.com/api/plants";
const categoriesAPI = "https://openapi.programming-hero.com/api/categories";
const plantCategoryAPI = "https://openapi.programming-hero.com/api/category/1";
const plantDetailAPI = "https://openapi.programming-hero.com/api/plant/1";

// ---------------
// Category
const cardGallery = document.getElementsByClassName("card-gallery")[0];
const categoryMenu = document.querySelector(".category-menu");

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

        // self.classList.add("active-category");
        this.classList.add("active-category");
        const categoryId = this.dataset.id;
        console.log("Clicked categoryId:", categoryId);
        const categoryUrl = `https://openapi.programming-hero.com/api/category/${categoryId}`;
        fetch(categoryUrl)
          .then((response) => response.json())
          .then((data) => {
            console.log("Category API response:", data);
            cardGallery.innerHTML = "";
            const plants = Array.isArray(data.plants) ? data.plants : [];
            if (plants.length === 0) {
              cardGallery.innerHTML =
                "<p>No plants found for this category.</p>";
              return;
            }
            plants.forEach((plant) => {
              const card = document.createElement("div");
              card.classList.add("card");

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

              cardGallery.appendChild(card);

              card.append(cardImg, cardInfo, cardButton);
              cardInfo.append(cardTitle, cardSubtitle, cardTagDiv);
              cardTagDiv.append(cardTag, cardPrice);
            });
          });
      });
    });
  });

// Cards

fetch(allPlantsAPI)
  .then((response) => response.json())
  .then((data) => {
    // cardGallery.innerHTML = "<p>Loading...</p>";
    cardGallery.innerHTML = "";

    // data.plants.slice(0, 6).forEach((plant) => {
    data.plants.forEach((plant) => {
      const card = document.createElement("div");
      card.classList.add("card");

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
      const priceTaka = plant.price;
      cardPrice.innerText = `৳${priceTaka}`;

      const cardButton = document.createElement("button");
      cardButton.classList.add("card-button");
      cardButton.innerText = "Add to Cart";

      // cardGallery.append(card);
      cardGallery.appendChild(card);

      card.append(cardImg, cardInfo, cardButton);
      cardInfo.append(cardTitle, cardSubtitle, cardTagDiv);
      cardTagDiv.append(cardTag, cardPrice);
    });
  });

// Add to cart
const addToCartButtons = document.getElementsByClassName("card-button");
const cartItemTitle = document.getElementsByClassName("cart-item-title");
console.log(cartItemTitle.innerText);

Array.from(addToCartButtons).forEach((button) => {
  button.addEventListener("click", function () {
    console.log("button clicked");
  });
});
