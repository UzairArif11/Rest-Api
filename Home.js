const cardContainer = document.getElementById("CardsContainer");
let inputSearch = document.getElementById("myInput");
const filter = document.getElementById("filter");
const toggleTheme = document.getElementById("toggle-mode");


const API_BASE_URL = `https://restcountries.com/v3.1`;
let switchMode = localStorage.getItem("switchMode");

// Home page Show all country data
const showAllCountries = async () => {
  const Url = `${API_BASE_URL}/all`;

  let response = await fetch(Url);
  let data = await response.json();

  renderCountriesData(data);
};

// Component to fetch country data
const renderCountriesData = (data) => {
  cardContainer.innerHTML = "";
  data.map((element) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="image"><img src=${
      element.flags.png
    } alt="flag image"></div>
     <div class="description">
  
         <h2 >${element.name.common}</h2>
         <p><b>Population</b>: ${element.population.toLocaleString()}</p>
         <p><b>Region:</b> ${element.region}</p>
         <p><b>Capital:</b> ${element.capital}</p>
    
     </div>`;
    //OnClick Card Showing detail of country
    card.addEventListener("click", () => {
      window.location.assign("./Card/Card.html");

      localStorage.setItem("value", element.name.common);
      localStorage.setItem("switchMode", switchMode);
    });

    cardContainer.appendChild(card);
  });
};

//Toggle button logic

toggleTheme.addEventListener("click", () => {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let targetTheme = "";

  if (currentTheme === "light") {
    targetTheme = "dark";
    toggleTheme.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
  } else if (currentTheme === "dark") {
    targetTheme = "light";
    toggleTheme.innerHTML = `<i class="fa-regular fa-moon"></i>Dark Mode`;
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
});

window.addEventListener("load", () => {
  let theme = localStorage.getItem("theme");
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "light") {
      toggleTheme.innerHTML = `<i class="fa-regular fa-moon"></i>Dark Mode`;
    } else {
      toggleTheme.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
    }
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    toggleTheme.innerHTML = `<i class="fa-regular fa-moon"></i>Dark Mode`;
  }



});
// Search by country name

inputSearch.addEventListener("keyup", async (e) => {
  if (e.key === "Enter") {
    if (e.target.value) {
      cardContainer.innerHTML = "";
      const Url = `${API_BASE_URL}/name/${e.target.value}`;
      let response = await fetch(Url);
      let data = await response.json();
      renderCountriesData(data);
      e.target.value = "";
    }
  }
});

// Filter Functionality

const createFilterOptions = async () => {
  let Url = `${API_BASE_URL}/all`;

  let response = await fetch(Url);
  let data = await response.json();

  let regions = [...new Set(data.map(({ region }) => region))];
  regions.sort((a, b) => a.localeCompare(b));

  regions.forEach((region) => {
    const option = document.createElement("option");
    option.innerText = region;
    option.value= region;
    filter.appendChild(option);
  });
};
// Check if the user is coming from a different page
if (performance.getEntriesByType("navigation")[0].type==="reload") {
  localStorage.removeItem("regionFilter");
}

window.addEventListener("load", () => {

  const regionFilter = localStorage.getItem("regionFilter");
  console.log(regionFilter);
  if (regionFilter) {
    filter.value = regionFilter;
    filter.dispatchEvent(new Event("change"));
  
  }
});
// Search by Filter
filter.addEventListener("change",  (event) => {
  localStorage.setItem('regionFilter', event.target.value)
  
 showFilterData(event.target.value);
});
// Search by Filter
const showFilterData =async(event)=>{
  if (event === "") return;
  if (event === "Filter by Region") return;

const Url = `${API_BASE_URL}/region/${event}`;
  let response = await fetch(Url);
  let data = await response.json();
  renderCountriesData(data);}

showAllCountries();
createFilterOptions();
