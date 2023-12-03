function listTasks(taskListId) {
  var optionalArgs = {
    showCompleted: true,
    showHidden: true,
    showDeleted: true,
    maxResults: 100,
    dueMin: "2022-01-01T00:00:00Z",
    dueMax: "2023-12-31T23:59:59Z"
  };

  var taskListId = ''; // Replace with your actual task list ID
  var tasks = Tasks.Tasks.list(taskListId, optionalArgs);
  var taskCount = 0; // Initialize the task count variable

   if (tasks.items) {
    taskCount = tasks.items.length; // Update the task count with the number of tasks
    for (var i = 0; i < tasks.items.length; i++) {
      var task = tasks.items[i];

      Logger.log(task);
      if (task.status == "completed") {
        //perform operation
      }
    }
  } else {
    Logger.log('No tasks found.');
  }

  Logger.log("Total tasks: " + taskCount); // Log the result
}
