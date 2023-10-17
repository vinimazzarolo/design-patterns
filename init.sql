CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table if not exists contracts (
    id_contract uuid not null default uuid_generate_v4() primary key,
    description text,
    amount numeric,
    periods integer,
    date timestamp
);

create table if not exists payments (
    id_payment uuid not null default uuid_generate_v4() primary key,
    id_contract uuid references contracts(id_contract),
    amount numeric,
    date timestamp
);

insert into contracts (id_contract, description, amount, periods, date) values ('a2fc29ac-0cfd-4d05-902f-7e53f9e37ab5', 'Prestação de serviços escolares', 6000, 12, '2023-01-01T10:00:00');
insert into payments (id_payment, id_contract, amount, date) values ('26004d8a-b33a-40a4-af71-c09b271067b9', 'a2fc29ac-0cfd-4d05-902f-7e53f9e37ab5', 6000, '2023-01-05T10:00:00');