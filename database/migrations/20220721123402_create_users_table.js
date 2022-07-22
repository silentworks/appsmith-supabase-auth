/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
  await knex.schema.withSchema("public").createTable("users", (table) => {
    table.text("id");
    table.string("name").notNullable();
    table
      .timestamp("created_at", { useTz: true })
      .defaultTo(knex.raw("now()"))
      .notNullable();
    table.timestamp("updated_at", { useTz: true });
  });

  //   return knex.raw("alter table public.users enable row level security;");
};

/** @param {import('knex').Knex} knex */
exports.down = async (knex) => {
  //   await knex.raw("alter table public.users disable row level security;");
  return knex.schema.dropTableIfExists("users");
};
