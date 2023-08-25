function renameFile() {
  var fileId = "YOUR_SOURCE_FILE_ID"; // Replace with your file ID
  var newName = "NEW_FILE_NAME"; // Replace with the new name you want
  
  var file = DriveApp.getFileById(fileId);
  file.setName(newName);
  
  Logger.log("File has been renamed to: " + file.getName());
}
