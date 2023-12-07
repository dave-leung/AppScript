function listFoldersFiles() {
  var spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your spreadsheet ID
  var sheetName = 'Sheet1'; // Replace with your sheet name
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  sheet.clear();
  sheet.appendRow(["Folder Path", "Folder Name", "File Name", "File Type"]);

  var folderId = "YOUR_FOLDER_ID"; // Replace with your folder ID
  var folder = DriveApp.getFolderById(folderId);
  listFolderContents(folder, "", sheet);
}

function listFolderContents(folder, path, sheet) {
  var folders = folder.getFolders();
  var newPath = path + folder.getName() + "/";

  // List subfolders and their contents
  while (folders.hasNext()) {
    var subFolder = folders.next();
    sheet.appendRow([newPath, subFolder.getName(), "", ""]); // Leave 'File Name' and 'File Type' empty for folders
    listFolderContents(subFolder, newPath, sheet); // Recursive call to list subfolder contents
  }

  // List files in the current folder
  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    sheet.appendRow([newPath, "", file.getName(), file.getMimeType()]); // File name and MIME type
  }
}
