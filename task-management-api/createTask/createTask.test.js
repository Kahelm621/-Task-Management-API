const createTask = require("../createTask/index");
const context = {
  res: {},
  bindings: {},
};
const req = {
  body: {
    title: "Test Task",
    description: "Test Description",
    dueDate: "2024-12-31",
    priority: "High",
  },
};

test("should create a task", async () => {
  await createTask(context, req);
  expect(context.res.status).toBe(201);
  expect(context.res.body.title).toBe("Test Task");
});
