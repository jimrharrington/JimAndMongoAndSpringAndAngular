
function CarMakeService( $http )
{
    var self = this;

    self.makes = [];
    self.makesToEdit = [];
    self.idValues = [];
    
    this.search = function( attr, value, callbk )
    {
        var self = this;

        $http.get( "/JimAndMongoAndSpringAndAngular/webservice/models/search/" + attr + "/" + value )
            .then(function(response) {
                self.makes = response.data;
                callbk();
            }, function(errResponse) {
                console.error('Error while searching car makes');
            });
    };

    this.byID = function( callbk )
    {
        var self = this;

        //
        // OK, we only want to call the update callback when all the server requests
        // have returned and this guy tracks that.
        //

        var numSent = 0;

        for( var i = 0; i < self.idValues.length; ++i )
        {
            ++numSent;

            $http.get( "/JimAndMongoAndSpringAndAngular/webservice/models/byID/" + this.idValues[i] )
                .then(function(response) {
                    self.makesToEdit.push( response.data );
                    --numSent;

                    if ( numSent <= 0 )
                    {
                        callbk();
                    }
                }, function(errResponse) {
                    console.error('Error while loading car make by id');
                    --numSent;

                    if ( numSent <= 0 )
                    {
                        callbk();
                    }
                });
        }

        
    };
    
    this.write = function()
    {
        var self = this;

        $http.post( "/JimAndMongoAndSpringAndAngular/webservice/models/write/", 
                    self.makeToEdit,
                    { transformResponse: [function (data) { return data; }] })
            .then(function(response) {
                
            }, function(errResponse) {
                console.error('Error while writing car make');
            });
    };

    this.add = function()
    {
        var self = this;
    }

    this.edit = function( toEditIndex )
    {
        var self = this;
        self.makeToEdit = makes[ toIndex ];
    }
}

angular.module('CarMakes', ['ui.bootstrap']);

angular.module('CarMakes').service('CarMakeService', 
                                   ['$http', CarMakeService]);

angular.module('CarMakes').controller('ModalController', 
                                      ['CarMakeService', '$scope','$modalInstance', function(CarMakeService, $scope, $modalInstance) 
 {                                          
     var self = this;
     
     self.makes = [];
     self.attr = null;
     self.value = null;
     self.idValues = [];

     self.search = function() {
         return CarMakeService.search( self.attr, self.value, self.updateMakes );
     };

     self.updateMakes = function() {
         self.makes = CarMakeService.makes;
     }

     self.close = function(result) {
         if ( result == "OK" )
         {
             for( var i = 0; i < self.makes.length; ++i )
             {
                 var make = self.makes[i];

                 if ( make.selected )
                 {
                     self.idValues.push( make.id );
                 }
             }

             CarMakeService.idValues = self.idValues;
         }

         $modalInstance.close(result);
     };
     
 }]);

angular.module('CarMakes').directive( 'makeWidget', [function() 
{
    return {
        templateUrl: "/JimAndMongoAndSpringAndAngular/make.html"
    };
}]);

angular.module('CarMakes').controller('MainCtrl',
                                      ['CarMakeService', '$scope','$modal', function(CarMakeService, $scope, $modal ) 
  {
      var self = this;
      
      self.searchModal = null;
      self.makeToEdit = { id: '', makeId : '', makeDisplay : '', makeIsCommon : '', makeCountry : '' };
      self.openMakes = [];
      self.openMakesById = {};
      self.modalInstance = null;
      
      self.updateMakeToEdit  = function() {
          self.addMakes( CarMakeService.makesToEdit );
      }
      
      self.loadToEdit = function() {
          CarMakeService.byID( self.updateMakeToEdit );
      };
      
      self.newMake = function() {
          CarMakeService.add();
      };
      
      self.save = function( id ) {
          len = self.openMakesById[id];
          makeToSave = self.openMakes[len];
          CarMakeService.makeToEdit = makeToSave;
          CarMakeService.write();
          self.removeMake( makeToSave );
      };

      self.addMakes = function( makes ) {
          for( var i = 0; i < makes.length; ++i )
          {
              var make = makes[i];

              self.addMake( make );
          }
      };

      self.addMake = function( make ) {
          id = make.id;
          len = self.openMakes.length;
          self.openMakesById[id] = len;
          self.openMakes.push( make );
      };

      self.removeMake = function( make ) {
          id = make.id;
          offset = self.openMakesById[id];
          self.openMakes.splice( offset, 1 );
          
          self.openMakesById = {};
          numMakes = self.openMakes.length;
          for( var i = 0; i < numMakes; ++i )
          {
              var make = self.openMakes[i];
              self.openMakesById[make.id] = i;
          } 
      };
      
      self.showDialog = function() 
       {
           self.modalInstance = $modal.open({
               templateUrl: "/JimAndMongoAndSpringAndAngular/modal.html",
               controller: "ModalController",
               controllerAs: "ctrl"
           });
           
           self.modalInstance.result.then(function(val) 
             {
                 if ( val == "OK" ) 
                 {
                     self.loadToEdit();
                 }
             });
       };
      
  }]);

