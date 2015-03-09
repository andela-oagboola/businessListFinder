var myModule = angular.module("businessFinder");
myModule.factory("getResource", ['$http', function($http) {
  var yellowbase = "http://api.sandbox.yellowapi.com/FindBusiness/?what=";
  var key = "gqu6pjw5ets7qr8shjmgjwf6";
  return {
    getBusinessList: function(location, business) {
      return $http.get(yellowbase + business + "&where=" + location + "&fmt=JSON&&pglen=100&apikey=" + key + "&UID=2");
      },
    getMatch: function(qstring) {
      return $http.get("http://api.sandbox.yellowapi.com/GetTypeAhead/?apikey=gqu6pjw5ets7qr8shjmgjwf6&text="+qstring+"&field=WHAT&fmt=JSON&UID=1");
    },

    getRegionMatch: function(qstring) {
      return $http.get("http://api.sandbox.yellowapi.com/GetTypeAhead/?text="+qstring+"&lang=en&apikey=gqu6pjw5ets7qr8shjmgjwf6&UID=1&field=WHERE&fmt=JSON&pglen=100");
    },

    getBusinessDetails: function(loc, bus) {
      return $http.get("http://api.sandbox.yellowapi.com/GetBusinessDetails/?prov=Ile-du-Prince-Edouard&city=Calgary&bus-name=Co-operators-The&listingId=6418182&fmt=JSON&apikey=gqu6pjw5ets7qr8shjmgjwf6&UID=1");
    }
  }
}]);