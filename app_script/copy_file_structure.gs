function copyDriveStructureWithContent() {
  var sourceFolderId = " "; // Input your source ID here
  var targetFolderId = " "; // Input your destination ID here
  
  var sourceFolder = DriveApp.getFolderById(sourceFolderId);
  var targetFolder = DriveApp.getFolderById(targetFolderId);
  
  copyFolderStructure(sourceFolder, targetFolder);
}

function copyFolderStructure(sourceFolder, targetFolder) {
    // Copy the structure of sub-folders
    var subfolders = sourceFolder.getFolders();
    while (subfolders.hasNext()) {
        var sourceSubFolder = subfolders.next();
        
        // Create a new folder in the target folder with the same name
        var targetSubFolder = targetFolder.createFolder(sourceSubFolder.getName());
        
        // Recursively copy the structure for the sub-folder
        copyFolderStructure(sourceSubFolder, targetSubFolder);
    }
    
    // Copy the files with their content while preserving the original format and style
    var files = sourceFolder.getFiles();
    while (files.hasNext()) {
        var file = files.next();
        
        // Make a copy of the file in the target folder
        var newFile = file.makeCopy(targetFolder);
        
        // Rename the file without 'copy of'
        var newName = file.getName().replace('copy of', '');
        newFile.setName(newName);
        
        // Log the activity
        Logger.log("Copied file: " + file.getName() + " to " + newFile.getName());
    }
}
