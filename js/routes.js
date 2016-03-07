app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
      templateUrl: 'templates/views/intro.html'
    })
    .when('/contact', {
      templateUrl: 'templates/views/contact.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
