/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { id: "susie@mail.com", name: "Susie Parker" },
    { id: "cedrick@mail.com", name: "Cedrick Feeney" },
    { id: "larue@mail.com", name: "Larue Gulgowski" },
    { id: "maudie@mail.com", name: "Maudie Tremblay" },
    { id: "lavonne@mail.com", name: "Lavonne McCullough" },
    { id: "dustin@mail.com", name: "Dustin Hintz" },
    { id: "nels@mail.com", name: "Nels Deckow" },
    { id: "bud@mail.com", name: "Bud Shanahan" },
    { id: "neal@mail.com", name: "Neal Connelly" },
    { id: "kylie@mail.com", name: "Kylie Stracke" },
    { id: "evert@mail.com", name: "Evert Cruickshank" },
    { id: "chanelle@mail.com", name: "Chanelle Effertz" },
    { id: "marisol@mail.com", name: "Marisol Cole" },
    { id: "tatum@mail.com", name: "Tatum Weber" },
    { id: "edgardo@mail.com", name: "Edgardo Dickens" },
    { id: "tressa@mail.com", name: "Tressa Spencer" },
    { id: "torey@mail.com", name: "Torey Schowalter" },
    { id: "kareem@mail.com", name: "Kareem Brown" },
    { id: "angel@mail.com", name: "Angel Rutherford" },
    { id: "chadd@mail.com", name: "Chadd Bartoletti" },
  ]);
};
