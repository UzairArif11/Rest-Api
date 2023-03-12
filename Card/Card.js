const backButton = document.getElementById("backButton");
const toggleTheme = document.getElementById("toggle-mode");
const card = document.getElementById("card2");

let switchMode = localStorage.getItem("switchMode");
const API_BASE_URL = `https://restcountries.com/v3.1`;

// Home page Show all country data
const showAllCountries = async () => {
  var value = localStorage.getItem("value");
  const Url = `${API_BASE_URL}/name/${value}?fullText=true`;
  let response = await fetch(Url);
  let data = await response.json();
  renderCountriesData(data);
};

// Fetching Country borders names 
const borderCountriesFunction = async (data) => {
  try {
    const borderingCountries = await Promise.all(
      data[0].borders.map(async (e) => {
        const response = await fetch(`${API_BASE_URL}/alpha/${e}`);
        const data = await response.json();
        return data[0].name.common;
      })
    );
    borderingCountries.sort((a, b) => a.localeCompare(b));
    return borderingCountries;
  } catch (err) {
    console.log(err);
    return "Error fetching bordering countries";
  }
};

// Component to fetch country data
const renderCountriesData = async (data) => {
  

  const borderingCountries = await borderCountriesFunction(data);
 
  
  data.map((element) => {
  
    card.innerHTML = `<div class="image2"><img src=${
      element.flags.png
    } alt="flag image"></div>

      <div class="des1">
         <h2>${element.name.common}</h2>
         <div class="paraCard">
         <p><b> Native Name:</b> ${
           element.name.nativeName
             ? Object.values(element.name.nativeName)[0].common ||
               element.name.nativeName
             : "No Native Name"
         }</p>
         <p><b>Population: </b>${element.population.toLocaleString()}</p>
         <p><b>Region: </b>${element.region}</p>
         <p ><b>Sub Region:</b> ${element.subregion}</p>
         <p><b>Capital: </b>${element.capital}</p>
    </div></div>

    <div class="des2" >
    <h2 class='noDisplay' style="visibility:hidden">ujk</h2>
    <div class="paraCard">
         <p><b>Top Level Domain: </b>${element.tld}</p>
         <p><b>Currencies:</b> ${
           element.currencies
             ? Object.values(element.currencies)[0].name
             : "No Currency"
         }</p>
         <p><b>Languages: </b>${
           element.languages
             ? Object.values(element.languages)
                 .sort((a, b) => a.localeCompare(b))
                 .join(", ")
             : "No Languages Available"
         }</p>
    </div></div>

    <div class="des3">
      <p class='borderCountry'><b>Border Countries:</b>
        ${
          element.borders && element.borders.length
            ? borderingCountries.map((name) => {
                return `<button class="border">${name}</button>`;
              }).join("")
            : "No Border"
        }
      </p>
    </div>
    <div class="empty"></div>
    `;
  });
};




// Back button and Toggle button logic
backButton.addEventListener("click", () => {
  localStorage.setItem("switchMode", switchMode);
  history.back();
});

//Toggle button logic

toggleTheme.addEventListener("click", () => {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let targetTheme = "";

  if (currentTheme === "light") {
    targetTheme = "dark";
    toggleTheme.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
  } else if (currentTheme === "dark") {
    targetTheme = "light";
    toggleTheme.innerHTML = `<i class="fa-regular fa-moon"></i>Light Mode`;
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
});

window.addEventListener("load", () => {
  let theme = localStorage.getItem("theme");
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "light") {
      toggleTheme.innerHTML = `<i class="fa-regular fa-moon"></i>Light Mode`;
    } else {
      toggleTheme.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
    }
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    toggleTheme.innerHTML = `<i class="fa-regular fa-moon"></i>Light Mode`;
  }
});

// window.addEventListener("load",toggleFunction);
showAllCountries();
