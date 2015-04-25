var services = angular.module('upload.services', [])

services.factory('PreviewFactory', function ($http) {


        return{
             preview: function($scope){

        var status_elem = document.getElementById("status");
        var url_elem = document.getElementById("avatar_url");
        var preview_elem = document.getElementById("preview");
        var s3upload = new S3Upload({
        file_dom_selector: 'files',
        s3_sign_put_url: '/sign_s3',
        onProgress: function(percent, message) {
            status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
        },
        onFinishS3Put: function(public_url, fileType) {
           
           console.log(public_url);
            status_elem.innerHTML = "";
           //  status_elem.innerHTML = 'Upload completed. Uploaded to: '+ public_url;
            //url_elem.value = public_url;
            preview_elem.innerHTML = '<img id="pic" src="'+public_url+'" id="previewImage" width="500px" height="500px" >'
            
        },
        onError: function(status) {
            //status_elem.innerHTML = 'Upload error: ' + status;
        }
    });
        }
    }


});

services.factory('UploadFactory', function ($http) {

function sendInfo(month, day, year, url)
{
   
    var eventName = $('#eventName').val();
    var genre = $('#genre').val();
    var address = $('#address').val();
    var city = $('#city').val();
    var state = $('#state').val();
    var zipcode = $('#zipcode').val();
    
    //var databaseUrl = "http://localhost:3000";
    var databaseUrl = "http://example-43910.onmodulus.net";
    $http.post(databaseUrl+'/api/events',
    {
        user: currentUser, 
        userImageUrl: currentUserImage,
        eventName: eventName ,
        genre: genre, 
        state: state,
        city: city,
        address: address, 
        zipcode: zipcode,
        month: month, 
        day: day, 
        year: year,
        imageUrl: url,
        likes :[{
            user: "",
            profileUrl: ""
        }]
    }).success( function (data) {

            console.log(data);
            location.reload();

    });
    
}

			return{
               upload: function($scope){
             if(currentUser == "")
                    {
                      alert('must be logged in to post an event');
                    }
                    else
                    {
                    
        var status_elem = document.getElementById("status");
        var url_elem = document.getElementById("avatar_url");
        var preview_elem = document.getElementById("preview");
        var s3upload = new S3Upload({
        file_dom_selector: 'files',
        s3_sign_put_url: '/sign_s3',
        onProgress: function(percent, message) {
            status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
        },
        onFinishS3Put: function(public_url, fileType) {
           sendInfo(selectedMonth, selectedDay, selectedYear, public_url);
            status_elem.innerHTML = "";

           //  status_elem.innerHTML = 'Upload completed. Uploaded to: '+ public_url;
            //url_elem.value = public_url;
            //preview_elem.innerHTML = '<img id="pic" src="'+public_url+'" id="previewImage" width="500px" height="500px" >'
            
        },
        onError: function(status) {
            //status_elem.innerHTML = 'Upload error: ' + status;
        }
    });
                    
                 }

					
				 }
                }


});
