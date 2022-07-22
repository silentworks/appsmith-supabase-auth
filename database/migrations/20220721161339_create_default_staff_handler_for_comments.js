/** @param {import('knex').Knex} knex */
exports.up = async (knex) => {
  await knex.raw(`
    create function public.handle_default_staff()
    returns trigger as $$
    declare
      selected_comment comments%rowtype;
    begin
      if (is_admin(auth.uid())) then
        select * from public.comments 
        into selected_comment
        where id = NEW.id;
        
        if found then
          new.staff = auth.uid();
        end if;
      end if;
      return new;
    end;
    $$ language plpgsql security invoker;
  `);

  return knex.raw(`
    create trigger on_comment_updated
      before update on public.comments
      for each row execute procedure public.handle_default_staff();
  `);
};

/** @param {import('knex').Knex} knex */
exports.down = async (knex) => {
  await knex.raw(
    "drop trigger if exists on_comment_updated on public.comments;"
  );
  return knex.raw("drop function if exists public.handle_default_staff();");
};
