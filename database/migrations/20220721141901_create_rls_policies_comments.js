/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
  await knex.raw(`
    CREATE POLICY "Allow select for admin users or staff assigned" 
    ON public.comments 
    FOR SELECT USING (
      is_admin(auth.uid()) or auth.uid() = staff
    );
  `);

  await knex.raw(`
    -- update policy
    CREATE POLICY "Allow update for admin users" 
    ON public.comments 
    FOR UPDATE USING (is_admin(auth.uid()));
  `);

  return knex.raw(`
    -- delete policy
    CREATE POLICY "Allow delete for admin users" 
    ON public.comments 
    FOR DELETE USING (is_admin(auth.uid()));
  `);
};

/** @param {import('knex').Knex} knex */
exports.down = async (knex) => {
  await knex.raw(
    `DROP POLICY IF EXISTS "Allow select for admin users or staff assigned" ON public.comments`
  );
  await knex.raw(
    `DROP POLICY IF EXISTS "Allow update for admin users" ON public.comments`
  );
  return knex.raw(
    `DROP POLICY IF EXISTS "Allow delete for admin users" ON public.comments`
  );
};
