'use strict';

var app = angular.module("grantsapp", ['ngRoute','ngResource']);

app.config(function($routeProvider) {
  $routeProvider
	.when('/grants-list', {
		templateUrl : 'views/grants-list.html', 
		controller : 'GrantListCtrl'
	})
    .when('/grants-detail/:id', {
    	templateUrl: 'views/grants-detail.html', //detalle de una ayuda, donde está el pdf
    	controller: 'GrantEditCtrl' // GrantEditCtrl tiene guille puesto
	})
	.when('/grants-edit/:id', { //modificación de una ayuda. 
		templateUrl: 'views/grants-edit.html', 
		controller: 'GrantEditCtrl'
	})
    .when('/grants-creation', {
    	templateUrl: 'views/grants-creation.html', 
    	controller: 'GrantCreationCtrl'
    })
    .otherwise({
    	templateUrl : 'views/grants-list.html', 
    	controller : 'GrantListCtrl'
    });
});	

