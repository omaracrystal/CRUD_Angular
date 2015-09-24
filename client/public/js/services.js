app.factory('httpFactory', ['$http', function ($http){
  var obj = {};
  //get request
  obj.get = function (url){
    return $http.get(url);
  };

  obj.post = function (url, payload) {
    return $http.post(url, payload);
  };

  return obj;
}]);

