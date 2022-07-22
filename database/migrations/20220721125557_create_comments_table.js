/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.withSchema("public").createTable("comments", (table) => {
    table
      .uuid("id")
      .unique()
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("user").notNullable();
    table.uuid("staff");
    table.date("date");
    table.text("question");
    table.text("answer");
    table
      .timestamp("created_at", { useTz: true })
      .defaultTo(knex.raw("now()"))
      .notNullable();
    table.timestamp("updated_at", { useTz: true });

    table.foreign("staff").references("id").inTable("public.staffs");
  });

  return knex.raw("alter table public.comments enable row level security;");
};

/** @param {import('knex').Knex} knex */
exports.down = async (knex) => {
  await knex.raw("alter table public.comments disable row level security;");
  return knex.schema.withSchema("public").dropTableIfExists("comments");
};
