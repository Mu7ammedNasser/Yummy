///<reference types="../@types/jquery"/>
function showLoading() {
  $(".spinner-container").removeClass("d-none").fadeIn();
}

function hideLoading() {
  $(".spinner-container").fadeOut(500 , function() {
    $(".spinner-container").addClass("d-none");
  });
}




//start aside logic

function closeNav() {
  $("aside").animate({ left: "-260px" }, 500);
  $(".icon").html(`<i class=" i text-black fa-solid open-close-icon fa-2x fa-align-justify"></i>`);
  for (let i = 0; i < 5; i++) {
    $("ul li").eq(i).animate({
        top: 300
    }, (i + 5) * 10)
}
}

function openNav() {
  $("aside").animate({ left: "0px" }, 500);
  $(".icon").html(`<i class="i text-black fa-3x fa-solid fa-xmark"></i>`);
  for (let i = 0; i < 5; i++) {
    $("ul li").eq(i).animate({
        top: 0
    }, (i + 5) * 100)
}
}

$(".icon").on("click", function () {
  if ($("aside").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});

//end aside logic

// start home content logic

// end home content logic
getMealsByName(""); ///////////////////////////////////////////////////////////////////////////////////////////////
// start search logic

$("#search").on("click", function () {
  displaySearchInputs();
});

function displaySearchInputs() {
  let inputs = `
       <div class="container row py-4">
            <div class="mb-3 col-md-5">
                <input id="byName" type="text" class=" form-control bg-black text-white" id="exampleFormControlInput1" placeholder="Search By Name">
              </div>
              <div class="mb-3 col-md-5">
                <input id="byChar" type="text" maxlength="1" class="form-control bg-black text-white" id="exampleFormControlInput1" placeholder="Search By First Letter">
              </div>
        </div>
    `;
  $("#rowData").html(` `);
  $("#searchContent").html(inputs);
  closeNav();

  $("#byName").on("input", function () {
    getMealsByName($(this).val());
  });
  $("#byChar").on("input", function () {
    getMealsByChar($(this).val());
  });
}

async function getMealsByName(mealName) {
  showLoading(); 
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  let data = await result.json();
  displayMealsByName(data.meals);
  hideLoading(); 
}

function displayMealsByName(data) {
  
  
  let byNameBox = "";
  for (let i = 0; i < data.length; i++) {
    byNameBox += `
        <div class="item-container p-2 col-md-3 " id="${data[i].idMeal}">
          <div class="item position-relative ">
            <img src="${data[i].strMealThumb}" class="w-100 d-block" alt="test" />
            <div class="d-flex flex-column text-center justify-content-center align-items-center position-absolute w-100 h-100 top-100 meal-layer">
              <h2>${data[i].strMeal}</h2>
            </div>
          </div>
        </div>
      `;
  }
  $("#rowData").html(byNameBox);
  $(".item-container").on("click", function () {
    console.log($(this).attr("id"));
    getInDetailsData($(this).attr("id"));
  });
}

async function getMealsByChar(mealChar) {
  showLoading(); 
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealChar}`
  );
  let data = await result.json();
  displayMealsByChar(data.meals);
  hideLoading(); 
}

function displayMealsByChar(data) {
  
  let byCharBox = "";
  for (let i = 0; i < data.length; i++) {
    byCharBox += `
            <div class="item-container p-2 col-md-3" id="${data[i].idMeal}">
            <div class="item position-relative">
              <img src="${data[i].strMealThumb}" class="w-100 d-block" alt="test" />
              <div class="d-flex flex-column text-center justify-content-center align-items-center position-absolute w-100 h-100 top-100 meal-layer position-absolute">
                <h2>${data[i].strMeal}</h2>
              </div>
            </div>
          </div>
        `;
  }
  $("#rowData").html(byCharBox);
  $(".item-container").on("click", function () {
    console.log($(this).attr("id"));
    getInDetailsData($(this).attr("id"));
  });
}

// end search logic

// start category logic

$("#categories").on("click", function () {
  getCategoryData();
});

async function getCategoryData() {
  showLoading(); 
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await result.json();
  let categories = data.categories;
  dispalyCategoryData(categories);
  closeNav();
  console.log(categories);
  hideLoading(); 
}

function truncateText(text, wordLimit) {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
}

function dispalyCategoryData(data) {
  let categoriesBox = "";
  for (let i = 0; i < data.length; i++) {
    let trucatedText = truncateText(data[i].strCategoryDescription, 20);

    categoriesBox += `
            <div class="item-container p-2 col-md-3">
            <div class="item position-relative">
              <img src="${data[i].strCategoryThumb}" class="w-100 d-block" alt="test" />
              <div class="d-flex flex-column text-center justify-content-center align-items-center position-absolute w-100 h-100 top-100 meal-layer position-absolute">
                <h2>${data[i].strCategory}</h2>
                <p>
                ${trucatedText}
                </p>
              </div>
            </div>
          </div>
        `;
  }
  $("#searchContent").html(` `);
  $("#rowData").html(categoriesBox);

  $(".item-container .item").on("click", function () {
    console.log($(this).find("h2").text());
    getMealsOfCategory($(this).find("h2").text());
  });
}

async function getMealsOfCategory(categoryName) {
  showLoading(); 
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  let data = await result.json();
  displayMealsOfCategory(data.meals);
  hideLoading(); 
}

function displayMealsOfCategory(data) {
  let mealsOfCategoryBox = "";
  for (let i = 0; i < data.length; i++) {
    mealsOfCategoryBox += `
            <div class="item-container p-2 col-md-3" id="${data[i].idMeal}">
            <div class="item position-relative">
              <img src="${data[i].strMealThumb}" class="w-100 d-block" alt="test" />
              <div class="d-flex flex-column text-center justify-content-center align-items-center position-absolute w-100 h-100 top-100 meal-layer position-absolute">
                <h2>${data[i].strMeal}</h2>
              </div>
            </div>
          </div>
        `;
  }
  $("#rowData").html(mealsOfCategoryBox);
  $(".item-container").on("click", function () {
    console.log($(this).attr("id"));
    getInDetailsData($(this).attr("id"));
  });
}

// end category logic

// start area logic
$("#area").on("click", function () {
  getAreaData();
  closeNav();
});
async function getAreaData() {
  showLoading(); 
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await result.json();
  displayAreaData(data.meals);
  console.log(data.meals);
  hideLoading(); 
}

function displayAreaData(data) {
  let areaBox = "";
  for (let i = 0; i < data.length; i++) {
    areaBox += `
            <div class="item-container p-3 col-md-3">
            <div class="item position-relative text-center text-white p-3">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h2>${data[i].strArea}</h2>
            </div>
          </div>
        `;
  }
  $("#searchContent").html(` `);
  $("#rowData").html(areaBox);
  $(".item-container .item").on("click", function () {
    console.log($(this).find("h2").text());
    getMealsOfArea($(this).find("h2").text());
  });
}

async function getMealsOfArea(areaName) {
  showLoading(); 
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  let data = await result.json();
  displayMealsOfCategory(data.meals);
  hideLoading(); 
}

function displayMealsOfArea(data) {

  let mealsOfAreaBox = "";
  for (let i = 0; i < data.length; i++) {
    mealsOfAreaBox += `
            <div class="item-container p-2 col-md-3" id="${data[i].idMeal}">
            <div class="item position-relative">
              <img src="${data[i].strMealThumb}" class="w-100 d-block" alt="test" />
              <div class="d-flex flex-column text-center justify-content-center align-items-center position-absolute w-100 h-100 top-100 meal-layer position-absolute">
                <h2>${data[i].strMeal}</h2>
              </div>
            </div>
          </div>
        `;
  }
  $("#rowData").html(mealsOfAreaBox);
  $(".item-container").on("click", function () {
    console.log($(this).attr("id"));
    getInDetailsData($(this).attr("id"));
  });
}
// end area logic

//start Ingredients logic
$("#ingredients").on("click", function () {
  getIngredientsData();
  closeNav();
});

async function getIngredientsData() {
  showLoading(); 
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await result.json();
  dispalyIngredientsData(data.meals);
  console.log(data.meals);
  hideLoading(); 
}

function dispalyIngredientsData(data) {
  let ingredientsBox = "";
  for (i = 0; i < 20; i++) {
    let trucatedText = truncateText(data[i].strDescription, 15);
    ingredientsBox += `
            <div class="item-container p-2 col-md-3">
            <div class="item position-relative text-center text-white p-2">
              <i class="fa-solid fa-drumstick-bite fa-3x"></i>
              <h3 class = "h4">${data[i].strIngredient}</h3>
              <p>
                ${trucatedText}
              </p>
            </div>
          </div>
        `;
  }

  $("#searchContent").html(` `);
  $("#rowData").html(ingredientsBox);
  $(".item-container .item").on("click", function () {
    console.log($(this).find("h3").text());
    getMealsOfMainIngredient($(this).find("h3").text());
  });
}

async function getMealsOfMainIngredient(IngredientName) {
  showLoading(); 
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngredientName}`
  );
  let data = await result.json();
  displayMealsOfCategory(data.meals);
  hideLoading(); 
}

