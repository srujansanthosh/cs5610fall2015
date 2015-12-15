
var app = angular.module('AngularApp', ['ngRoute','ui.bootstrap.transition', 'ui.bootstrap']);

app.controller('MainController', function ($scope,$route, UserService, $rootScope, $location) {

	$rootScope.user = {};

	$scope.logout = function()
	{
		UserService.logout(function(response)
				{
			$rootScope.currentuser = null;	
			$rootScope.userId = null;
			$rootScope.user = null;
			$location.path('/login');
				});
	}

$scope.myInterval = 1900;
	$scope.slides = [
		{
			image: 'http://s29.postimg.org/mtxcjfibb/headphones.jpg',
		},
		{
			image: 'http://s8.postimg.org/e7xsx5zt1/laptop.jpg',
		},
		{
			image: 'http://s3.postimg.org/f16z04l2b/camera.jpg',
		},
		{
			image: 'http://s29.postimg.org/qhd3phqif/iphone.jpg',
		},
	];


});

app.filter('offset', function () {
	return function (input, start) {
		start = parseInt(start, 10);
		return input.slice(start);
	};
});

app.directive('starRating', function () {
	return {
		restrict: 'A',
		template: '<ul class="rating">' +
		'<li ng-repeat="star in stars" ng-class="star">' +
		'\u2605' +
		'</li>' +
		'</ul>',
		scope: {
			ratingValue: '=',
			max: '='
		},
		link: function (scope, elem, attrs) {
			scope.stars = [];
			for (var i = 0; i < scope.max; i++) {
				scope.stars.push({
					filled: i < scope.ratingValue
				});
			}
		}
	}
});

app.directive('uniqueUsername', ['$http', function($http, $timeout) {  
	return {
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl) {
			scope.busy = false;
			scope.$watch(attrs.ngModel, function(value) {

				// hide old error messages
				ctrl.$setValidity('isTaken', true);

				if (!value) {
					// empty username is caught by required directive
					return;
				}

				// show spinner
				scope.busy = true;

				// send request to server
				$http.post('/user/checkUsername',{username:value})
				.success(function(data) {
					// everything is fine -> do nothing
					scope.busy = false;

				})
				.error(function(data) {

					// display new error message
					if (data.isTaken) {
						ctrl.$setValidity('isTaken', false);
					}
					scope.busy = false;
				});
			})
		}
	}
}]);

app.directive('checkPassword', ['$http', function($http, $timeout) {  
	return {
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl) {
			scope.busy = false;
			scope.$watch(attrs.ngModel, function(value) {

				// hide old error messages
				ctrl.$setValidity('noMatch', true);

				if (!value) {
					// empty username is caught by required directive
					return;
				}

				// show spinner
				scope.busy = true;

				// send request to server
				$http.post('/user/checkPassword',{username:scope.user.username, password:value})
				.success(function(data) {
					// everything is fine -> do nothing
					scope.busy = false;

				})
				.error(function(data) {

					// display new error message
					if (data.noMatch) {
						ctrl.$setValidity('noMatch', false);
					}
					scope.busy = false;
				});
			})
		}
	}
}]);


app.directive('match', [function () {
	return {
		require: 'ngModel',
		link: function (scope, elem, attrs, ctrl) {
			scope.$watch('[' + attrs.ngModel + ', ' + attrs.match + ']', function(value){
				ctrl.$setValidity('match', value[0] === value[1] );
			}, true);
		}
	}
}]);

