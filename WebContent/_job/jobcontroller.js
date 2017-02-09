app.controller('JobController',function($scope,$location,JobService){
	$scope.job={jobId:'',jobTitle:'',jobDescription:'',skillsRequired:'',salary:'',location:''};
	$scope.message;
	$scope.saveJob=function(){
		console.log('Entering submit save post function in controller')
		JobService.saveJob($scope.job)
		.then(function(response){
			console.log('Entering submit funcntion in jobcontroller')
			alert('posted successfully');
				  $location.path("/");
				},
		function(response){
					console.log('Entering submit failure in job controller');
					if(response.status==401){
						$location.path('/login')
					}
					else{
					console.log(response.data.message)
					$location.path('/postJob')
					}
				})
			}
				
				
	function getAllJobs(){
		console.log('entering get All jobs')
		JobService.getAllJobs()
		.then(function(response){
			console.log(response.status); 
			$scope.jobs=response.data;  
			
		},function(response){
			console.log(response.status)
		})
	}
	getAllJobs();
	
	
	$scope.getJobDetail=function(jobId){
		JobService.getJobDetail(jobId)
	.then(function(response){
		$scope.jobDetail=response.data; 
		console.log(response.status)
		
	},function(response){
		console.log(response.status)
	})
	}	
	
	
	
	
})
	
	
	
	
	