function displayMealsOfMainIngredient(data) {
  let mealsOfIngredientBox = "";
  for (let i = 0; i < data.length; i++) {
    mealsOfIngredientBox += `
            <div class="item-container p-2 col-md-3"  id="${data[i].idMeal}">
            <div class="item position-relative">
              <img src="${data[i].strMealThumb}" class="w-100 d-block" alt="test" />
              <div class="d-flex flex-column text-center justify-content-center align-items-center position-absolute w-100 h-100 top-100 meal-layer position-absolute">
                <h2>${data[i].strMeal}</h2>
              </div>
            </div>
          </div>
        `;
  }
  $("#rowData").html(mealsOfIngredientBox);
  $(".item-container").on("click", function () {
    console.log($(this).attr("id"));
    getInDetailsData($(this).attr("id"));
  });
}
//end Ingredients logic

// start details logic
async function getInDetailsData(id) {
  showLoading(); 
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await result.json();
  displayDetailsData(data.meals);
  console.log(data.meals);
  hideLoading(); 
}

function displayDetailsData(data) {
  let detailsBox = "";
  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    if (data[0][`strIngredient${i}`]) {
      //loop until not falsy value
      ingredients += `<li class="recipes-component rounded-2 ms-0 m-2 p-1">${
        data[0][`strMeasure${i}`]
      } ${data[0][`strIngredient${i}`]}</li>`;
    }
  }

  let tags = data[0].strTags ? data[0].strTags.split(",") : [];
  let tagsStr = tags
    .map((tag) => `<li class="recipes-tags ms-0 m-2 rounded-2 p-1">${tag}</li>`)
    .join("");

  detailsBox = `
      <div class="mealImage col-md-4 text-white">
        <img src="${data[0].strMealThumb}" class="w-100 rounded-3" alt="${data[0].strMeal}" />
        <h2>${data[0].strMeal}</h2>
      </div>
      <div class="mealDetails col-md-8 text-white">
        <h3>Instructions</h3>
        <p>${data[0].strInstructions}</p>
        <h4 class="h3">Area: ${data[0].strArea}</h4>
        <h4 class="h3">Category: ${data[0].strCategory}</h4>
        <h4>Recipes:</h4>
        <ul class="d-flex flex-wrap ps-0 my-2">${ingredients}</ul>
        <h4>Tags:</h4>
        <ul class="d-flex flex-wrap ps-0 my-2">${tagsStr}</ul>
        <a target="_blank" href="${data[0].strYoutube}" class="btn btn-danger">YouTube</a>
        <a target="_blank" href="${data[0].strSource}" class="btn btn-success">Source</a>
      </div>
    `;
  $("#rowData").html(detailsBox);
}

