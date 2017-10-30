(function () {
    'use strict';
    var app = angular.module("btb.ui", ['ui.router', 'rzModule']);
    app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
        // Book Tickets route ========================================
            .state('bookTicket', {
                url: '/book-ticket',
                templateUrl: './book-ticket/book-ticket.html',
                controller: 'bookTicketCtrl',
                controllerAs: 'btCtrl'
            })
            // Admin Panel route =================================
            .state('adminPanel', {
                url: '/admin-panel',
                templateUrl: './admin-panel/admin-panel.html',
                controller: 'adminPanelCtrl',
                controllerAs: 'apCtrl'
            })
            // Booking Details route =================================
            .state('bookingDetails', {
                url: '/booking-details',
                templateUrl: './booking-details/booking-details.html',
                controller: 'bookingDetailsCtrl',
                controllerAs: 'bdCtrl'
            });
    }]);
})();