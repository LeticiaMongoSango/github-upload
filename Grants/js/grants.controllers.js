'use strict';

/* Controllers */

app.controller('GrantListCtrl', function  ($scope,GrantsFactory,GrantsService,GrantService,$location, $window, $rootScope) {
		console.log("GrantListCtrl: Ejecutando");
		
        // callback for ng-click 'editGrant':
        $scope.editGrant = function (grantId) {
    		console.log("GrantListCtrl.editGrant: " + grantId);
            $location.path('/grants-edit/' + grantId);
        };

        // callback for ng-click 'deleteGrant':
        $scope.deleteGrant = function (grantDel) {
    		console.log("GrantListCtrl.deleteGrant: " + grantDel);
            if (confirm('The grant: "' + grantDel.id + '" is going to be removed. Are you sure?')) {
                GrantService.delete({ id: grantDel.id });
                $window.alert("Grant deleted succesfully");
                
            }
        };

       // callback for ng-click 'createGrant':
       $scope.createNewGrant = function () {
            console.log("GrantListCtrl.newGrant");
            $location.path('/grants-creation');
        };
        $scope.detailGrant = function(grantId){
            console.log("GrantListCtrl.detailGrant detalle");
            $location.path('/grants-detail/' + grantId);
        } 
       // console.log("PRUEBA");
        $scope.grants = GrantsService.query();
		//console.log($scope.grants);
});

app.controller('GrantEditCtrl', function ($scope, $routeParams, GrantsFactory, GrantService, $window, $location) {

         // callback for ng-click 'updateGrant':
        $scope.updateGrant = function () {
            console.log("GrantEditCtrl.updateGrant");
            GrantService.update($scope.grant);
            $window.alert("Grant updated succesfully");
            $location.path('/grants-list');
        };

        // callback for ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/grants-list');
        };

         // When loading the form we take the grant info
         console.log("Invocando al servicio a mano "); 
         console.log("Esto qe es?" + $routeParams.id);
         // $scope.grant = GrantService.get({ id: $routeParams.id });
         $scope.grant = GrantService.get({ id: $routeParams.id }, function() {
                 console.log("Esto es lo que hemos recibido");
                 console.log("La ayuda en si"+$scope.grant);
             }
         );

         $scope.gotopage = function(url,page){
            //console.log(url);
            //console.log(page);
            window.gotopage(url,page);
         };

        // When loading the form we take the grant info
        // $scope.grant = GrantsFactory.show($routeParams.id);
});

app.controller('GrantCreationCtrl', function ($scope, GrantsService,GrantsFactory, $location, $window) {

	// callback for ng-click 'createNewGrant':
    $scope.createNewGrant = function () {
        console.log($scope.grant);
        GrantsService.create($scope.grant);
        $window.alert("Grant created succesfully");
        $scope.grants = GrantsService.query();
        $location.path('/grants-list');

    }
});
