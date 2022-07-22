# Appsmith with Supabase Auth

These are migration files for the supabase database setup used in https://www.youtube.com/watch?v=xmb4JrTYhZg

## Installation

Using [npm](https://npmjs.org):

```sh
npm install
```

## Getting Started

Copy the `.env.example` and name it `.env`

Edit the file and enter all the required variable values

```
CONNECTION_STRING=
```

The "CONNECTION_STRING" can be found inside the Supabase Dashboard by going to [**Settings > Database**](https://app.supabase.com/project/_/settings/database) then scrolling down to **Connection string** and clicking on the **URI** tab. You should see a string looking like `postgresql://postgres:[YOUR-PASSWORD]@host:5432/postgres`.

### Run database migrations

```sh
npm m:up
```

### Run the seed data

```sh
npm s:run
```
