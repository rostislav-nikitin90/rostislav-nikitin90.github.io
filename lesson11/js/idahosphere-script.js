// to display the information banner on Preston Town Page only if the day of the week is currently Friday
let thedate = new Date();
if (thedate.getDay() == 5) {
    document.querySelector('.info-banner').style.display = 'block';
}

// to display the menu on all pages of the weather site
function toggleMenu() {
    document.getElementById("menu").classList.toggle("hide");
}

// to display the current date in the footer on all pages of the Weather Site
const currentdate = document.querySelector('#date');
const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-UK", {
	dateStyle: "full" }).format(now);

currentdate.innerHTML = `<em>${fulldate}</em>`;

// to display the town data on the Weather Site Home Page
const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing
  const towns = jsonObject['towns'];

  const town = towns.filter(town => town.name == 'Preston' || town.name == 'Soda Springs' || town.name == "Fish Haven")
  
  town.forEach(town => {
    let box = document.createElement('section');
    let h2 = document.createElement('h2');
    let h3 = document.createElement('h3');
    let par1 = document.createElement('p');
    let par2 = document.createElement('p');
    let par3 = document.createElement('p');
    let img = document.createElement('img');

    h2.textContent = town.name;
    box.appendChild(h2);

    h3.textContent = town.motto;
    box.appendChild(h3);

    par1.textContent = 'Year Founded:' + ' ' + town.yearFounded;
    box.appendChild(par1);

    par2.textContent = 'Population:' + ' ' + town.currentPopulation;
    box.appendChild(par2);

    par3.textContent = 'Annual Rain Fall:' + ' ' + town.averageRainfall;
    box.appendChild(par3);

    img.setAttribute('src', "images/" + town.photo);
    img.setAttribute('alt', town.name);
    box.appendChild(img);

    document.querySelector('div.towns').appendChild(box);
  })

});

// to display the current weather summary and 5 day forecast on the Preston Town Page
const PrestonapiURL1 = "https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&appid=12f91a41bd21c1ca9341109b7e228eab";
fetch(PrestonapiURL1)
  .then((response) => response.json())
  .then((jsonObject) => {
    console.log(jsonObject);
    document.getElementById('preston-current-weather-condition-description').textContent = jsonObject.weather[0].description; 
    document.getElementById('preston-current-temp').textContent = jsonObject.main.temp.toFixed(0) + ' °F';
    document.getElementById('preston-humidity').textContent = jsonObject.main.humidity + '%';
    document.getElementById('preston-windspeed').textContent = jsonObject.wind.speed.toFixed(0) + 'mph';
  });

  const PrestonapiURL2 = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&appid=12f91a41bd21c1ca9341109b7e228eab";
  fetch(PrestonapiURL2)
    .then((response) => response.json())
    .then((jsonObject) => {
      console.log(jsonObject);
      const dayofWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      const list = jsonObject.list.filter(list => list.dt_txt.includes("18:00:00"));
      console.log(list);
  
      list.forEach(list => {
        let box = document.createElement('section');
        let d = new Date(list.dt_txt);
        let p1 = document.createElement('p');
        let img = document.createElement('img');
        let p2 = document.createElement('p');

        p1.textContent = dayofWeek[d.getDay()];
        box.appendChild(p1);
  
        img.setAttribute('src', "https://openweathermap.org/img/wn/" + list.weather[0].icon + ".png");
        img.setAttribute('alt', "Weather icon:" + ' ' + list.weather[0].icon);
        box.appendChild(img);
  
        p2.textContent = list.main.temp.toFixed(0) + ' °F';
        box.appendChild(p2);

        document.querySelector('div.preston-5day-forecast').appendChild(box);
    });
  
  });

// to display the current weather summary and 5 day forecast on the Soda Springs Town Page
  const SodaSpringsapiURL1 = "https://api.openweathermap.org/data/2.5/weather?id=5607916&units=imperial&appid=12f91a41bd21c1ca9341109b7e228eab";
