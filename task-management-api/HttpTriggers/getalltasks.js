const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const connectionString = process.env.AzureWebJobsStorage;
const tableName = "tasks";
const client = new TableClient(
  connectionString,
  tableName,
  new AzureNamedKeyCredential(
    process.env.StorageAccountName,
    process.env.StorageAccountKey
  )
);

module.exports = async function (context, req) {
  try {
    const tasks = [];
    for await (const task of client.listEntities()) {
      tasks.push(task);
    }
    context.res = {
      status: 200,
      body: tasks,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: "Error retrieving tasks",
    };
  }
};
