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
  const id = req.params.id;

  try {
    const task = await client.getEntity(id, id);
    context.res = {
      status: 200,
      body: task,
    };
  } catch (error) {
    context.res = {
      status: 404,
      body: "Task not found",
    };
  }
};
