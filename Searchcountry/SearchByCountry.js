const CardContainer = document.getElementById("CardsContainer");
const inputSearch = document.getElementById("myInput");
const backButton = document.getElementById("backButton");
const filter = document.getElementById("filter");
const toggleMode = document.getElementById("toggle-mode");

let switchMode = localStorage.getItem("switchMode");
// Home page Show all country data
const ShowAllCountries = () => {
  var value = localStorage.getItem("value");
  CardContainer.innerHTML = "";
  const Url = `https://restcountries.com/v3.1/name/${value}?fullText=true`;
  backButton.style.display = "block";
  RenderFetchData(Url);
};
// Component to fetch country data
const RenderFetchData = async (Url) => {
  try {
    let response = await fetch(Url);
    let data = await response.json();

    data.map((element) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<div class="image"><img src=${
        element.flags.png
      } alt="flag image"></div>
     <div class="description">
     <div  >
         <h2>${element.name.official}</h2>
         <p><b>Population: </b> ${element.population.toLocaleString()}</p>
         <p><b>Region: </b> ${element.region}</p>
         <p><b>Capital: </b> ${element.capital}</p>
    </div>
     </div>`;

      card.addEventListener("click", () => {
        window.location.assign("../Card/Card.html");
        window.location.assign(newUrl);
        localStorage.setItem("value", element.name.common);
        localStorage.setItem("switchMode", switchMode);
      });

      CardContainer.appendChild(card);

      //OnClick Card Showing detail of country
    });
  } catch (error) {
    console.log(error);
  }
};
// Back botton and Toggle botton logic

backButton.addEventListener("click", () => {
  localStorage.setItem("switchMode", switchMode);
  history.back();
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
toggleMode.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
});

window.addEventListener("load", () => {
  let theme = localStorage.getItem("theme");
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "light") {
      toggleMode.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
    } else {
       toggleMode.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
    }
  }else{
    document.documentElement.setAttribute("data-theme", "light");
    toggleMode.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
  }
});
// Search by country name

inputSearch.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (e.target.value) {
      location.reload();
      localStorage.setItem("value", e.target.value);
      e.target.value = "";
      localStorage.setItem("switchMode", switchMode);

    }
  }
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

filter.addEventListener("change", (event) => {
  if (event.target.value === "") return;
  if (event.target.value === "Filter by Region") return;

  CardContainer.innerHTML = "";
  const Url = `https://restcountries.com/v3.1/region/${event.target.value}`;
  backButton.style.display = "block";
  RenderFetchData(Url);
});

// window.addEventListener("load", filterRegion);
ShowAllCountries();
filterRegion();
