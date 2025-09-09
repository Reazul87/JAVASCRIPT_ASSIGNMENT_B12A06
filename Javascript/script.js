console.log("Connected");

const loadingCategories = () => {
  const parentCategories = document.getElementById("plant_categories");
  parentCategories.innerHTML = `<div id="spinner" class="text-center">
      <span class="loading loading-xl loading-spinner text-success"></span>
    </div>`;
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
};

// displayCategories

const displayCategories = (categories) => {
  const parentCategories = document.getElementById("plant_categories");
  parentCategories.innerHTML = "";
  categories.forEach((category) => {
    const childCategory = document.createElement("div");
    childCategory.innerHTML = `<button id="highlightCategory-${category.id}" type="button" onclick="categories_Carts('${category.id}')" class="Category btn btn-sm w-full btn-ghost px-4 py-2 hover:bg-sky-600 hover:font-medium active:text-[#b404b4f6] hover:text-violet-200">${category.category_name}</button>`;
    parentCategories.appendChild(childCategory);
    // console.log(parentCategories);
  });
};

loadingCategories();

const activeDelete = () => {
  const category_button = document.querySelectorAll(".Category");
  // console.log(category_button);
  category_button.forEach((category) => category.classList.remove("active"));
};

const categories_Carts = (id) => {
  const parentForCategory = document.getElementById("plant_carts");
  parentForCategory.innerHTML = `<div id="spinner" class="md:col-span-8 col-span-2 m-auto">
      <span class="loading loading-xl loading-spinner text-success"></span>
    </div>`;
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      activeDelete();
      const clickedButton = document.getElementById(`highlightCategory-${id}`);
      clickedButton.classList.add("active");
      displayCategoryPlants(data.plants);
    });
};

// displayCategoryPlants

const displayCategoryPlants = (plantsOfCategory) => {
  const parentForCategory = document.getElementById("plant_carts");
  parentForCategory.innerHTML = "";

  plantsOfCategory.forEach((plantOfCategory) => {
    // console.log(plantOfCategory);
    const plantCart = document.createElement("div");
    plantCart.innerHTML = `<div class="flex flex-col border border-gray-100 rounded-2xl shadow p-4 h-full">
      <img src="${plantOfCategory.image}" alt="Mango Tree" class="rounded-xl mb-4 h-48 w-full object-cover">
      <div class="flex flex-col flex-grow">
        <h3 onclick="LoadPlantsDetails('${plantOfCategory.id}')" class="text-lg font-semibold cursor-pointer">${plantOfCategory.name}</h3>
        <p class="text-sm text-gray-600 mt-3 mb-auto">
          ${plantOfCategory.description}
        </p>
        <div class="flex justify-between items-center my-3">
          <span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">${plantOfCategory.category}</span>
          <span class="font-bold">৳<span>${plantOfCategory.price}</span>
        </div>
      </div>
      <button class="click bg-green-600 text-white rounded-2xl py-2 mt-auto cursor-pointer hover:bg-sky-600 active:text-[#b404b4f6] hover:font-medium hover:text-violet-200">
        Add to Cart
      </button>
    </div>`;

    parentForCategory.appendChild(plantCart);
  });
};

const load_Carts = () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      activeDelete();
      const clickedButton = document.getElementById("highlightCategory");
      clickedButton.classList.add("active");
      displayPlants(data.plants);
    });
};

// displayPlants

const displayPlants = (plants) => {
  const parentPlants = document.getElementById("plant_carts");
  // console.log(parentPlants);
  parentPlants.innerHTML = "";

  plants.forEach((plant) => {
    const childPlants = document.createElement("div");
    childPlants.innerHTML = `<div class="flex flex-col border border-gray-100 rounded-2xl shadow p-4 h-full">
      <img src="${plant.image}" alt="Mango Tree" class="rounded-xl mb-4 h-48 w-full object-cover">
      <div class="flex flex-col flex-grow">
        <h3 onclick="LoadPlantsDetails('${plant.id}')" class="text-lg font-semibold cursor-pointer">${plant.name}</h3>
        <p class="text-sm text-gray-600 mt-3 mb-auto">
          ${plant.description}
        </p>
        <div class="flex justify-between items-center my-3">
          <span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">${plant.category}</span>
          <span class="font-bold">৳<span>${plant.price}</span>
        </div>
      </div>
      <button class="click bg-green-600 text-white rounded-2xl py-2 mt-auto cursor-pointer hover:bg-sky-600 active:text-[#b404b4f6] hover:font-medium hover:text-violet-200">
        Add to Cart
      </button>
    </div>`;

    parentPlants.appendChild(childPlants);
  });
};

load_Carts();

const LoadPlantsDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPlantsDetails(data.plants));
};

// displayPlantsDetails

const displayPlantsDetails = (Details) => {
  const modalContainer = document.getElementById("modal_container");
  modalContainer.innerHTML = `<div class="flex flex-col rounded-2xl shadow-sm p-4 h-full">
                <h3 class="text-xl mb-2 font-semibold">${Details.name}</h3>
                <img src="${Details.image}" alt="Mango Tree" class="rounded-xl mb-4 h-24 md:h-48 w-full object-cover">
                <div class="flex flex-col flex-grow">
                    <div>
                        <span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">${Details.category}</span>
                    </div>
                    <div class="flex justify-between items-center mt-3 mb-1.5">
                        <span class="font-bold">৳<span>${Details.price}</span>
                            <p class="text-sm text-gray-600 mt-2">${Details.description}</p>
                    </div>
                </div>
            </div>`;
  document.getElementById("my_modal").showModal();
};