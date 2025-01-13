exports.up = function (knex) {
  return knex.schema
    .createTable("organizations", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.timestamps(true, true);
    })
    .createTable("users", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table
        .integer("organizationId")
        .unsigned()
        .references("id")
        .inTable("organizations")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .createTable("projects", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("description");
      table
        .integer("organizationId")
        .unsigned()
        .references("id")
        .inTable("organizations")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .createTable("tasks", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("description");
      table
        .integer("projectId")
        .unsigned()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .createTable("comments", function (table) {
      table.increments("id").primary();
      table.text("content").notNullable();
      table
        .integer("userId")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .integer("taskId")
        .unsigned()
        .references("id")
        .inTable("tasks")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .createTable("task_assignments", function (table) {
      table
        .integer("taskId")
        .unsigned()
        .references("id")
        .inTable("tasks")
        .onDelete("CASCADE");
      table
        .integer("userId")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.primary(["taskId", "userId"]);
    })
    .createTable("project_assignments", function (table) {
      table
        .integer("projectId")
        .unsigned()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE");
      table
        .integer("userId")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.primary(["projectId", "userId"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("project_assignments")
    .dropTableIfExists("task_assignments")
    .dropTableIfExists("comments")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects")
    .dropTableIfExists("users")
    .dropTableIfExists("organizations");
};
