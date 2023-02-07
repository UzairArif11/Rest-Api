const CardContainer = document.getElementById("CardsContainer");
const inputSearch = document.getElementById("myInput");
const backButton = document.getElementById("backButton");
const filter = document.getElementById("filter");
const toggleMode = document.getElementById("toggle-mode");
const Body = document.querySelector("body");
const Navbar = document.getElementById("Navbar");

let switchMode = false;

// Home page Show all country data
const ShowAllCountries = () => {
  const Url = "https://restcountries.com/v3.1/all";
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
      //OnClick Card Showing detail of country
      card.addEventListener("click", () => {
        window.location.assign(
          "file:///C:/Users/HP/Desktop/Rest%20Api/Card.html"
        );
        sessionStorage.setItem("value", element.name.common);
      });

      CardContainer.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
};
backButton.addEventListener("click", () => {
  location.reload();
});
//Toggle botton logic

toggleMode.addEventListener("change", () => {
  if (switchMode) {
    Body.style.backgroundColor = "rgb(74, 77, 84)";
    Navbar.style.backgroundColor = "rgb(59, 63, 73)";
    Navbar.style.color = "white";
    inputSearch.style.backgroundColor = "rgb(59, 63, 73)";
    inputSearch.style.color = "white";
    filter.style.backgroundColor = "rgb(59, 63, 73)";
    filter.style.color = "white";
    Array.from(document.getElementsByClassName("card")).forEach(
      (e) => (e.style.backgroundColor = "rgb(59, 63, 73)")
    );
    Array.from(document.getElementsByClassName("card")).forEach(
      (e) => (e.style.color = "white")
    );
    Array.from(document.getElementsByClassName("card2")).forEach(
      (e) => (e.style.backgroundColor = "rgb(59, 63, 73)")
    );
    Array.from(document.getElementsByClassName("card2")).forEach(
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
    Array.from(document.getElementsByClassName("card2")).forEach(
      (e) => (e.style.backgroundColor = " hsl(0, 0%, 100%)")
    );
    Array.from(document.getElementsByClassName("card2")).forEach(
      (e) => (e.style.color = "black")
    );
    switchMode = true;
  }
});
// Search by country name

inputSearch.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    window.location.assign(
      "file:///C:/Users/HP/Desktop/Rest%20Api/SearchByCountry.html"
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

filter.addEventListener("change", (event) => {
  if (event.target.value === "") return;

  CardContainer.innerHTML = "";
  const Url = `https://restcountries.com/v3.1/region/${event.target.value}`;
  backButton.style.display = "block";
  RenderFetchData(Url);
});

// window.addEventListener("load", filterRegion);
ShowAllCountries();
filterRegion();
