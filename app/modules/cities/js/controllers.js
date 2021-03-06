/*globals angular */

(function () {
    "use strict";
    
	angular
	.module("contatosJS.cities")
	.controller("CitiesCtrl", citiesCtrl);

	citiesCtrl.$inject = ["$scope", "$location", "$routeParams", "Cities", "States"];
	function citiesCtrl($scope, $location, $routeParams, Cities, States) {
		$scope.city = [];
		$scope.cities = [];
		$scope.loading = true;

		var getAll = function() {
			Cities.getAll()
			.then(
				function(response) {
					$scope.cities = response.data._embedded.cities;
				},
				function(errResponse) {
					console.error("Erro ao buscar cidades.");
				}
			)
			.finally(function(response) {
				$scope.loading = false;
			});

		};

		var getAllStates = function() {
			States.getAll()
			.then(
				function(response) {
					$scope.states = response.data._embedded.states;
				},
				function(errResponse) {
					console.error("Erro ao buscar estados.");
				}
			)
		};

		var getCity = function() {
			var id = $routeParams.id;
			if (id !== undefined) {
		  	Cities.getById(id)
				.then(
					function(response) {
						$scope.city = response.data;
					},
					function(errResponse) {
						console.error("Erro ao buscar cidade.");
					}
				)
			}
		};

		$scope.save = function(city) {
			console.info("Salvando cidade...");
			var myCity = {
				id: null,
				name: city.name,
				capital: city.capital,
				state: city.state._links.self.href
			};
			Cities.save(myCity).then(
				function(response) {
					delete $scope.city;
					console.info("Cidade Salva com Sucesso!");
					getAll();
					$location.path("/cities");
				},
				function(response){
					console.error("Erro ao salvar Cidade.");
				}
			);
		};

		$scope.update = function(city) {
			var myCity = {
				id: city.id,
				name: city.name,
				capital: city.capital,
				state: city.state._links.self.href
			};
			Cities.update(myCity).then(
				function(response) {
					delete $scope.city;
					console.info("Cidade Atualizada com Sucesso!");
					getAll();
					$location.path("/cities");
				},
				function(response){
					console.error("Erro ao atualizar Cidade.");
				}
			);
		};

		$scope.delete = function(id) {
			Cities.deleteById(id).then(
				function(respose) {
					console.info("Cidade removida com Sucesso!");
					getAll();
				},
				function(respose) {
					console.error("Erro ao remover Cidade.");
				}
			);
		};

		(function init() {
			getAll();
			getCity();
			getAllStates();
		})();
	}
})();
