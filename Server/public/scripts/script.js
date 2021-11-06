$(document).ready(() => {
  getWeather();
  setInterval(getWeather, 600000);
});

var getWeather = () => {
  let weatherIcon = {
    "01": "fas fa-sun",
    "02": "fas fa-cloud-sun",
    "03": "fas fa-cloud",
    "04": "fas fa-cloud-meatball",
    "09": "fas fa-cloud-sun-rain",
    "10": "fas fa-cloud-showers-heavy",
    "11": "fas fa-poo-storm",
    "13": "fas fa-snowflake",
    "50": "fas fa-smog"
  };

  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=7206824983acc9d0eeac6250ae34d1d5&units=metric",
    dataType: "json",
    type: "GET",
    success: (data) => {
      var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth();
      let date = today.getDate();

      let icon = (data.weather[0].icon).substr(0, 2);
      let temp = Math.floor(data.main.temp) + "°";
      let humi = data.main.humidity;
      let des = data.weather[0].description;
      let city = data.name;
      let maxTemp = Math.floor(data.main.temp_max) + "°";
      let minTemp = Math.floor(data.main.temp_min) + "°";

      $(".date").text(date + " " + monthName[month] + " " + year + " / " + city);
      $(".icon *").remove();
      $(".icon").append('<i class="' + weatherIcon[icon] + ' fa-2x"></i>');
      $(".title").text(des.replace(/\b[a-z]/, letter => letter.toUpperCase()));
      $("#nowTemp").text(temp);
      $("#nowHumi").text(humi);
      $("#maxTemp").text(maxTemp);
      $("#minTemp").text(minTemp);
    }
  });
};

var changeState = (category) => {
  if ($(`#${category}`).text() == "On") {
    $(`#${category}`).text("Off");
  } else {
    $(`#${category}`).text("On");
  }
};

var changeCategory = (category) => {
  let len = $(".category").find("a").length;
  for (let i = 0; i < len; i++) {
    $(".category").find(`a:eq(${i})`).removeClass("active");
  }
  $(`#${category}`).addClass("active");
};

var mainLabels = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
var tempData = [30, 32, 31, 33, 35, 37, 37, 36, 34, 34];
var humiData = [37, 39, 50, 51, 55, 54, 54, 55, 54, 53];
var soiHumiData = [20, 20, 19, 18, 87, 87, 86, 85, 85, 85];

var historyChart = new Chart($("#line-chart"), {
  type: 'bar',
  data: {
    labels: mainLabels,
    datasets: [{
      data: tempData,
      label: "온도",
      type: "line",
      pointRadius : 0,
      backgroundColor: "red",
      borderColor: "red",
      fill: false
    }, {
      data: humiData,
      label: "습도",
      type: "line",
      pointRadius : 0,
      backgroundColor: "blue",
      borderColor: "blue",
      fill: false
    }, {
      data: soiHumiData,
      label: "토양습도",
      type: "bar",
      backgroundColor: "green",
      borderColor: "green",
    }]
  },
  options: {
    legend: {
      labels: {
        fontColor: "white"
      }
    },
    scales: {
      yAxes: [{
        stacked: true,
        ticks: {
          fontColor: "white",
        },
        gridLines: {
          color: 'white',
        }
      }],
      xAxes: [{
        stacked: true,
        ticks: {
          fontColor: "white",
        },
        gridLines: {
          color: 'white',
        }
      }]
    }
  }
});

var updateChart = (newLabel, newTempData, newHumiData, newSoiHumiData) => {
  //pop data in array
  mainLabels.pop();
  tempData.pop();
  humiData.pop();
  soiHumiData.pop();
  //push data to array
  mainLabels.push(newLabel);
  tempData.push(newTempData);
  humiData.push(newHumiData);
  soiHumiData.push(newSoiHumiData);

  historyChart.update();
};