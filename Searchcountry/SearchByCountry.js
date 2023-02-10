const CardContainer = document.getElementById("CardsContainer");
const inputSearch = document.getElementById("myInput");
const filter = document.getElementById("filter");
const backButton = document.getElementById("backButton");
const toggleMode = document.getElementById("toggle-mode");
const Body = document.querySelector("body");
const Navbar = document.getElementById("Navbar");
let dataTransfer = false;
let switchMode = false;

// Home page Show all country data
const ShowAllCountries = () => {
  var value = sessionStorage.getItem("value");
  CardContainer.innerHTML = "";
  const Url = `https://restcountries.com/v3.1/name/${value}`;
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
      card.innerHTML = `<div class="image"><img src=${element.flags.png} alt="flag image"></div>
     <div class="description">
     <div  >
         <h1>${element.name.common}</h1>
         <p>Population: ${element.population}</p>
         <p>Region: ${element.region}</p>
         <p>Capital: ${element.capital}</p>
    </div>
     </div>`;

      card.addEventListener("click", () => {
        window.location.assign(
          "file:///C:/Users/HP/Desktop/Rest%20Api/Card.html"
        );
        sessionStorage.setItem("value", element.name.common);
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
  history.back();
});
toggleMode.addEventListener("change", () => {
  if (switchMode) {
    Body.style.backgroundColor = "#3B4959";
    Navbar.style.backgroundColor = "#2D3743";
    Navbar.style.color = "white";
    inputSearch.style.backgroundColor = "#2D3743";
    inputSearch.style.color = "white";
    filter.style.backgroundColor = "#2D3743";
    filter.style.color = "white";
    Array.from(document.getElementsByClassName("card")).forEach(
      (e) => (e.style.backgroundColor = "#2D3743")
    );
    Array.from(document.getElementsByClassName("card")).forEach(
      (e) => (e.style.color = "white")
    );

    switchMode = false;
  } else {
    Body.style.backgroundColor = "hsl(0, 0%, 98%)";
    Navbar.style.backgroundColor = " hsl(0, 0%, 100%)";
    Navbar.style.color = "hsl(0, 0%, 52%)";
    inputSearch.style.backgroundColor = " hsl(0, 0%, 100%)";
    inputSearch.style.color = "hsl(0, 0%, 52%)";
    filter.style.backgroundColor = " hsl(0, 0%, 100%)";
    filter.style.color = "hsl(0, 0%, 52%)";
    Array.from(document.getElementsByClassName("card")).forEach(
      (e) => (e.style.backgroundColor = " hsl(0, 0%, 100%)")
    );
    Array.from(document.getElementsByClassName("card")).forEach(
      (e) => (e.style.color = "black")
    );

    switchMode = true;
  }
});
// Search by country name

inputSearch.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    window.location.assign(
      "file:///C:/Users/HP/Desktop/Rfile:///C:/Users/HP/Desktop/Rest%20Api/Searchcountry/SearchByCountry.htmlest%20Api/SearchByCountry.html"
    );
    sessionStorage.setItem("value", e.target.value);
  }
});

// Filter Functionality

const filterRegion = async () => {
  let Url = "https://restcountries.com/v3.1/all";

  let response = await fetch(Url);
  let data = await response.json();
  data.map((element) => {
    const option = document.createElement("option");
    option.innerText = element.region;
    filter.appendChild(option);
  });
};

filter.addEventListener("click", (event) => {
  if (event.target.value === "") return;

  CardContainer.innerHTML = "";
  const Url = `https://restcountries.com/v3.1/region/${event.target.value}`;
  backButton.style.display = "block";
  RenderFetchData(Url);
});

// window.addEventListener("load", filterRegion);
ShowAllCountries();
filterRegion();
