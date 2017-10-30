/**
 * Created by LAXIT KUMAR <kumar.laxit@gmail.com> on 29-10-2017
 */
(function () {
    'use strict';
    var app = angular.module("btb.ui");
    var seatsSelectionCtrl = function (BusDetails, BookingDetails, $state, $element) {
        var self = this;
        self.seatMap = {};
        self.selectedSeats = []; //Array of selected seats
        self.getSeatsDetails = function (busId) {
            BusDetails.getSeatsDetails(busId).then(function (response) {
                self.seatMap = response;
            });
        };

        /**
         * Function to keep track of selected seats
         * @param seatNo
         */
        self.selectSeats = function (seatNo) {
            self.selectedSeats.indexOf(seatNo) === -1 ? self.selectedSeats.push(seatNo) : self.selectedSeats.splice(self.selectedSeats.indexOf(seatNo), 1);
        };
        /**
         * To get Total no of seats
         * @returns {Array}
         */
        self.getTotalSeats = function () {
            return self.seatMap.totalSeats ? new Array(parseInt(self.seatMap.totalSeats)) : [];
        };
        /**
         * Submit the selected seats and proceed further
         * @param selectedBus
         */
        self.submitSeatSelections = function (selectedBus) {
            console.log("Selected seats:", self.selectedSeats);
            selectedBus.selectedSeats = self.selectedSeats;
            BookingDetails.saveSelectedBusDetails(selectedBus);
            $element.find("#seatSelection-" + selectedBus.id).removeClass('fade').modal('hide'); //Close the modal
            $state.go('bookingDetails'); //Go to booking details page
        };
    };
    seatsSelectionCtrl.$inject = ['BusDetails', 'BookingDetails', '$state', '$element'];
    app.component("seatsSelection", {
        templateUrl: "/components/seats-selection/seats-selection.html",
        controller: seatsSelectionCtrl,
        bindings: {
            busDetails: '='
        }
    });
})();