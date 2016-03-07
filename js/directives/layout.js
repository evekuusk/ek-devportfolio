app.directive('appHeader', function() {
  return {
    restrict: 'E',
    replace: false,
    templateUrl: './templates/header.html'
  }
});

app.directive('appFooter', function() {
  return {
    restrict: 'E',
    replace: false,
    templateUrl: './templates/footer.html'
  }
});
