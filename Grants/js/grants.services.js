'use strict';
var services = angular.module('grantsapp.services',['ngResource']);

app.factory('GrantsService', ['$resource', function($resource) {
    return $resource('http://localhost:8081/grantsService', {}, {
        query: {method: 'get', isArray: true}, 
        create: {method: 'post'}
    });
}]);

app.factory('GrantService', ['$resource', function($resource) {
    return $resource('http://localhost:8081/grantService/:id', { id: '@_id' }, {
        update: {method: 'put'},
        delete: {method: 'delete'}, 
        get: {method: 'get'}
  });
}]);

app.service('GrantsFactory', function() {
	
	var newid = 8; 
    var grantslist = [ 
        {id:0, titulo:"Subsidio para liberados de prisión",tipo:"Prestación",objeto:"Efectivo",abstract:"Ayuda para personas que acaban de salir de la carcel y no tienen medios para subsistir",
        url:"http://www.boe.es/boe/dias/2016/07/28/pdfs/BOE-A-2016-7300.pdf"},
        {id:1, titulo:"Beca de comedor",tipo:"Infancia",objeto:"Cheque bancario",abstract:"Pago del servicio del comedor del año vigente",
        url:"http://www.boe.es/boe/dias/2016/07/28/pdfs/BOE-A-2016-7300.pdf"},
        {id:2, titulo:"Ayuda a domicilio para ancianos",tipo:"Ancianos",objeto:"Ayuda física",abstract:"Ayuda para personas de la tercera edad que no puedan valerse por sí mismas",
        url:"http://www.boe.es/boe/dias/2016/07/28/pdfs/BOE-A-2016-7300.pdf"},
        {id:5, titulo:"Beca para estudiantes",tipo:"Beca estudiantil",objeto:"Transferencia bancaria",abstract:"Ayuda al estudio para alumnos de Bachillerato,Grado Medio, Grado Superior,Formación Profesional, etc.",
        url:"https://boe.es/boe/dias/2017/07/22/pdfs/BOE-A-2017-8618.pdf "}
    ]; 

        this.query = function () {  // petición get en nodejs
            console.log("Service: Getting grants list");
            return grantslist;
        }

        this.create = function (grant) { //peticion post en nodejs
            grant.id = grantslist.length;
            grantslist.push(grant);
            console.log(grant);
            return;	
        }

        this.show = function (id) { // petición get en nodejs pero de una sola ayuda
            console.log("Service: Show grant info");
            console.log(id)
            console.log(grantslist[id]);
            console.log(grantslist.filter(x => x.id == id)[0]);
            
            var cp = JSON.stringify(grantslist.filter(x => x.id == id)[0]); 
    
            return JSON.parse(cp); 
        }
        this.update = function (grant) { //petición put en nodejs
            console.log("Service: Updating grant "); 
            console.log(grant);
            for(var i=0 ; i<grantslist.length; i++) {
                if(grantslist[i].id === grant.id) {
                    grantslist[i] = grant;
                }
            }
            return;
        }
        this.delete = function (id) { //petición delete en nodejs
            console.log("Service: Deleting grant "); 
            console.log(id);
            for(var i=0 ; i<grantslist.length; i++) {
                if(grantslist[i].id === id) {
                    grantslist.splice(i,1);
                }
            }
            console.log("Service: Deleting grant " + id);
            return;
        }
});