fetch(SodaSpringsapiURL1)
  .then((response) => response.json())
  .then((jsonObject) => {
    console.log(jsonObject);
    document.getElementById('soda-springs-current-weather-condition-description').textContent = jsonObject.weather[0].description; 
    document.getElementById('soda-springs-current-temp').textContent = jsonObject.main.temp.toFixed(0) + ' °F';
    document.getElementById('soda-springs-humidity').textContent = jsonObject.main.humidity + '%';
    document.getElementById('soda-springs-windspeed').textContent = jsonObject.wind.speed.toFixed(0) + 'mph';
  });

  const SodaSpringsapiURL2 = "https://api.openweathermap.org/data/2.5/forecast?id=5607916&units=imperial&appid=12f91a41bd21c1ca9341109b7e228eab";
  fetch(SodaSpringsapiURL2)
    .then((response) => response.json())
    .then((jsonObject) => {
      console.log(jsonObject);
      const dayofWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      const list = jsonObject.list.filter(list => list.dt_txt.includes("18:00:00"));
      console.log(list);
  
      list.forEach(list => {
        let box = document.createElement('section');
        let d = new Date(list.dt_txt);
        let p1 = document.createElement('p');
        let img = document.createElement('img');
        let p2 = document.createElement('p');

        p1.textContent = dayofWeek[d.getDay()];
        box.appendChild(p1);
  
        img.setAttribute('src', "https://openweathermap.org/img/wn/" + list.weather[0].icon + ".png");
        img.setAttribute('alt', "Weather icon:" + ' ' + list.weather[0].icon);
        box.appendChild(img);
  
        p2.textContent = list.main.temp.toFixed(0) + ' °F';
        box.appendChild(p2);

        document.querySelector('div.soda-springs-5day-forecast').appendChild(box);
    });
  
  });

  // to display the current weather summary and 5 day forecast on the Fish Haven Town Page
  const FishHavenapiURL1 = "https://api.openweathermap.org/data/2.5/weather?id=5585010&units=imperial&appid=12f91a41bd21c1ca9341109b7e228eab";
  fetch(FishHavenapiURL1)
    .then((response) => response.json())
    .then((jsonObject) => {
      console.log(jsonObject);
      document.getElementById('fish-haven-current-weather-condition-description').textContent = jsonObject.weather[0].description; 
      document.getElementById('fish-haven-current-temp').textContent = jsonObject.main.temp.toFixed(0) + ' °F';
      document.getElementById('fish-haven-humidity').textContent = jsonObject.main.humidity + '%';
      document.getElementById('fish-haven-windspeed').textContent = jsonObject.wind.speed.toFixed(0) + 'mph';
    });

    const FishHavenapiURL2 = "https://api.openweathermap.org/data/2.5/forecast?id=5585010&units=imperial&appid=12f91a41bd21c1ca9341109b7e228eab";
    fetch(FishHavenapiURL2)
      .then((response) => response.json())
      .then((jsonObject) => {
        console.log(jsonObject);
        const dayofWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
        const list = jsonObject.list.filter(list => list.dt_txt.includes("18:00:00"));
        console.log(list);
    
        list.forEach(list => {
          let box = document.createElement('section');
          let d = new Date(list.dt_txt);
          let p1 = document.createElement('p');
          let img = document.createElement('img');
          let p2 = document.createElement('p');
  
          p1.textContent = dayofWeek[d.getDay()];
          box.appendChild(p1);
    
          img.setAttribute('src', "https://openweathermap.org/img/wn/" + list.weather[0].icon + ".png");
          img.setAttribute('alt', "Weather icon:" + ' ' + list.weather[0].icon);
          box.appendChild(img);
    
          p2.textContent = list.main.temp.toFixed(0) + ' °F';
          box.appendChild(p2);
  
          document.querySelector('div.fish-haven-5day-forecast').appendChild(box);
      });
    
    });

// to display the upcoming town events on the Preston Town Page
const prestonTowndata = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(prestonTowndata)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);
  const towns = jsonObject['towns'];

  const town = towns.filter(town => town.name == 'Preston')
  
  town.forEach(town => {
    let box = document.createElement('section');
    let h3 = document.createElement('h3');
    let par1 = document.createElement('p');
    let par2 = document.createElement('p');
    let par3 = document.createElement('p');

    h3.textContent = 'Upcoming Town Events';
    box.appendChild(h3);

    par1.textContent = town.events[0];
    box.appendChild(par1);

    par2.textContent = town.events[1];
    box.appendChild(par2);

    par3.textContent = town.events[2];
    box.appendChild(par3);

    document.querySelector('div.preston-events').appendChild(box);
  });

});

// to display the upcoming town events on the Soda Springs Town Page
const SodaSpringsTowndata = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(SodaSpringsTowndata)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);
  const towns = jsonObject['towns'];

  const town = towns.filter(town => town.name == 'Soda Springs')
  
  town.forEach(town => {
    let box = document.createElement('section');
    let h3 = document.createElement('h3');
    let par1 = document.createElement('p');
    let par2 = document.createElement('p');
    let par3 = document.createElement('p');

    h3.textContent = 'Upcoming Town Events';
    box.appendChild(h3);

    par1.textContent = town.events[0];
    box.appendChild(par1);

    par2.textContent = town.events[1];
    box.appendChild(par2);

    par3.textContent = town.events[2];
    box.appendChild(par3);

    document.querySelector('div.soda-springs-events').appendChild(box);
  });

});

// to display the upcoming town events on the Fish Haven Town Page
const FishHavenTowndata = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(FishHavenTowndata)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);
  const towns = jsonObject['towns'];

  const town = towns.filter(town => town.name == 'Fish Haven')
  
  town.forEach(town => {
    let box = document.createElement('section');
    let h3 = document.createElement('h3');
    let par1 = document.createElement('p');
    let par2 = document.createElement('p');
    let par3 = document.createElement('p');

    h3.textContent = 'Upcoming Town Events';
    box.appendChild(h3);

    par1.textContent = town.events[0];
    box.appendChild(par1);

    par2.textContent = town.events[1];
    box.appendChild(par2);

    par3.textContent = town.events[2];
    box.appendChild(par3);

    document.querySelector('div.fish-haven-events').appendChild(box);
  });

});

// to adjust the storm rating in the form on the Storm Center Page
function adjustRating(rating) {
  document.getElementById("ratingvalue").innerHTML = rating;
}

// to calculate and display the days between user visits on the gallery page 
const lastVisit = localStorage.getItem('lastvisit') || Date.now();
let daysBetween = (lastVisit - Date.now()) / 864000;
if (daysBetween < 1) {
    message = "Welcome to the gallery page. This is your first visit."
}
else {
    message = "You last visited this page" + ' ' + daysBetween + ' ' + "day(s) ago.";
}
document.querySelector('#lastvisit').innerHTML = message;
localStorage.setItem('lastvisit', Date.now());

// to lazy load images on the Gallery Page
const imagesToLoad = document.querySelectorAll('img[data-src]');

const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {image.removeAttribute('data-src');};
};

const imgOptions = {
  threshold: 0.2,
  rootmargin: "0px 0px 50px 0px"
};

if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver(items => {
    items.forEach(item => {
      if (item.isIntersecting) {
        loadImages(item.target);
        imgObserver.unobserve(item.target);
      }
    });
  }, imgOptions);

  imagesToLoad.forEach(img => {
    imgObserver.observe(img);
  });
} 
else {
  imagesToLoad.forEach(img => {
    loadImages(img);
  });
}