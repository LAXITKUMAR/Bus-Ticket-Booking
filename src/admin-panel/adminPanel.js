/**
 * Created by kumar.laxit@gmail.com
 */
(function () {
    'use strict';
    var module = angular.module('btb.ui');
    module.controller('adminPanelCtrl', ['$scope', function ($scope) {
        var self = this;
        self.availableBuses = [{
            "name": "Airavat",
            "departure": "21:00 Hrs",
            "arrival": "20:00 Hrs"
        }, {
            "name": "AiravatBGR",
            "departure": "19:00 Hrs",
            "arrival": "18:00 Hrs"
        }];
    }]);
})();