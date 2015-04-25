
var services = angular.module('login.services', [])

var loginUrl = "http://example-43910.onmodulus.net/api/users";


var myData = new Firebase('https://vivid-inferno-434.firebaseio.com');


services.factory('TwitterLoginFactory', function ($http) {


        return{
          login: function()
          {
              console.log("twitter");
      //  twitter login
             
              myData.authWithOAuthPopup("twitter", function(error, authData) {
                if (error) {
                  console.log("Login Failed!", error);
                } else {
                
                  console.log("logged in to twitter");
                 currentUser = authData.twitter.cachedUserProfile.screen_name;
                 

                 console.log(currentUser);

                   currentUserImage = authData.twitter.cachedUserProfile.profile_image_url;
                  //twitterToken =  authData.twitter.accessToken;

                // send data to mongoDB 
            $http.get(loginUrl, { params: { username : currentUser}}).success( function (data) {

              if (data.length == 0)
              {
                $http.post(loginUrl, {username : currentUser , profileUrl : currentUserImage}).success( function (data) {

                    console.log(data);

                });
              }

      });

                }
           
              });
              
                

          }
        }


});


services.factory('FbLoginFactory' , function ($http) {

        return{
          login: function (){
              console.log("facebook");
            // facebook login
      
       myData.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
      
        scope: "email,user_likes,publish_actions,user_friends" // the permissions requested
        fbToken =  (authData.facebook.accessToken);

       currentUser = authData.facebook.cachedUserProfile.name;
       currentUserImage = authData.facebook.cachedUserProfile.picture.data.url;

        console.log(currentUser);

      // send data to mongoDB 
      $http.get(loginUrl, { params: { username : currentUser}}).success( function (data) {

              if (data.length == 0)
              {
                $http.post(loginUrl, {username : currentUser , profileUrl: currentUserImage}).success( function (data) {

                    console.log(data);

                });
              }

      });

      }
  });

          }
        }

});











