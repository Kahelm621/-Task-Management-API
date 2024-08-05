module.exports = async function (context, req) {
  const task = req.body;
  if (!task || !task.title) {
    context.res = {
      status: 400,
      body: "Please provide a title for the task",
    };
    return;
  }

  // Simulate storing task (in a real app, store in a database)
  task.id = new Date().getTime();
  task.completed = false;

  context.res = {
    status: 201,
    body: task,
  };
};
