/**
 * Created by LAXIT KUMAR <kumar.laxit@gmail.com> on 30-10-2017
 */
/**
 * Angularjs Component for Passenger details form
 */
(function () {
    'use strict';
    var app = angular.module("btb.ui");
    var passengerDetailsCtrl = function () {
        var self = this;
        var details;
        self.pDetails = []; //Store each passenger details
        self.$onInit = function () { //Construct passengers details array on onInit hook
            //Iterate over seat numbers and create details object for each passenger
            for (var i = 0; i < self.seats.length; i++) {
                details = {};
                details.seatNo = self.seats[i];
                self.pDetails.push(details);
            }
        };

        /**
         * Save passenger details
         * @param details
         */
        self.saveDetails = function (details) {
            self.onSubmit({"passengerDetails": details}); //Returning object as onSubmit is passed as reference
        };
    };
    /**
     * Component that deals with dynamic form required to fill passengers details
     * @example
     * <passenger-details seats={{Array of selected seats}} on-submit={{Callback when details are saved}}></passenger-details>
     */
    app.component("passengerDetails", {
        templateUrl: "/components/passenger-details/passenger-details.html",
        controller: passengerDetailsCtrl,
        bindings: {
            seats: '=',
            onSubmit: '&'
        }
    });
})();