(function () {
    'use strict';
    var app = angular.module("btb.ui");
    app.service('BookingDetails', ['$http', function ($http) {
        this.selectedBusDetails = null; //variable to store the selected bus details
        /**
         * Function to save selected seat details
         * @param details  object that will be saved
         */
        this.saveSelectedBusDetails = function (details) {
            this.selectedBusDetails = details;
        };
        /**
         *
         * @param busId
         * @returns {null|*}
         */
        this.getSelectedBusDetails = function () {
            return this.selectedBusDetails;
        };
    }]);
})();