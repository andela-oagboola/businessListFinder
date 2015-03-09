var businessFinder = angular.module("businessFinder", []);

businessFinder.controller("appCntrl", ["$scope", "getResource", function($scope, getResource) {
  $scope.businesses = [];
  $scope.regions = [];
  $scope.allInfo = [];
  // $scope.business = '';
  // $scope.location = 'Canada';
  console.log(getResource);
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
    console.log($scope.business);
    getResource.getMatch($scope.business).success(function(match) {
      console.log(match);
      $scope.values = match.suggestedValues;
      angular.forEach($scope.values, function(val, index) {
        $scope.businesses.push(val.value);
      });
    });
  };

  $scope.findRegionMatch = function() {
    getResource.getRegionMatch($scope.location).success(function(data) {
      console.log(data);
      $scope.list = data.suggestedValues;
      angular.forEach($scope.list, function(val, index) {
        $scope.regions.push(val.value);
      });
    });
  };

  $scope.search = function() {
    // if ($scope.business === "" || $scope.location === empty) {

    // }
    getResource.getBusinessList($scope.location, $scope.business).success(function(resp) {
        $scope.places = resp.listings;
        $scope.lat = $scope.places[0].geoCode.latitude;
        $scope.longitude = $scope.places[0].geoCode.longitude;

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
      });
      // getResource.getBusinessDetails($scope.location, $scope.business).success(function(response) {
      //   console.log(response);
      // })
  };

  // $scope.autocomplete = function() {
  //   getResource.getMatch($scope.location).success(function(data) {
  //     console.log(data);
  //   })
  // }
}])

.directive('autoComplete', function($timeout) {
  console.log('Halo');
  return function (scope, elm, iAttrs) {
    var elms = $(elm);
    console.log(elm);
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
