/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
  return knex.raw(`
    -- admin check with boolean
    create function public.is_admin(user_id uuid)
    returns boolean as $$
    declare
        admin int;
    begin
        select count(*)
        from public.staffs
        where staffs.role = 'moderator'
        and staffs.id = is_admin.user_id
        into admin;
        
        return admin > 0;
    end;
    $$ language plpgsql security definer;
  `);
};

/** @param {import('knex').Knex} knex */
exports.down = async (knex) => {
  return knex.raw(`drop function if exists public.is_admin(user_id uuid)`);
};
