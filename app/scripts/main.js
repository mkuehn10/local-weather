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

        self.kelvinTemp = ko.observable('');
        self.fahrenheit = ko.observable(true);

        self.celsiusTemp = function() {
            return Math.round(kelvinToCelsius(self.kelvinTemp()));
        };

        self.fahrenheitTemp = function() {
            return Math.round(celsiusToFahrenheit(self.celsiusTemp()));
        };

        self.toggleTemp = function() {
            self.fahrenheit(self.fahrenheit() ? false : true);
        }

        console.log(self);

        self.getWeather = function() {
            var params = {
                lat: '38.4225153',
                lon: '-81.7841701',
                APPID: APIKey
            };
            $.ajax({
                    url: 'http://api.openweathermap.org/data/2.5/weather',
                    data: params
                })
                .done(function(data) {
                    console.dir(data);
                    self.kelvinTemp(data.main.temp);
                    //console.log(kelvinToCelsius(data.main.temp));
                    //console.log(celsiusToFahrenheit(kelvinToCelsius(data.main.temp)));
                });

        };

        self.getWeather();
    }



    ko.applyBindings(new ViewModel);
});
