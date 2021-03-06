'use strict';

angular.module('erosApp.mm')

.directive('erosMm',function(){
	return {
		templateUrl: 'modules/eros-mm/mm.tpl.html',
		replace: true,
		scope: true,
		controller: 'MmCtrl',
		link: function($scope, $elem, $attrs, $controller){
			$scope.hover = $scope.statusToString(eros.matchmaking.status) != "IDLE"; // Full only when matchmaking IDLE

			$elem.mouseenter(function(){
				$scope.hover = eros.localUser.characters.length > 0;
			});
			$elem.mouseleave(function(){
				if($scope.matchmaking.status == "IDLE"){
					$scope.hover = false;
					// $scope.hover=true;
				}
			});
		}
	};
})

.directive('bnetProfile', function(){
	return {
		templateUrl: 'modules/eros-mm/bnetprofile.tpl.html',
		replace: true,
		controller: 'MmCtrl',
		link: function($scope, $elem, $attrs, $controller){
			var _original_text = $($elem[0]).find('a').html()
			$scope.bnet_regions = ["NA", "EU", "KR"];

			$scope.RequestVerification = function(region){
				if(typeof region == "string"){
					region = protobufs.Region[region]
				}
				eros.matchmaking.request_verification(region)
			}
		}
	};
})

.filter('timer', function(){
	return function(input){
		if (typeof input === 'undefined') { return ; }
		var minutes = input.m > 9 ? input.m : "0"+input.m;
		var seconds = input.s > 9 ? input.s : "0"+input.s;

		return minutes + ":" + seconds;
	};
})

.filter('region', function(){
	return function(input){
		var regions = ["North America", "Europe", "Korea"];

		return regions[input-1];
	};
})

.filter('region_short', function(){
	return function(input){
		var regions = ["NA", "EU", "KR"];

		return regions[input-1];
	};
})

.filter('noMixed', function(){
	return function(input){
		var replaced_src = input.replace(/https?:/, location.protocol)
		return replaced_src
	}
})