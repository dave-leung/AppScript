function exportSubscribedToSheets() {
    var spreadsheetId = ""; // Replace with your spreadsheet ID
    var sheetName = "Sheet1"; // Replace with your sheet name
    
    var channels = getSubscribedChannels();
    
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    
    // Clear existing data in the sheet
    sheet.clearContents();
    
   // Write headers
    sheet.getRange(1, 1).setValue("Subscription");
    sheet.getRange(1, 2).setValue("Channel Link");
    sheet.getRange(1, 3).setValue("Content Details");
    sheet.getRange(1, 4).setValue("Subscription ID");
    sheet.getRange(1, 5).setValue("Snippet");
    
    // Write channel data
    for (var i = 0; i < channels.length; i++) {
        var channel = channels[i];
        sheet.getRange(i + 2, 1).setValue(channel.name);
        sheet.getRange(i + 2, 2).setValue(channel.link);
        sheet.getRange(i + 2, 3).setValue(channel.contentDetails);
        sheet.getRange(i + 2, 4).setValue(channel.id);
        sheet.getRange(i + 2, 5).setValue(channel.snippet);
    }
}

function getSubscribedChannels() {
    var channels = [];
    var nextPageToken = '';
    
    do {
        var response = YouTube.Subscriptions.list('snippet', {
            mine: true,
            part: 'snippet,contentDetails,id,subscriberSnippet',
            maxResults: 50,
            pageToken: nextPageToken
        });
        
        var items = response.items;
        if (items) {
            for (var i = 0; i < items.length; i++) {
                var channel = {
                    name: items[i].snippet.title,
                    link: 'https://www.youtube.com/channel/' + items[i].id,
                    contentDetails: items[i].contentDetails,
                    id: items[i].id,
                    snippet: items[i].snippet,
                    subscriberSnippet: items[i].subscriberSnippet
                };
                channels.push(channel);
            }
        }
        
        nextPageToken = response.nextPageToken;
    } while (nextPageToken);
    
    return channels;
}