
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

angular.module('CarMakes', ['angularModalService', 'ngAnimate'])
    .controller('MainCtrl',
                ['CarMakeService', 'ModalService', function(CarMakeService, ModalService) {
                    var self = this;

                    self.searchModal = null;
                    self.makeToEdit = { id: '', makeId : '', makeDisplay : '', makeIsCommon : '', makeCountry : '' };

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

                    self.showDialog = function() {
                        ModalService.showModal({
                            templateUrl: "/JimAndMongoAndSpringAndAngular/modal.html",
                            controller: "ModalController",
                            controllerAs: "ctrl",
                            inputs: ['CarMakeService', 'close']
                        }).then(function(modal) {
                            self.searchModal = modal;
                            modal.element.modal();
                            modal.close.then(function(result) {
                                if ( result == "OK" ) 
                                {
                                    self.loadToEdit();
                                }
                            });
                        });
                    };

                }])
    .service('CarMakeService', ['$http', CarMakeService])
    .controller('ModalController', ['CarMakeService', 'close', function(CarMakeService, baseClose) {
        
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

            baseClose(result, 500); // close, but give 500ms for bootstrap to animate
        };
        
    }]);
