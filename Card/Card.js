const CardContainer = document.getElementById("CardsContainer");
const backButton = document.getElementById("backButton");
const toggleMode = document.getElementById("toggle-mode");
const body = document.querySelector("body");
const Navbar = document.getElementById("Navbar");
const card = document.getElementById('card2')
let dataTransfer = false;
let switchMode = localStorage.getItem("switchMode");

// Home page Show all country data
const ShowAllCountries = () => {
  var value = localStorage.getItem("value");
  const Url = `https://restcountries.com/v3.1/name/${value}?fullText=true`;
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
      card.innerHTML = 
      `<div class="image2"><img src=${
        element.flags.png
      } alt="flag image"></div>
     
      <div class="des1">
         <h2  style="font-weight: bold;"><b>${element.name.common}</b></h1>
         <p ><b> Native Name:</b> ${
           Object.values(element.name.nativeName)[0].common ||
           element.name.nativeName
         }</p>
         <p><b>Population: </b>${element.population}</p>
         <p><b>Region: </b>${element.region}</p>
         <p ><b>Sub Region:</b> ${element.subregion}</p>
         <p><b>Capital: </b>${element.capital}</p>
    </div>

    <div class="des2" >
         <p><b>Top Level Domain: </b>${element.tld}</p>
         <p><b>Currencies:</b> ${Object.values(element.currencies)[0].name}</p>
         <p><b>Languages: </b>${Object.values(element.languages)[0]}</p>
    </div>
    
    <div class="des3">
        <p class='borderCountry'><b>Border Countries:</b>
       <span> ${element.borders}</span>
        </p>
    </div>
     `;

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
    body.style.backgroundColor = "#3B4959";
    Navbar.style.backgroundColor = "#2D3743";
    Navbar.style.color = "white";
    card.style.backgroundColor = "#3B4959";
    card.style.color = "white";
  

  } else {
    body.style.backgroundColor = "hsl(0, 0%, 98%)";
    Navbar.style.backgroundColor = " hsl(0, 0%, 100%)";
    Navbar.style.color = "hsl(0, 0%, 52%)";
    card.style.backgroundColor = " hsl(0, 0%, 100%)";
    card.style.color = "black";
  }

};
toggleMode.addEventListener("click", () => {
 switchMode=switchMode==="true" ? "false" : "true";
 toggleFunction();
});

// window.addEventListener("load",toggleFunction);
ShowAllCountries();
toggleFunction();
