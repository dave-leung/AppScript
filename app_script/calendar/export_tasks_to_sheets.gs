function exportTasksToSheets() {
    
    var optionalArgs = {
    showCompleted: true,
    showHidden: true,
    showDeleted: true,
    maxResults: 100,
    dueMin: "2022-01-01T00:00:00Z",
    dueMax: "2023-12-31T23:59:59Z"
    };

    var taskListId = ''; // Replace with your actual task list ID
    if (taskListId === null) {
        throw new Error('Invalid task ID');
    }
    
    var tasks = Tasks.Tasks.list(taskListId, optionalArgs);

    
    // Open the specific Google Sheets by ID or name
    var spreadsheetId = ''; // Replace with your spreadsheet ID or name
    var sheetName = 'Sheet1'; // Replace with your sheet name
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    
    sheet.clear();
    
    // Write headers
    sheet.getRange(1, 1).setValue('Task Title');
    sheet.getRange(1, 2).setValue('Start Time');
    sheet.getRange(1, 3).setValue('End Time');
    sheet.getRange(1, 4).setValue('Completed');
    
    // Write tasks
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var row = i + 2;
        
        sheet.getRange(row, 1).setValue(task.getTitle());
        sheet.getRange(row, 2).setValue(task.getStartTime());
        sheet.getRange(row, 3).setValue(task.getEndTime());
        sheet.getRange(row, 4).setValue(task.isAllDayEvent() ? 'Yes' : 'No');
    }
}
