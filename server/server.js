const app = require("./server-config.js");
const addErrorReporting = require("./middlewares/error.js");
const todoRoutes = require("./routes/todo.js");
const organizationRoutes = require("./routes/organization.js");

const port = process.env.PORT || 5000;

app.use("/todos", todoRoutes);
app.use("/organizations", organizationRoutes);

app.use(addErrorReporting);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
