const path = require('path')
const fileSys = require('fs')

exports.resolvedPath = function(directoryPath, fileName){
    return path.resolve(directoryPath, fileName)

}

exports.readFile = function(filePath){
    return new Promise(function(resolve, reject){
        fileSys.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data);
	    });
    });
}


exports.readDir = function(dirPath){
    return new Promise(function(resolve, reject){
        fileSys.readdir(dirPath, (err, files) => {
            if (err) reject(err);
            resolve(files);
	    });
    });
}

exports.readDirFiles = function(dirPath){
    var retArray = []
    exports.readDir(dirPath)
        .then( function (somefiles) {
            for( var i; i < somefiles.length; i++){
                exports.readFile(exports.resolvedPath(dirPath, somefiles[i]))
            }
            
        })
        return Promise.all()
}  
    // This almost worked
    // var contents = []
    // return new Promise(function(resolve, reject){
    //     fileSys.readdir(dirPath, (err, files) => {
    //         if (err) reject(err);
    //         for (var i; i < files.length; i++){
    //             fileSys.readFile(filePath, 'utf8', (err, data) => {
    //                 if (err) reject(err);
    //                 contents.push(data);
	//             });
    //         }
    //         resolve(contents);
    //     });
    // });
