/**
 * Created by kumar.laxit@gmail.com
 */
(function () {
    'use strict';
    var module = angular.module('btb.ui');
    module.controller('bookTicketCtrl', ['$scope', 'BusDetails', function ($scope, BusDetails) {
        var self = this;
        self.availableBuses = [];
        BusDetails.getBusDetails().then(function (response) {
            self.availableBuses = response.data;
        }, function (err) {
            console.log("Error occured while fetching bus details", err); //TODO: Replace it with notificatiuon
        });
    }]);
})();