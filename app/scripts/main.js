$(function() {

    var APIKey = '1b5cb0110257d62bb9777fdadae849fd';

    var kelvinToCelsius = function(kelvin) {
        return kelvin - 273.15;
    };

    var celsiusToFahrenheit = function(celsius) {
        return celsius * 1.8 + 32;
    };

    var ViewModel = function() {
        var self = this;

        self.lat = '';
        self.lon = '';

        self.city = ko.observable('');

        self.showTemp = ko.observable(false);

        self.kelvinTemp = ko.observable('');
        self.fahrenheit = ko.observable(true);

        self.iconURL = ko.observable('');
        self.description = ko.observable('');

        self.celsiusTemp = function() {
            return Math.round(kelvinToCelsius(self.kelvinTemp())) + ' °C';
        };

        self.fahrenheitTemp = function() {
            return Math.round(celsiusToFahrenheit(kelvinToCelsius(self.kelvinTemp()))) + ' °F';
        };

        self.toggleTemp = function() {
            self.fahrenheit(self.fahrenheit() ? false : true);
        }

        self.getWeather = function() {
            var params = {
                lat: self.lat,
                lon: self.lon,
                APPID: APIKey //,
                //units: 'metric'
            };
            $.ajax({
                    url: 'http://api.openweathermap.org/data/2.5/weather',
                    data: params
                })
                .done(function(data) {
                    console.dir(data);
                    self.kelvinTemp(data.main.temp);
                    self.city(data.name + ', ' + data.sys.country);
                    self.showTemp(true);

                    self.iconURL('http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
                    self.description(data.weather[0].description);
                });

        };

        self.showPosition = function(position) {
            self.lat = position.coords.latitude;
            self.lon = position.coords.longitude;

        };

        self.getLocation = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(self.showPosition);
            } else {
                // x.innerHTML = "Geolocation is not supported by this browser.";
                console.log('Geolocation is not supported by this browser.');
            }
            setTimeout(self.getWeather, 500);
        };

        self.getLocation();


    }



    ko.applyBindings(new ViewModel);
});
