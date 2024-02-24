create type status as enum ('draft','applied', 'interviewing', 'offered',
    'rejected', 'declined', 'accepted');
create table employer
(
    id          uuid primary key,
    name        text not null,
    website_url text
);

create table job
(
    id           uuid primary key,
    employer     uuid references employer,
    description  text,
    position     text,
    original_url text
);

create table application
(
    id           uuid primary key,
    job          uuid references job unique,
    cover_letter text,
    status       status default 'draft'
);

