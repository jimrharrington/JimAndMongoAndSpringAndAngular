<html>

  <body ng-app>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.11/angular.js"></script>
    
    <input type="text"
           ng-model="name"
           placeholder="Enter your name" />
    
    <h1>Hello <span ng-bind="name"></span></h1>
    
  </body>
  
</html>
