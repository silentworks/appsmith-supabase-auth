/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
  await knex.raw(`
    create function public.handle_new_staff()
    returns trigger as $$
    begin
      if ((NEW.raw_user_meta_data->>'name')::text is null) then
        return null;
      else
        insert into public.staffs (id, name, role)
        values (new.id, new.raw_user_meta_data->>'name', 'moderator');
        return new;
      end if;
    end;
    $$ language plpgsql security definer;
  `);

  return knex.raw(`
      create trigger on_auth_user_created
        after insert on auth.users
        for each row execute procedure public.handle_new_staff();
    `);
};

/** @param {import('knex').Knex} knex */
exports.down = async (knex) => {
  // You will need to elevate the user in order for the down to run on the auth.users table
  // just run the code commented below inside of the supabase dashboard SQL editor
  // alter user postgres with superuser;`
  await knex.raw("drop trigger if exists on_auth_user_created on auth.users;");
  return knex.raw("drop function if exists public.handle_new_staff();");
  // alter user postgres with nosuperuser;
};
