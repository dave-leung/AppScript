/*
Google Tasks API: https://developers.google.com/tasks/reference/rest/v1/tasks#Task
*/

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
    sheet.getRange(1, 2).setValue('End Time');
    sheet.getRange(1, 3).setValue('Completed');
    sheet.getRange(1, 4).setValue('Notes');
    sheet.getRange(1, 5).setValue('Status');
    sheet.getRange(1, 6).setValue('Parent Task');
    
    // Write tasks
    for (var i = 0; i < tasks.items.length; i++) {
        var task = tasks.items[i];
        var row = i + 2;
        
        sheet.getRange(row, 1).setValue(task.title);
        sheet.getRange(row, 2).setValue(task.due ? task.due.split('T')[0] : ''); // Update to capture only the date
        sheet.getRange(row, 3).setValue(task.completed ? 'Yes' : 'No');
        sheet.getRange(row, 4).setValue(task.notes);
        sheet.getRange(row, 5).setValue(task.status);
        sheet.getRange(row, 6).setValue(task.parent);
    }
}