app.config(function ($routeProvider, $httpProvider) {
	$routeProvider
	.when('/home', {
		templateUrl: 'views/Wallpaper.html'
	})

	.when('/register', {
		templateUrl: 'views/registration/registrationForm.html',
		controller: 'registerController'
	})
	
	.when('/registrationSuccess', {
		templateUrl: 'views/registration/RegistrationSuccess.html',
	})

	.when('/login', {
		templateUrl: 'views/login/login.html',
		controller: 'LoginController'
	})

	.when('/search/:category/:manufacturer', {
		templateUrl: 'views/search/productList.html',
		controller: 'searchController'
	})

	.when('/favorites/:username', {
		templateUrl: 'views/favorites.html',
		controller: 'FavouritesController'
	})

	.when('/cart/:username', {
		templateUrl: 'views/shoppingCart.html',
		controller: 'CartController'
	})

	.when('/reviews/:index', {
		templateUrl: 'views/reviews.html',
		controller: 'ReviewController'
	})

	.when('/viewDetails/:sku', {
		templateUrl: 'views/search/ProductDetails.html',
		controller: 'ProductDetailsController'
	})

	.when('/showUserDetails/:username', {
		templateUrl: 'views/UserDetails/UserDetails.html',
		controller: 'UserDetailsController'
	})

	.when('/storeLocator', {
		templateUrl: 'views/store/StoreLocator.html',
		controller: 'StoreController'
	})

	.when('/profile/:activeTab', {
		templateUrl: 'views/UserDetails/UserProfile.html',
		controller: 'UserProfileController',
		resolve: {
			loggedin: checkLoggedin
		}
	})

	.otherwise({
		redirectTo: '/home'
	})

	$httpProvider
	.interceptors
	.push(function($q, $location)
			{
		return {
			response: function(response)
			{
				return response;
			},
			responseError: function(response)
			{
				if (response.status === 401)
					$location.url('/home');
				return $q.reject(response);
			}
		};
			});

});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
{
	var deferred = $q.defer();
	$http.get('/loggedin').success(function(user)
			{
		$rootScope.errorMessage = null;
//		User is Authenticated
		if (user !== '0')
			deferred.resolve();
//		User is Not Authenticated
		else
		{
			$rootScope.errorMessage = 'You need to log in.';
			deferred.reject();
			$location.url('/login');
		}
			});
	return deferred.promise;
};

app.controller('ReviewController', function ($scope, $http, $routeParams, ProductService) {
	var index = $routeParams.index;

	ProductService.fetch()
	.success( function(response){
		$scope.selectedProduct = response[index];
		$scope.reviews = response[index].reviews;
	});

	$scope.addReview = function(review){

		if(typeof $scope.selectedProduct.reviews == undefined){
			$scope.selectedProduct.reviews = [];
		}

		$scope.selectedProduct.reviews.push(review);

		ProductService.addReview($scope.selectedProduct, function(response){
			ProductService.fetch()
			.success( function(response) {
				$scope.reviews = response[index].reviews;
			});
		});
	}

});

app.controller('CartController', function ($scope, $http, $routeParams, ProductService) {
	var userId = $routeParams.username;
	$scope.cartProducts = [];
	if(typeof $scope.cartProducts == undefined){
		$scope.cartProducts = [];
	}
	$http.get('/user/cart/'+ userId)
	.success(function (response) {
		var cartIds = response;
		$scope.totalCount = 0;
		$scope.totalPrice = Number(0);
		for(var j in cartIds){
			(function(j){
				$scope.totalCount +=1;
				ProductService.getProduct(cartIds[j].id, function(response){
					var prdt = response.products[0];
					prdt.count = cartIds[j].count;
					prdt._id = cartIds[j]._id;
					$scope.cartProducts.push(prdt);
					$scope.totalPrice = $scope.totalPrice + Number(response.products[0].salePrice)*Number(cartIds[j].count);
				});
			})(j);
		}
	});

	$scope.updateCount = function(product){
		ProductService.fetchLogin(function(response){
			for(var i in response){
				if(response[i]._id == userId){
					$scope.user = response[i];
					break;
				}
			}

			for(var i in $scope.user.cart){
				if($scope.user.cart[i]._id == product._id){
					$scope.user.cart[i].count = product.count;
					break;
				}
			}
			ProductService.updateCart($scope.user, function(response){
				var cartIds = response;
				$scope.cartProducts = [];
				$scope.totalPrice = 0;
				for(var j in cartIds){

					(function(j) {
						ProductService.getProduct(cartIds[j].id, function(response){
							var prdt = response.products[0];
							prdt.count = cartIds[j].count;
							$scope.cartProducts.push(prdt);
							$scope.totalPrice = $scope.totalPrice + Number(response.products[0].salePrice)*Number(cartIds[j].count);
						});
					})(j);
				}

			});
		})
	};

	$scope.remove = function(product){
		ProductService.fetchLogin(function(response){
			for(var i in response){
				if(response[i]._id == userId){
					$scope.user = response[i];
					break;
				}
			}
			var ptr = 0;
			for(var i in $scope.user.cart){
				if($scope.user.cart[i].id == product.sku){
					ptr = i;
					break;
				}
			}

			$scope.user.cart.splice(ptr,1);
			ProductService.updateCart($scope.user, function(response){
				var cartIds = response;
				$scope.cartProducts = [];
				$scope.totalPrice = 0;
				for(var j in cartIds){
					ProductService.getProduct(cartIds[j].id, function(response){
						var prdt = response.products[0];
						prdt.count = cartIds[j].count;
						$scope.cartProducts.push(prdt);
						$scope.totalPrice = $scope.totalPrice + Number(response.products[0].salePrice)*Number(cartIds[j].count);
					});
				}
			});
		})
	};
});
