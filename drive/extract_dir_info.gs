function createSheetsForFolders() {
  var spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your spreadsheet ID
  var folderIds = ["FOLDER_ID_1", "FOLDER_ID_2", "FOLDER_ID_3"]; // Replace with your folder IDs

  for (var i = 0; i < folderIds.length; i++) {
    var folderId = folderIds[i];
    var folder = DriveApp.getFolderById(folderId);
    var folderName = folder.getName();
    var sheetName = folderName.replace(/[\\\/:*?\"<>|]/g, ''); // Remove invalid characters from folder name

    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName(sheetName);

    if (sheet) {
      sheet.clear();
    } else {
      sheet = spreadsheet.insertSheet(sheetName);
      sheet.appendRow(["Folder Path", "Folder Name", "File Name", "File Type"]);
    }

    listFolderContents(folder, "", sheet);
  }
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
