const CardContainer = document.getElementById("CardsContainer");
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
      card.classList.add("card2");
      card.innerHTML = `<div class="image2"><img src=${
        element.flags.png
      } alt="flag image"></div>
     <div class="description">
     <div  >
         <h1>${element.name.common}</h1>
         <p > Native Name: ${
           Object.values(element.name.nativeName)[0].common ||
           element.name.nativeName
         }</p>
         <p>Population: ${element.population}</p>
         <p>Region: ${element.region}</p>
         <p >Sub Region: ${element.subregion}</p>
         <p>Capital: ${element.capital}</p>
    </div>
    <div  '>
         <p>Top Level Domain: ${element.capital}</p>
         <p>Currencies: ${element.capital}</p>
         <p>Languages: ${Object.values(element.languages)[0]}</p>
    </div>
    
    <div  '>
        <p class='borderCountry'>Border Countries:
        ${element.borders}
        </p>
    </div>
     </div>`;

      CardContainer.appendChild(card);
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
    Body.style.backgroundColor = "rgb(74, 77, 84)";
    Navbar.style.backgroundColor = "rgb(59, 63, 73)";
    Navbar.style.color = "white";

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

    Array.from(document.getElementsByClassName("card2")).forEach(
      (e) => (e.style.backgroundColor = " hsl(0, 0%, 100%)")
    );
    Array.from(document.getElementsByClassName("card2")).forEach(
      (e) => (e.style.color = "black")
    );
    switchMode = true;
  }
});

// window.addEventListener("load", filterRegion);
ShowAllCountries();
