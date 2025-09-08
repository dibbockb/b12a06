// Api
const allPlantsAPI = "https://openapi.programming-hero.com/api/plants";
const categoriesAPI = "https://openapi.programming-hero.com/api/categories";

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
        this.classList.add("active-category");
        const categoryId = this.dataset.id;
        const categoryUrl = `https://openapi.programming-hero.com/api/category/${categoryId}`;
        cardGallery.innerHTML = '<span style="display:flex ; justify-self: center; justify-content:center; align-items:center;" class="loading loading-bars loading-xl loading-lg"></span>';
        fetch(categoryUrl)
          .then((response) => response.json())
          .then((data) => {
            cardGallery.innerHTML = "";
            const plants = Array.isArray(data.plants) ? data.plants : [];
            if (plants.length === 0) {
              cardGallery.innerHTML = "<p>No plants found for this category.</p>";
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

              card.append(cardImg, cardInfo, cardTagDiv, cardButton);
              cardInfo.append(cardTitle, cardSubtitle);
              cardTagDiv.append(cardTag, cardPrice);

              cardGallery.appendChild(card);
            });
          });
      });
    });
  });


cardGallery.innerHTML = '<span style="display:flex ; justify-self: center; justify-content:center; align-items:center;" class="loading loading-bars loading-xl"></span>';
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

      card.append(cardImg, cardInfo, cardTagDiv, cardButton);
      cardInfo.append(cardTitle, cardSubtitle);
      cardTagDiv.append(cardTag, cardPrice);

      cardGallery.appendChild(card);
    });
  });





// ------------------------------------------
// Card Modal
