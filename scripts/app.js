var businessFinder = angular.module("businessFinder", []);

businessFinder.controller("appCntrl", ["$scope", "getResource", function($scope, getResource) {
  $scope.warning = false;
  $scope.results = false;
  $scope.businesses = [];
  $scope.regions = [];
  $scope.allInfo = [];
  $scope.mapOptions = {
    center: {
      lat: 45.421529600000000000,
      lng: -75.697193099999990000
    },
    zoom: 12
  };

  $scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);
  $scope.LatLng = new google.maps.LatLng(Number($scope.lat), Number($scope.longitude));
  $scope.marker = new google.maps.Marker({
    position: $scope.LatLng,
    map: $scope.map,
    title: "here"
  });
  $scope.marker.setMap($scope.map);

  $scope.findMatch = function() {
    getResource.getMatch($scope.business).success(function(match) {
      $scope.values = match.suggestedValues;
      angular.forEach($scope.values, function(val, index) {
        $scope.businesses.push(val.value);
      });
    });
  };

  $scope.findRegionMatch = function() {
    getResource.getRegionMatch($scope.location).success(function(data) {
      $scope.list = data.suggestedValues;
      angular.forEach($scope.list, function(val, index) {
        $scope.regions.push(val.value);
      });
    });
  };

  $scope.search = function() {
    if ($scope.business === undefined || $scope.location === undefined) {
      $scope.forbidden = false;
      $scope.badInput = false;
      $scope.results = false;
      $scope.warning = true;
    } else if (isNaN(Number($scope.business)) === false || isNaN(Number($scope.location)) === false) {
      $scope.forbidden = false;
      $scope.results = false;
      $scope.warning = false;
      $scope.badInput = true;
    } else {
      $scope.badInput = false;
      $scope.forbidden = false;
      $scope.warning = false;
      $scope.preloader = true;
      getResource.getBusinessList($scope.location, $scope.business).success(function(resp) {
        if (resp.listings.length === 0) {
          $scope.badInput = false;
          $scope.preloader = false;
          $scope.results = false;
          $scope.warning = true;
        }
        $scope.badInput = false;
        $scope.forbidden = false;
        $scope.preloader = false;
        $scope.results = true;
        $scope.places = resp.listings;
        // $scope.lat = $scope.places[0].geoCode.latitude;
        // $scope.longitude = $scope.places[0].geoCode.longitude;

        $scope.view = function(index) {
          $scope.latd = $scope.places[index].geoCode.latitude;
          $scope.longitd = $scope.places[index].geoCode.longitude;
          $scope.mapOptions = {
            center: {
              lat: Number($scope.latd),
              lng: Number($scope.longitd)
            },
            zoom: 12
          };
          $scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);
          $scope.LatLng = new google.maps.LatLng(Number($scope.latd), Number($scope.longitd));
          $scope.marker = new google.maps.Marker({
            position: $scope.LatLng,
            map: $scope.map,
            title: "here"
          });
          $scope.marker.setMap($scope.map);
        };
      }).error(function(err) {
        if (err.error.code === 400) {
          $scope.badInput= false;
          $scope.preloader = false;
          $scope.results = false;
          $scope.warning = true;
        } else if (err.error.code === 403) {
          $scope.badInput= false;
          $scope.results = false;
          $scope.preloader = false;
          $scope.forbidden = true;
        }
      });
    }
  };
}]);

businessFinder.directive('autoComplete', function($timeout) {
  return function(scope, elm, iAttrs) {
    var elms = $(elm);
    elms.autocomplete({
      source: scope[iAttrs.uiItems],
      select: function() {
        $timeout(function() {
          elms.trigger('input');
        }, 0);
      }
    });
  };
});
