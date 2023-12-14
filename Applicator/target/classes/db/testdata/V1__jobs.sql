\set employer1_id gen_random_uuid()
insert into employer (id, name, website)
values (:employer1_id, 'Employer 1', 'https://employer1.org');

insert into job (id, employer, description, position)
values (gen_random_uuid(), :employer1_id, 'Do stuff!', 'Head of stuff');

\set employer2_id gen_random_uuid()
insert into employer (id, name, website)
values (:employer1_id, 'Employer 2', 'https://employer2.org');

insert into job (id, employer, description, position)
values (gen_random_uuid(), :employer2_id, 'Do stuff!', 'Head of stuff');