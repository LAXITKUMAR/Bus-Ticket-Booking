(function () {
    'use strict';
    var app = angular.module("btb.ui");
    app.service('BusDetails', ['$http', function ($http) {
        this.getBusDetails = function () {
            return $http.get('/server/busDetails.json');
        };
        this.getSeatsDetails = function (busId) {
            return $http.get('/server/seatDetails.json').then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].id === busId) {
                        return response.data[i];
                    }
                }
                return [];
            }, function (err) {
                console.log("Error while fetching eat details", err); //TODO: Show Notification if error occurs
                return [];
            })
        }
    }]);
})();