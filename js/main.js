var API_KEY = "f8fd1d14afee9f608178cd3836fa72ce";
var API_URL = "http://api.openweathermap.org/data/2.5/weather?zip=";
var kelvin;
var zip = document.querySelector(".zip").value;
var tempType = "F";

function kelvinToFahr(kelvin) {
    return Math.round(kelvin * 9 / 5 - 459.67);
}

function kelvinToCels(kelvin) {
    return Math.round(kelvin - 273.15)
}

function getIcon(id) {
    if(id >= 200 && id < 300) {
        return "img/thunderstorm.png";
    }
    if(id < 600) {
        return "img/rain.png";
    }
    if(id < 700) {
        return "img/snow.png";
    }
    if(id === 800) {
        return "img/sun.png";
    }
    if(id === 801) {
        return "img/partly-cloudy.png";
    }
    if(id < 900) {
        return "img/cloudy.png";
    }

}

function getData(zip) {
    $.ajax({
            url: API_URL + zip + ",US&appid=" + API_KEY,
        })
        .done(function(data) {
            console.log(data);
            kelvin = data.main.temp;
            document.querySelector("#city").innerHTML = data.name;
            document.querySelector(".icon").setAttribute("src", getIcon(data.weather[0].id));
            document.querySelector(".weather").innerHTML = data.weather[0].description;
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".temp").innerHTML = kelvinToFahr(kelvin);

        })
        .fail(function(err) {
            console.error(err);
        });
}

document.querySelector(".changeTemp").addEventListener("change", function() {
    if (event.target.value === "C") {
        document.querySelector(".temp").innerHTML = kelvinToCels(kelvin);
    } else {
        document.querySelector(".temp").innerHTML = kelvinToFahr(kelvin);
    }
});

document.querySelector(".zip").addEventListener("keypress", function(event) {
    if(event.keyCode === 13) {
        zip = document.querySelector(".zip").value;
        getData(zip);
    }
})


getData(zip);
