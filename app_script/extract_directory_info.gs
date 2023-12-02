function listFilesAndSubdirectories() {
    var folderId = " "; // Replace with your folder ID
    var folder = DriveApp.getFolderById(folderId);
    
    var logSheet = createLogSheet(); // Create a new sheet for logging
    
    processFolder(folder, "", logSheet);
}

function processFolder(folder, indent, logSheet) {
    var files = folder.getFiles();
    var subfolders = folder.getFolders();
    
    while (files.hasNext()) {
        var file = files.next();
        logSheet.appendRow([indent + "File: " + file.getName()]); // Append log to sheet
    }
    
    while (subfolders.hasNext()) {
        var subfolder = subfolders.next();
        logSheet.appendRow([indent + "Folder: " + subfolder.getName()]); // Append log to sheet
        processFolder(subfolder, indent + "  ", logSheet);
    }
}

function createLogSheet() {
    var spreadsheet = SpreadsheetApp.create("Execution Log"); // Create a new spreadsheet
    var sheet = spreadsheet.getActiveSheet();
    sheet.appendRow(["Execution Log"]); // Add header to sheet
    return sheet;
}
