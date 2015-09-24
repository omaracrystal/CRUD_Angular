app.js
-transfer all html into one file (index) (get rid of swig tages and replace `block content and end block`) delete layout
-get rid of swig on top `var swig = require('swig');`
-get rid of view engine
```
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
```
-get rid of `app.use('/', routes);`
-get rid of swig `var routes = require('./routes/index.js')`;
-move entire views folder and move into client directory
-update app.js main route
```
// *** main routes *** //
// app.use('/', routes);
app.use('/api/v1/', apiRoutes);

///THIS IS NECESARY - unclear what it's doing
app.use('/', function(req, res){
 res.sendFile(path.join(__dirname, '../client/views', 'index.html'));
});
```
- add script tags to index.html to link to angular (order matters) and create those js files and eventually take away the main.js
```
 <script type="text/javascript" src="//code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<!-- <script type="text/javascript" src="/js/main.js"></script> -->
<script src="./js/app.js" type="text/javascript"></script>
<script src="./js/controllers.js" type="text/javascript"></script>
<script src="./js/directives.js" type="text/javascript"></script>
<script src="./js/filters.js" type="text/javascript"></script>
<script src="./js/services.js" type="text/javascript"></script>  
```
- add ng-app="" on top of html
- add {{1+2}} to test and see if it workds
- add `var app = angular.module("myApp", []);` to app.js I believe
- add name to ng-app="myApp" to app.js
- add to controller
```
app.controller("BeerController", function($scope, $http){
  $http.get('api/v1/beers');
  .then(function(response){
    $scope.beers = response.data;
  });

});
```
- add to index.html
```
<tbody id="all-beers">
    <tr ng-repeat = "beer in beers">
    <td>{{ beer.name }}</td>
    <td>{{ beer.type }}</td>
    <td>{{ beer.abv }}</td>
</tbody>
```
-The above two steps replaces the entire below function in main.js
```
// get all beers
function getBeers() {
  // clear all beers
  $('#all-beers').html('');
  // send get request to server
  $.get('/api/v1/beers', function(data) {
    if(data.length === 0) {
      $('.beer-section h2').html('No beers! Add a beer above.');
    } else {
      $('.beer-section h2').html('All beers');
      // loop through array of objects, appending each to the DOM
      for (var i = 0; i < data.length; i++) {
        $('#all-beers').append('<tr>'+
          '<td>'+data[i].name+'</td>'+
          '<td>'+data[i].type+'</td>'+
          '<td>'+data[i].abv+'</td>'+
          '<tr>'
        );
      }
      $('form input').val('');
    }
  });
}
```
- in services.js
```
app.factory('httpFactory', ['$http', function ($http){
  var obj = {}
  //get request
  obj.get = function (url){
    return $http.get(url);
  };
  return obj;
}]);
```
-now replace controllers.js
```
app.controller("BeerController", function($scope, $httpFactory){

  getBeets = function() {
    httpFactory.get('/api/v1/beers');
    .then(function(reponse){
      $scope.beers =
      response.data;
    })
  }
  getBeers('/api/v1/beers')
  //$scope.test = 'Test';
});
```


-replace all ids on html with ng-model="name_of_id"
