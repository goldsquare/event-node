var controllers = angular.module('app.controllers', [])

controllers.controller('MyCtrl', function ($scope,UploadFactory, PreviewFactory, FbLoginFactory, TwitterLoginFactory) {

currentUser = "";

$('#yesBtn').hide();
$('#noBtn').hide();

$scope.upload = function ()
    {

    	$('#submitBtn').hide();
    	$('#yesBtn').show();
		$('#noBtn').show();
	
        PreviewFactory.preview($scope);
 		
    }

$scope.yes = function()
	{
		$('#yesBtn').hide();
		$('#noBtn').hide();
		$('#submitBtn').show();
		UploadFactory.upload($scope);
	}

$scope.no = function()
	{
		$('#yesBtn').hide();
		$('#noBtn').hide();	
		$('#submitBtn').show();
	}


         $scope.fbLogin = function ()
        {
        
            FbLoginFactory.login();

        }

     $scope.twitterLogin = function ($scope) 
      {
            TwitterLoginFactory.login();
      }
        	
        


});

