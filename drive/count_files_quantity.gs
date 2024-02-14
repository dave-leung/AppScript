var fileCount = 0; // Initialize a global counter variable

function listFilesAndSubdirectories() {
  var folderId = "FOLDER_ID"; // Replace with your folder ID
  var folder = DriveApp.getFolderById(folderId);
  
  processFolder(folder, "/");
  Logger.log("Total number of files: " + fileCount);
}

function processFolder(folder, path) {
  var files = folder.getFiles();
  var subfolders = folder.getFolders();
  
  // Log every file in the folder
  while (files.hasNext()) {
    var file = files.next();
    var fileName = file.getName();
    Logger.log(path + fileName); // Log the path and file name
    fileCount++; // Increment the file counter
  }
  
  // Log every file in the subfolder(s)
  while (subfolders.hasNext()) {
    var subfolder = subfolders.next();
    processFolder(subfolder, path + subfolder.getName() + "/");
  }
}
