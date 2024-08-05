const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const connectionString = process.env.AzureWebJobsStorage; // Azure Table Storage connection string
const tableName = "tasks"; // Table name
const client = new TableClient(
  connectionString,
  tableName,
  new AzureNamedKeyCredential(
    process.env.StorageAccountName,
    process.env.StorageAccountKey
  )
);

module.exports = async function (context, req) {
  const task = req.body;
  task.id = new Date().getTime().toString(); // Simple ID generation
  task.completed = false;

  try {
    await client.createEntity(task);
    context.res = {
      status: 201,
      body: task,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: "Error creating task",
    };
  }
};
