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