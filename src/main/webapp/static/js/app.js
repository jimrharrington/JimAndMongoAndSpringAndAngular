
function CarMakeService( $http )
{
    var makes = [];
    var makeToEdit = { id: '', makeId : '', makeDisplay : '', makeIsCommon : '', makeCountry : '' };
    
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

    this.byID = function( id, callbk )
    {
        var self = this;

        $http.get( "/JimAndMongoAndSpringAndAngular/webservice/models/byID/" + id )
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

angular.module('CarMakes', [])
    .controller('MainCtrl',
                ['CarMakeService', function(CarMakeService) {
                    var self = this;

                    self.attr = null;
                    self.value = null;
                    self.selectedIndex = -1;
                    self.selectedId = null;
                    self.makes = [];
                    self.makeToEdit = { id: '', makeId : '', makeDisplay : '', makeIsCommon : '', makeCountry : '' };
                    self.idValue = null;

                    self.updateMakes = function() {
                        self.makes = CarMakeService.makes;
                    }

                    self.updateMakeToEdit  = function() {
                        self.makeToEdit = CarMakeService.makeToEdit;
                    }
                    
                    self.search = function() {
                        return CarMakeService.search( self.attr, self.value, self.updateMakes );
                    };

                    self.setSelectedIndex = function( offset ) {
                        self.selectedIndex = offset;
                    };

                    self.setSelectedId = function( id ) {
                        self.selectedId = id;
                    };

                    self.edit = function() {
                        CarMakeService.edit( self.selectedIndex );
                    };

                    self.loadToEdit = function() {
                        //if ( self.idValue != null )
                        //{
                            CarMakeService.byID( self.idValue, self.updateMakeToEdit );
                        //}
                    };

                    self.newMake = function() {
                        CarMakeService.add();
                    };

                    self.save = function() {
                        CarMakeService.write();
                    };
                }])
    .service('CarMakeService', [ '$http', CarMakeService]);
