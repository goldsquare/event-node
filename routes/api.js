var express = require('express');
var aws = require('aws-sdk');
var app = express();


var AWS_ACCESS_KEY = "<key>";
var AWS_SECRET_KEY = "<key>";
var S3_BUCKET = "shawns3";

exports.upload = function (req,res)
{
     aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
   
   // console.log(req);
   
    var s3 = new aws.S3(); 
    var s3_params = { 
        Bucket: S3_BUCKET, 
        Key: req.query.s3_object_name, 
        Expires: 60, 
        ContentType: req.query.s3_object_type, 
        ACL: 'public-read'
    }; 
    
    s3.getSignedUrl('putObject', s3_params, function(err, data){ 
        if(err){ 
            console.log(err); 
        }
        else{ 
            var return_data = {
                signed_request: data,
                type: req.query.s3_object_type,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.s3_object_name 
            };
            res.write(JSON.stringify(return_data));
            res.end();
        } 
    });
}
