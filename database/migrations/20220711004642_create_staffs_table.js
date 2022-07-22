/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
  await knex.schema.withSchema("public").createTable("staffs", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.string("role").notNullable();
    table
      .timestamp("created_at", { useTz: true })
      .defaultTo(knex.raw("now()"))
      .notNullable();
    table.timestamp("updated_at", { useTz: true });

    table.foreign("id").references("id").inTable("auth.users");
  });

  return knex.raw("alter table public.staffs enable row level security;");
};

/** @param {import('knex').Knex} knex */
exports.down = async (knex) => {
  await knex.raw("alter table public.staffs disable row level security;");
  return knex.schema.dropTableIfExists("staffs");
};
