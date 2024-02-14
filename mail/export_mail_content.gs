
function captureMailContent() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var threads = GmailApp.search('from:example@example.com'); // Replace with the desired email address

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var subject = message.getSubject();
      var body = message.getPlainBody();
      var date = message.getDate();

      sheet.appendRow([subject, body, date]);
    }
  }
}
