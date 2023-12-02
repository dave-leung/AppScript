function exportTasksToSheets() {
    var calendarId = 'your-calendar-id'; // Replace with your calendar ID
    var startDate = new Date('2022-01-01'); // Replace with your start date
    var endDate = new Date('2022-12-31'); // Replace with your end date
    
    var calendar = CalendarApp.getCalendarById(calendarId);
    if (calendar === null) {
        throw new Error('Invalid calendar ID');
    }
    
    var events = calendar.getEvents(startDate, endDate);
    
    // Open the specific Google Sheets by ID or name
    var spreadsheetId = 'your-spreadsheet-id'; // Replace with your spreadsheet ID or name
    var sheetName = 'Sheet1'; // Replace with your sheet name
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    
    sheet.clear();
    
    // Write headers
    sheet.getRange(1, 1).setValue('Event Title');
    sheet.getRange(1, 2).setValue('Start Time');
    sheet.getRange(1, 3).setValue('End Time');
    sheet.getRange(1, 4).setValue('Completed');
    
    // Write events
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var row = i + 2;
        
        sheet.getRange(row, 1).setValue(event.getTitle());
        sheet.getRange(row, 2).setValue(event.getStartTime());
        sheet.getRange(row, 3).setValue(event.getEndTime());
        sheet.getRange(row, 4).setValue(event.isAllDayEvent() ? 'Yes' : 'No');
    }
}
