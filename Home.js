const CardContainer = document.getElementById("CardsContainer");
let inputSearch = document.getElementById("myInput");
const filter = document.getElementById("filter");
const toggleMode = document.getElementById("toggle-mode");

let switchMode = localStorage.getItem("switchMode");
let allCountriesdata;

// Home page Show all country data
const ShowAllCountries = async () => {
  const Url = "https://restcountries.com/v3.1/all";

  let response = await fetch(Url);
  let data = await response.json();

  RenderFetchData(data);
  allCountriesdata = data;
};

// Component to fetch country data
const RenderFetchData = (data) => {
  CardContainer.innerHTML = "";
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

    CardContainer.appendChild(card);
  });
};

window.addEventListener("pageshow", (e) => {
  // Check if the current page is the main page
  if (
    e.persisted ||
    (window.performance && window.performance.navigation.type === 2)
  ) {
    // Clear the value of the search input field
    inputSearch.value = "";
  }
});
//Toggle botton logic

toggleMode.addEventListener("click", () => {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let targetTheme = "";
  console.log(currentTheme);

  if (currentTheme === "light") {
    targetTheme = "dark";
    toggleMode.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
  } else if (currentTheme === "dark") {
    targetTheme = "light";
    toggleMode.innerHTML = `<i class="fa-regular fa-moon"></i>Dark Mode`;
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
});

window.addEventListener("load", () => {
  let theme = localStorage.getItem("theme");
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "light") {
      toggleMode.innerHTML = `<i class="fa-regular fa-moon"></i>Dark Mode`;
    } else {
      toggleMode.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
    }
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    toggleMode.innerHTML = `<i class="fa-regular fa-moon"></i>Dark Mode`;
  }
});

// Search by country name

inputSearch.addEventListener("input", (e) => {
  const filterCountries = allCountriesdata.filter((countries) =>
    countries.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  RenderFetchData(filterCountries);
});

// Filter Functionality

const filterRegion = async () => {
  let Url = "https://restcountries.com/v3.1/all";

  let response = await fetch(Url);
  let data = await response.json();

  let regions = [...new Set(data.map(({ region }) => region))];
  regions.sort((a, b) => a.localeCompare(b));

  regions.forEach((region) => {
    const option = document.createElement("option");
    option.innerText = region;
    filter.appendChild(option);
  });
};

filter.addEventListener("change", async (event) => {
  if (event.target.value === "") return;
  if (event.target.value === "Filter by Region") return;

  const Url = `https://restcountries.com/v3.1/region/${event.target.value}`;
  let response = await fetch(Url);
  let data = await response.json();
  RenderFetchData(data);
});

// window.addEventListener("load", toggleFunction);
ShowAllCountries();
filterRegion();
