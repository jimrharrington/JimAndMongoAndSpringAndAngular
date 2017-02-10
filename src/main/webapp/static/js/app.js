
function CarMakeService( $http )
{
    var makes = [];
    var makeToEdit = { id: '', makeId : '', makeDisplay : '', makeIsCommon : '', makeCountry : '' };
    var idValue = null;
    
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

        $http.get( "/JimAndMongoAndSpringAndAngular/webservice/models/byID/" + this.idValue )
            .then(function(response) {
                self.makeToEdit = response.data;
                callbk();
            }, function(errResponse) {
                console.error('Error while loading car make by id');
            });
    };
    
    this.write = function()
    {
        var self = this;

        $http.post( "/JimAndMongoAndSpringAndAngular/webservice/models/write/", self.makeToEdit )
            .then(function(response) {
                self.makeToEdit = { id: '', makeId : '', makeDisplay : '', makeIsCommon : '', makeCountry : '' };
            }, function(errResponse) {
                console.error('Error while writing car make');
            });
    };

    this.add = function()
    {
        var self = this;
        self.makeToEdit = { id: '', makeId : '', makeDisplay : '', makeIsCommon : '', makeCountry : '' };
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
     self.idValue = null;

     self.search = function() {
         return CarMakeService.search( self.attr, self.value, self.updateMakes );
     };

     self.updateMakes = function() {
         self.makes = CarMakeService.makes;
     }

     self.close = function(result) {
         if ( result == "OK" )
         {
             CarMakeService.idValue = self.idValue;
         }

         $modalInstance.close(result);
     };
     
 }]);

angular.module('CarMakes').controller('MainCtrl',
                                      ['CarMakeService', '$scope','$modal', function(CarMakeService, $scope, $modal ) 
  {
      var self = this;
      
      self.searchModal = null;
      self.makeToEdit = { id: '', makeId : '', makeDisplay : '', makeIsCommon : '', makeCountry : '' };
      self.modalInstance = null;
      
      self.updateMakeToEdit  = function() {
          self.makeToEdit = CarMakeService.makeToEdit;
      }
      
      self.loadToEdit = function() {
          CarMakeService.byID( self.updateMakeToEdit );
      };
      
      self.newMake = function() {
          CarMakeService.add();
      };
      
      self.save = function() {
          CarMakeService.write();
      };
      
      self.showDialog = function() 
       {
           self.modalInstance = $modal.open({
               templateUrl: "/JimAndMongoAndSpringAndAngular/modal.html",
               controller: "ModalController",
               controllerAs: "ctrl" //,
               //inputs: ['CarMakeService', '$scope','$modalInstance']
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

