var fs = require('fs');
var path = require('path');
var matchFilesCounter = 0;
var extension = process.argv[2];
var searchString = process.argv[3];
var currentPath = process.cwd();


// this function search for the rellevant files.
function checkDir(dirPath){
	var files = fs.readdirSync(dirPath); 
	for(var i=0;i<files.length;i++){  
		var filePath = path.resolve(dirPath, files[i]);
		var stats = fs.lstatSync(filePath);
		// if it's a directory then execute recursion.
		if (stats.isDirectory()){   
			checkDir(filePath);
		}else { 
		// if it's a file it check if extension matches and if it contains the text. 
			var extensionCurrentFile = path.parse(filePath).ext.slice(1);  
			if (extensionCurrentFile === extension){
				var data = fs.readFileSync(filePath); 
				if(data.includes(searchString)){
					matchFilesCounter++;
					console.log(filePath);
				}
			}
		}
	}
}

// Running application without 4 parameters prints a message else run the function.
if (process.argv.length !== 4) {
	console.log('USAGE: node search [EXT] [TEXT]');
	process.exit(1);
} else{
	checkDir(currentPath);
}

// if no files was found then the counter will remain 0.
if (matchFilesCounter === 0){
	console.log("No file was found");
}