// end details logic

// start contact us logic

$("#contactUs").on("click", function () {
  displayContactPage();
});

function displayContactPage() {
  let contactBox = `
    <div class="contact vh-100">
            <div
              class="container d-flex flex-column justify-content-center align-items-center w-75 vh-100"
            >
              <div class="row">
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    class="form-control text-white bg-black"
                    id="nameInput"
                    placeholder="Enter Your Name"
                  />
                  <div class="alert alert-danger d-none text-center py-2 my-2">
                    Special characters and numbers not allowed
                  </div>
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="email"
                    class="form-control text-white bg-black"
                    id="emailInput"
                    placeholder="Enter Your Email"
                  />
                  <div class="alert alert-danger d-none text-center py-2 my-2">
                    Email not valid *example@yyy.zzz
                  </div>
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    class="form-control text-white bg-black"
                    id="phoneInput"
                    placeholder="Enter Your Phone"
                  />
                  <div class="alert alert-danger d-none text-center py-2 my-2">
                    Enter valid Phone Number
                  </div>
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="number"
                    class="form-control text-white bg-black"
                    id="ageInput"
                    placeholder="Enter Your Age"
                  />
                  <div class="alert alert-danger d-none text-center py-2 my-2">
                    Enter valid age
                  </div>
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="password"
                    class="form-control text-white bg-black"
                    id="passwordInput"
                    placeholder="Enter Your Password"
                  />
                  <div class="alert alert-danger d-none text-center py-2 my-2">
                    Enter valid password *Minimum eight characters, at least one
                    letter and one number:*
                  </div>
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="password"
                    class="form-control text-white bg-black"
                    id="repasswordInput"
                    placeholder="Enter Your Repassword"
                  />
                  <div class="alert alert-danger d-none text-center py-2 my-2">
                    Enter valid repassword
                  </div>
                </div>
              </div>
              <div
                class="button-parent d-flex w-100 justify-content-center position-relative p-5"
              >
                <button
                  type="button"
                  class="btn btn-outline-danger catch-me disabled"
                  id="submitButton"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
  `;
  $("#rowData").html(contactBox);
  closeNav();

  $("#nameInput").on("input", function () {
    let isValidNameInput = validateName($("#nameInput").val());
    if (isValidNameInput) {
      $("#nameInput").next().addClass("d-none");
      $("#nameInput").addClass("is-valid");
    } else {
      $("#nameInput").removeClass("is-valid");
      $("#nameInput").next().removeClass("d-none");
    }
    checkFormValidity();
  });

  $("#emailInput").on("input", function () {
    let isValidEmailInput = validateEmail($("#emailInput").val());
    if (isValidEmailInput) {
      $("#emailInput").next().addClass("d-none");
      $("#emailInput").addClass("is-valid");
    } else {
      $("#emailInput").removeClass("is-valid");
      $("#emailInput").next().removeClass("d-none");
    }
    checkFormValidity();
  });

  $("#phoneInput").on("input", function () {
    let isValidPhoneInput = validatePhone($("#phoneInput").val());
    if (isValidPhoneInput) {
      $("#phoneInput").next().addClass("d-none");
      $("#phoneInput").addClass("is-valid");
    } else {
      $("#phoneInput").removeClass("is-valid");
      $("#phoneInput").next().removeClass("d-none");
    }
    checkFormValidity();
  });

  $("#ageInput").on("input", function () {
    let isValidAgeInput = validateAge($("#ageInput").val());
    if (isValidAgeInput) {
      $("#ageInput").next().addClass("d-none");
      $("#ageInput").addClass("is-valid");
    } else {
      $("#ageInput").removeClass("is-valid");
      $("#ageInput").next().removeClass("d-none");
    }
    checkFormValidity();
  });

  $("#passwordInput").on("input", function () {
    let isValidPasswordInput = validatePassword($("#passwordInput").val());
    if (isValidPasswordInput) {
      $("#passwordInput").next().addClass("d-none");
      $("#passwordInput").addClass("is-valid");
    } else {
      $("#passwordInput").removeClass("is-valid");
      $("#passwordInput").next().removeClass("d-none");
    }
    checkFormValidity();
  });

  $("#repasswordInput").on("input", function () {
    let isValidRepasswordInput = validateRePassword();
    if (isValidRepasswordInput) {
      $("#repasswordInput").next().addClass("d-none");
      $("#repasswordInput").addClass("is-valid");
    } else {
      $("#repasswordInput").removeClass("is-valid");
      $("#repasswordInput").next().removeClass("d-none");
    }
    checkFormValidity();
  });
}

function validateName(Name) {
  let regex = /^[a-zA-Z]{3,20}$/;
  return regex.test(Name);
}

function validateEmail(Email) {
  let regex = /^[\w\.]{3,20}@[a-zA-Z]{3,20}\.(com|org|net)$/;
  return regex.test(Email);
}

function validatePhone(phone) {
  let regex = /^(20|\+2)?01[0125][0-9]{8}$/;
  return regex.test(phone);
}

function validateAge(age) {
  let regex = /^[1-9]{1,2}0?$/;
  return regex.test(age);
}

function validatePassword(pass) {
  let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  return regex.test(pass);
}

function validateRePassword() {
  return $("#repasswordInput").val() === $("#passwordInput").val();
}

function checkFormValidity() {
  if (
    $("#nameInput").hasClass("is-valid") &&
    $("#emailInput").hasClass("is-valid") &&
    $("#phoneInput").hasClass("is-valid") &&
    $("#ageInput").hasClass("is-valid") &&
    $("#passwordInput").hasClass("is-valid") &&
    $("#repasswordInput").hasClass("is-valid")
  ) {
    $("#submitButton").removeClass("catch-me disabled");
  } else {
    $("#submitButton").addClass("catch-me disabled");
  }
}

// end contact us logic
