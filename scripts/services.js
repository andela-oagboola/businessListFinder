var myModule = angular.module("businessFinder");
myModule.factory("getResource", ['$http', function($http) {
  var yellowbase = "http://api.sandbox.yellowapi.com/";
  var key = "gqu6pjw5ets7qr8shjmgjwf6";
  return {
    getBusinessList: function(location, business) {
      return $http.get(yellowbase + "FindBusiness/?what=" + business + "&where=" + location + "&fmt=JSON&&pglen=100&apikey=" + key + "&UID=2");
      },
    getMatch: function(qstring) {
      return $http.get(yellowbase + "GetTypeAhead/?apikey=gqu6pjw5ets7qr8shjmgjwf6&text="+qstring+"&field=WHAT&fmt=JSON&UID=1");
    },

    getRegionMatch: function(qstring) {
      return $http.get(yellowbase +"GetTypeAhead/?text="+qstring+"&lang=en&apikey=gqu6pjw5ets7qr8shjmgjwf6&UID=1&field=WHERE&fmt=JSON&pglen=100");
    }
  };
}]);