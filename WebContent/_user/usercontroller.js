app
		.controller(
				'UserController',
				function($scope, $rootScope, $location, UserService) {
					$scope.user = {
						id : '',
						username : '',
						password : '',
						email : '',
						role : '',
						isOnline : '',
						enabled : ''
					};
					$scope.message;
					$scope.submit = function() {
						console
								.log('Entering submit function in usercontroller')
						UserService
								.authenticate($scope.user)
								.then(
										function(response) {
											console
													.log('Entering submit function22 in usercontroller')
											$scope.user = response.data;
											$rootScope.currentUser = $scope.user;
alert('currentUser');
											console
													.log('Entering submit final in usercontroller')
											$location.path("/");
										},
										function(response) {
											console
													.log('Entering submit failure')
											$scope.message = "invalid username and password";
											$location.path("/login");

										})
					}

					$scope.registerUser = function() {
						console.log('entering registerUser')
						UserService
								.registerUser($scope.user)
								.then(
										function(response) {
											console
													.log('Enter registration failed.........')
											console.log("registration success"
													+ response.status)
											$location.path("/login");
											alert('successfully register...Login with the same username and password');

										},
										function(response) {
											console.log("registration failed"
													+ response.status)
											console.log(response.data)
											$scope.errorMessage = "Registration failed...."
													+ response.data.message
											$location.path("/register")
										})
					}
					$rootScope.logout = function() {
						console.log('logout function')
						delete $rootScope.currentUser;

						UserService.logout().then(function(response) {
							console.log("logged out successfully..");
							$scope.message = "Logged out Successfully";
							$location.path('/login')
						}, function(response) {
							console.log(response.status);
						})

					}
					$rootScope.hasRole = function(role) {
						if ($rootScope.currentUser.role == undefined)
							return false;
						return $rootScope.currentUser.role == role;
					}

					$scope.friendRequest = function(username) {
						alert('friendRequest in userController')
						console.log('friendrequest function')
						UserService.friendRequest(username).then(
								function(response) {
									console.log(response.status);
									alert('Friend request Send')
									getAllUsers();
									$location.path('/getAllUsers')
								}, function(response) {
									console.log(response.status);
								})
					}

					function getAllUsers() {
						console.log('entering get all users ')
						UserService.getAllUsers().then(function(response) {
							
							console.log('users function')
							console.log(response.status)
							console.log(response.data)
							$scope.users = response.data
							
						}, function(response) {
							console.log(response.status)
						})
					}
					getAllUsers()

				})