app.factory('JobService', function($http) {
	var jobService = this;
	var BASE_URL = "http://localhost:8080/LetsTalkBackend"

	jobService.saveJob = function(job) {

		console.log('entering submit service in job')
		console.log('entering register service')
		return $http.post(BASE_URL + "/postjob", job)

	}
	jobService.getAllJobs = function() {
		return $http.get(BASE_URL + "/getAllJobs");
	}
	
	jobService.getJobDetail=function(jobId){
		return $http.get(BASE_URL + "/getJobDetail/"+jobId)
	}
	
	return jobService;
})