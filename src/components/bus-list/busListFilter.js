/**
 * Created by LAXIT KUMAR <kumar.laxit@gmail.com> on 29-10-2017
 */

/**
 * Custom Filter for filtering buses based on criteria selected
 */
(function () {
    'use strict';
    var app = angular.module("btb.ui");

    /**
     *  Get the List of buses based on the filter selected
     *
     */
    app.filter("filterBuses", function () {
        function getFilteredBuses(busesList, filterObj) {
            var filtered = [];
            var deptMin = parseInt(filterObj.deptSlider.min);
            var deptMax = parseInt(filterObj.deptSlider.max);
            var costMin = parseInt(filterObj.costSlider.min);
            var costMax = parseInt(filterObj.costSlider.max);
            var isAcBus = filterObj.busType.AC;
            var isNonAcBus = filterObj.busType.NONAC;
            //Iterate over busList and filter objects that fulfills the criteria
            angular.forEach(busesList, function (bus) {
                if ((new Date(bus.departureTime).getHours() >= deptMin && new Date(bus.departureTime).getHours() <= deptMax) && (bus.cost >= costMin && bus.cost <= costMax) && (isAcBus === isNonAcBus ? true : (isAcBus ? bus.type === 'AC' : bus.type === 'NON-AC'))) {
                    filtered.push(bus);
                }
            });
            return filtered; //Return filtered array
        }

        return getFilteredBuses;
    });
})();

