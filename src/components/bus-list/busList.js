/**
 * Created by LAXIT KUMAR <kumar.laxit@gmail.com> on 29-10-2017
 */
/**
 * Angularjs Component for listing available buses
 */
(function () {
    'use strict';
    var app = angular.module("btb.ui");
    var busListController = function () {
        var self = this;
        //Filter obj
        self.filterObj = {
            deptSlider: {
                min: 0,
                max: 24,
                options: {
                    id: "deptSlider",
                    floor: 0,
                    ceil: 24,
                    step: 1,
                    noSwitching: true,
                    translate: function (value) {
                        return value + " Hrs";
                    }
                }
            }, costSlider: {
                min: 100,
                max: 5000,
                options: {
                    id: "costSlider",
                    floor: 100,
                    ceil: 5000,
                    noSwitching: true,
                    translate: function (value) {
                        return "Rs." + value;
                    }
                }
            },
            busType: {
                "AC": false,
                "NONAC": false
            }
        };
    };
    app.component("busList", {
        templateUrl: "/components/bus-list/bus-list.html",
        controller: busListController,
        bindings: {
            list: '='
        }
    });
})();