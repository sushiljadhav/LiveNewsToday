/* Author: 

*/

var selectElement = document.getElementById("state");
function stateDataReceive() {
  const request = new XMLHttpRequest();
  const stateurl = "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json";
  request.open('GET',stateurl,true);
  request.onload = function() {
  if(this.status == 200) {
    const stateData = JSON.parse(this.responseText);
    for ( const statename in stateData) {
      var option = document.createElement('option');
      option.innerHTML= stateData[statename] ;
      option.value = statename;
      selectElement.appendChild(option);
    }
    var firstoption = selectElement.querySelector("option:first-child").getAttribute("value");
    covidCases(firstoption);
  }
  else {
    console.log("could Not Load");
    }
  }
  request.send();
}
stateDataReceive();

// onState Change Value
selectElement.addEventListener("change",(e)=> {
  e.preventDefault();
  var stateName=e.target.value;
  covidCases(stateName);
})

// Function for bind covid Data
function covidCases(stateName) {
  let totalCases = document.querySelector(".total-cases");
  let totalDeaths = document.querySelector(".death-cases");
  const request = new XMLHttpRequest();
  request.open('GET','https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=US_MAP_DATA',true);
  request.onload = function() {
    if (this.status == 200) {
      const covidDataResponse = JSON.parse(this.responseText);
      var covidDataArray = covidDataResponse['US_MAP_DATA'];
      for (var i= 0 ; i < covidDataArray.length ; i++) {
        if(covidDataArray[i]['abbr'] == stateName) {
          totalCases.innerText = covidDataArray[i].tot_cases; 
          totalDeaths.innerText = covidDataArray[i].tot_death
        }
      }
    }else {
      console.log("Data Not found");
    }
  
  }
  request.send();
}

// Tabs Functionality 

var liList =document.querySelectorAll("#subnews-tab > li > a");
var tab = document.querySelectorAll(".tab-parent > .tab_content");
for(var i=0 ; i < liList.length ; i++) {
  liList[i].addEventListener("click",function(e) {
    e.preventDefault();
    var $this= this;
    liList.forEach((item)=> {
      if($this == item) {
        item.classList.add("active");
        for(var i=0 ; i < tab.length ; i++) {
          if(tab[i].getAttribute("data-attribute") == item.getAttribute("data-attribute")){
            tab[i].classList.add("tab_active");
          }else {
            tab[i].classList.remove("tab_active");
          }
        }
      }else {
        item.classList.remove("active");
      }
    })
  })
}

// video modal functionality
const vidupElements = document.querySelectorAll('[data-vidup]');
const modal = document.getElementById('modal');
const modalVideo = document.getElementById('modal-video');
const mdc = document.getElementById('mdc');
const close = document.getElementById('close');

function closeModal() {
  mdc.style.transform = "scale(0)";
  setTimeout(() => {
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
      modalVideo.src = "";  
  }, 500);
}

function showModal(element) {
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
  modalVideo.src = element.getAttribute("data-attribute");
  mdc.style.width = "100%";
  setTimeout(() => {
      mdc.style.transform = "scale(1)";
  }, 300);
}

/* Foreach element add an eventlistener and show the popup when clicked and add the src in the link */
vidupElements.forEach(element => {
    element.addEventListener("click", (e) => {
        e.preventDefault();
        showModal(element);
    });
});

close.addEventListener('click', (e) => {
    closeModal();
});

mdc.addEventListener('click', () => {
    closeModal();
});

modal.addEventListener('click', () => {
    closeModal();
});

// Scroll Top button functionality

var mybutton = document.getElementById("myBtn");

window.onscroll = function() {
  scrollFunction()
};

mybutton.addEventListener("click",()=> {
  topFunction();
})

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


var hamburger = document.querySelector(".burger");
var nav = document.querySelector("nav");
console.log(hamburger);

hamburger.addEventListener("click",()=>{
  var b = hamburger.classList.contains("active-hamburger");
  if(b) {
    hamburger.classList.remove("active-hamburger");
    nav.classList.remove("active-nav");
  }else {
    hamburger.classList.add("active-hamburger");
    nav.classList.add("active-nav");
  }
})












