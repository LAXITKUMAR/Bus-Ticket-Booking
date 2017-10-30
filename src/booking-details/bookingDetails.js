/**
 * Created by kumar.laxit@gmail.com
 */
/**
 * Controller for dealing with the booking details
 */
(function () {
    'use strict';
    var module = angular.module('btb.ui');
    module.controller('bookingDetailsCtrl', ['BookingDetails', '$state', function (BookingDetails, $state) {
        var self = this;
        self.bookingDetails = {};
        self.bookingDetails = BookingDetails.getSelectedBusDetails() || {};
        self.bookingDetails.selectedSeats = self.bookingDetails.selectedSeats ? self.bookingDetails.selectedSeats.map(function (seatNo) {
            return seatNo + 1;
        }) : [];
        /**
         * Function that will called when passengers details are saved
         * @param passengerDetails Array of passengers details obj
         */
        self.savePassengerDetails = function (passengerDetails) {
            console.log("Passanger details to save:", passengerDetails); //TODO: Save it to the service and show it in the admin panel
            $state.go('bookTicket');
            alert(passengerDetails.length + " tickets booked successfully!"); //TODO: Remove alert and notifier
        }
    }]);
})();