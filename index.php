<!DOCTYPE html>
<html>
  <head>
    <title>Eve Kuusk | Developer Portfolio</title>
    <link rel='stylesheet' href='css/styles.css' />
  </head>
  <body ng-app='ekDevPortfolio' ng-controller='mainCtrl' ng-strict-di>
    <div id='global'>
      <app-header></app-header>
      <main id='content' ng-view></main>
    </div>
    <app-footer></app-footer>
    <script src="js/app.js"></script>
  </body>
</html>
