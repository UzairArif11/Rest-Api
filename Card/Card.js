const CardContainer = document.getElementById("CardsContainer");
const backButton = document.getElementById("backButton");
const toggleMode = document.getElementById("toggle-mode");
const Body = document.querySelector("body");
const Navbar = document.getElementById("Navbar");
const card = document.getElementById('card2')
let dataTransfer = false;
let switchMode = localStorage.getItem("switchMode");

// Home page Show all country data
const ShowAllCountries = () => {
  var value = localStorage.getItem("value");
  const Url = `https://restcountries.com/v3.1/name/${value}`;
  backButton.style.display = "block";

  RenderFetchData(Url);
  toggleFunction();
};
// Component to fetch country data
const RenderFetchData = async (Url) => {
  try {
    let response = await fetch(Url);
    let data = await response.json();

    data.map((element) => {
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
         <p>Top Level Domain: ${element.tld}</p>
         <p>Currencies: ${Object.values(element.currencies)[0].name}</p>
         <p>Languages: ${Object.values(element.languages)[0]}</p>
    </div>
    
    <div  '>
        <p class='borderCountry'>Border Countries:
        ${element.borders}
        </p>
    </div>
     </div>`;

     toggleFunction();
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

const toggleFunction = () => {
  if (switchMode === "false") {
    Body.style.backgroundColor = "#3B4959";
    Navbar.style.backgroundColor = "#2D3743";
    Navbar.style.color = "white";
    Array.from(document.getElementsByClassName("card2")).forEach(
      (e) => (e.style.backgroundColor = "#3B4959")
    );
    Array.from(document.getElementsByClassName("card2")).forEach(
      (e) => (e.style.color = "white")
    );

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
  }

};
toggleMode.addEventListener("click", () => {
 switchMode=switchMode==="true" ? "false" : "true";
 toggleFunction();
});

// window.addEventListener("load",toggleFunction);
ShowAllCountries();
toggleFunction();
