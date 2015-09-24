app.controller("BeerController", function($scope, httpFactory, $timeout){

  $scope.success = false;

  $scope.beer = {};

  getBeers = function(url) {
    httpFactory.get(url)
    .then(function(response){
      $scope.beers =
      response.data;
    });
  };
  getBeers('/api/v1/beers');

  function messageTimeout() {
    $scope.success = false;
  }

  $scope.postBeer = function() {
    var payload = $scope.beer;
    httpFactory.post('/api/v1/beers', payload)
    .then(function(response){
      $scope.beers.push(response.data);
      $scope.beer = {};
      $scope.success = true;
      $scope.message = 'Added a new beer. Thanks!';
      $timeout(messageTimeout, 5000);
    });
  };
});

