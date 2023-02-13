const CardContainer = document.getElementById("CardsContainer");
const backButton = document.getElementById("backButton");
const toggleMode = document.getElementById("toggle-mode");
const card = document.getElementById("card2");

let switchMode = localStorage.getItem("switchMode");

// Home page Show all country data
const ShowAllCountries = () => {
  var value = localStorage.getItem("value");
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
      card.innerHTML = `<div class="image2"><img src=${
        element.flags.png
      } alt="flag image"></div>
     
      <div class="des1">
         <h2>${element.name.common}</h2>
         <p><b> Native Name:</b> ${
           Object.values(element.name.nativeName)[0].common ||
           element.name.nativeName
         }</p>
         <p><b>Population: </b>${element.population.toLocaleString()}</p>
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
       ${
         element.borders
           ? element.borders
               .map((e) => `<button class=button>${e} </button> `)
               .join(" ")
           : `No Border`
       }
        </p>
    </div>
     `;
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
    toggleMode.innerHTML = `<b><i class="fa-solid fa-sun"></i> Light Mode</b>`;
  } else if (currentTheme === "dark") {
    targetTheme = "light";
    toggleMode.innerHTML = `<b><i class="fa-solid fa-moon"></i> Dark Mode</b>`;
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
});

window.addEventListener("load", () => {
  let theme = localStorage.getItem("theme");
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "light") {
      toggleMode.innerHTML = `<b><i class="fa-solid fa-moon"></i> Dark Mode</b>`;
    } else {
      toggleMode.innerHTML = `<b><i class="fa-solid fa-sun"></i> Light Mode</b>`;
    }
  }
});

// window.addEventListener("load",toggleFunction);
ShowAllCountries();
