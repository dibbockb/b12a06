// APIs
const allPlantsAPI = "https://openapi.programming-hero.com/api/plants";
const categoriesAPI = "https://openapi.programming-hero.com/api/categories";
const plantCategoryAPI = "https://openapi.programming-hero.com/api/category/1";
const plantDetailAPI = "https://openapi.programming-hero.com/api/plant/1";

// ---------------
// Category
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
      categoryMenu.appendChild(newButton);
    });
  });

// ---------------
// Default Cards
const cardGallery = document.getElementsByClassName("card-gallery")[0];

fetch(allPlantsAPI)
  .then((response) => response.json())
  .then((data) => {
    cardGallery.innerHTML = "";

    data.plants.slice(0, 6).forEach((plant) => {
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
