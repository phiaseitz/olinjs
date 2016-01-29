module.exports = function (dirName, ext, callback) {
	var fs = require('fs'); 
    var path = require('path');
    var files = [];

    fs.readdir(process.argv[2], function (err, list) {  
       	if (err) {
       		return callback(err);
       	}
       	list.forEach(function (file) { 
       		if (path.extname(file) === '.' + process.argv[3]){  
        		files.push(file);  
       		} 
    	});

    	return callback(null, files); 
    }); 
}

  
       
     