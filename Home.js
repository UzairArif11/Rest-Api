const CardContainer= document.getElementById('CardsContainer');
const inputSearch=document.getElementById('myInput');
const filter = document.getElementById("filter");
const backButton=document.getElementById('backButton')
const toggleMode=document.getElementById('toggle-mode')
const Body=document.querySelector('body')
const Navbar=document.getElementById('Navbar')
let dataTransfer= false;
let switchMode=false;

// Home page Show all country data
const  ShowAllCountries=()=>{
    const  Url='https://restcountries.com/v3.1/all'
    RenderFetchData(Url);
   
}
 // Component to fetch country data
const RenderFetchData=async(Url)=>{
    try {
        let response=await fetch(Url);
    let data =await response.json();

    data.map(element => {
     const card=document.createElement('div');
     card.classList.add("card");
     card.innerHTML=`<div class="image"><img src=${element.flags.png} alt="flag image"></div>
     <div class="description">
     <div  >
         <h1>${element.name.common}</h1>
         <p class='detail-page'> Native Name: ${Object.values(element.name.nativeName)[0].common}</p>
         <p>Population: ${element.population}</p>
         <p>Region: ${element.region}</p>
         <p class='detail-page'>Sub Region: ${element.subregion}</p>
         <p>Capital: ${element.capital}</p>
    </div>
    <div class='detail-page '>
         <p>Top Level Domain: ${element.capital}</p>
         <p>Currencies: ${element.capital}</p>
         <p>Languages: ${element.languages}</p>
    </div>
    
    <div class='detail-page '>
        <p class='borderCountry'>Border Countries:
        ${element.borders}
        </p>
    </div>
     </div>`;

     card.addEventListener('click', () => {
    CardContainer.innerHTML="";
   const  Url=`https://restcountries.com/v3.1/name/${element.name.common}`;
   backButton.style.display='block';
   
   RenderFetchData(Url);
   dataTransfer=true;
   })
 
     CardContainer.appendChild(card);

     //OnClick Card Showing detail of country
     if(dataTransfer){
        //   Adding classes for detail page
        
        let details = document.querySelectorAll('.detail-page');
        details.forEach((e)=>{
          e.classList.remove('detail-page');
         
})
        
        let Carddetails = document.querySelectorAll('.card');
        Carddetails.forEach((e)=>{
          e.classList.remove('card');
          e.classList.add('card2');
})
        
        let Imagedetails = document.querySelectorAll('.image');
        Imagedetails.forEach((e)=>{
            e.classList.remove('image');
             e.classList.add('image2');
        })
       

}
    })

    } catch (error) {
        console.log(error)
    }
}
// Back botton and Toggle botton logic
backButton.addEventListener('click',()=>{window.location.reload()})
toggleMode.addEventListener('change', () => {
    
    if (switchMode) {
      Body.style.backgroundColor = 'rgb(74, 77, 84)';
       Navbar.style.backgroundColor= 'rgb(59, 63, 73)';
       Navbar.style.color= 'white';
       inputSearch.style.backgroundColor= 'rgb(59, 63, 73)';
       inputSearch.style.color= 'white';
       filter.style.backgroundColor= 'rgb(59, 63, 73)';
       filter.style.color= 'white';
       Array.from(document.getElementsByClassName("card")).forEach((e)=> e.style.backgroundColor= 'rgb(59, 63, 73)');
       Array.from(document.getElementsByClassName("card")).forEach((e)=> e.style.color= 'white');
       Array.from(document.getElementsByClassName("card2")).forEach((e)=> e.style.backgroundColor= 'rgb(59, 63, 73)');
       Array.from(document.getElementsByClassName("card2")).forEach((e)=> e.style.color= 'white');
      switchMode = false;
    } else {
        Body.style.backgroundColor = 'hsl(0, 0%, 98%)';
         Navbar.style.backgroundColor= ' hsl(0, 0%, 100%)';
         Navbar.style.color= 'hsl(0, 0%, 52%)';
         inputSearch.style.backgroundColor= ' hsl(0, 0%, 100%)';
         inputSearch.style.color= 'hsl(0, 0%, 52%)';
         filter.style.backgroundColor= ' hsl(0, 0%, 100%)';
         filter.style.color= 'hsl(0, 0%, 52%)';     
         Array.from(document.getElementsByClassName("card")).forEach((e)=> e.style.backgroundColor= ' hsl(0, 0%, 100%)');
         Array.from(document.getElementsByClassName("card")).forEach((e)=> e.style.color= 'black');
         Array.from(document.getElementsByClassName("card2")).forEach((e)=> e.style.backgroundColor= ' hsl(0, 0%, 100%)');
         Array.from(document.getElementsByClassName("card2")).forEach((e)=> e.style.color= 'black');
      switchMode = true;
    }
  });
// Search by country name 

inputSearch.addEventListener('keyup', (e) => {
  
    if (e.key === 'Enter') {
      CardContainer.innerHTML = '';
      const Url = `https://restcountries.com/v3.1/name/${e.target.value}`;
      backButton.style.display = 'block';
      RenderFetchData(Url);
    }
  });

// Filter Functionality



const filterRegion = async () => {
 
  let Url = 'https://restcountries.com/v3.1/all';

  let response = await fetch(Url);
  let data = await response.json();
  data.map(element => {
    const option = document.createElement("option");
    option.innerText = element.region;
    filter.appendChild(option);
  });
};

filter.addEventListener("change", event => {
  if (event.target.value === "") return;

  CardContainer.innerHTML = "";
  const Url = `https://restcountries.com/v3.1/region/${event.target.value}`;
  backButton.style.display = "block";
  RenderFetchData(Url);
});

// window.addEventListener("load", filterRegion);
ShowAllCountries();
filterRegion();