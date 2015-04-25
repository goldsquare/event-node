
var app = angular.module('app', [
    'app.controllers',
    'upload.services',
    'timeline.services',
    'login.services'
    ], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});


window.fbAsyncInit = function() {
        FB.init({
          appId      : '1713232558902730',
          xfbml      : true,
          version    : 'v2.1'
        });

         
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));



