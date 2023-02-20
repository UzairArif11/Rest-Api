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

    let borderingCountries = [];
    await Promise.all(
      data.map(async (element) => {
        let arr = [];
        try {
          await Promise.all(
            element.borders.map(async (e) => {
              const response = await fetch(
                `https://restcountries.com/v3.1/alpha/${e}`
              );
              const data = await response.json();
              arr.push(data[0].name.common);
            })
          );

          borderingCountries = arr.sort((a, b) => a.localeCompare(b));
        } catch (err) {
          console.log(err);
          return "Error fetching bordering countries";
        }
      })
    );

    data.map((element) => {
      let Mode = borderingCountries;
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
             ? Object.values(element.languages).sort((a, b) =>
                 a.localeCompare(b)
               )
             : "No Languages Available"
         }</p>
    </div></div>

    <div class="des3">
      <p class='borderCountry'><b>Border Countries:</b>
        ${
          element.borders && element.borders.length
            ? Mode.map((name) => {
                return `<button class="border">${name}</button>`;
              }).join("")
            : "No Border"
        }
      </p>
    </div>`;
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

// window.addEventListener("load",toggleFunction);
ShowAllCountries();
