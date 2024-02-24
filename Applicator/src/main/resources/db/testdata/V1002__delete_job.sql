do
$$
    declare
        employer1_id    uuid := '1bbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
        job1_id         uuid := '2bbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
        employer2_id    uuid := '3bbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
        job2_id         uuid := '4bbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
        application2_id uuid := '5bbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
    begin
        insert into employer (id, name, website_url)
        values (employer1_id, 'Employer 1', 'https://employer1.org');

        insert into job (id, employer, description, position, original_url)
        values (job1_id, employer1_id, 'Do stuff!', 'Head of stuff', 'https://employer1.org/job3');

        insert into employer (id, name, website_url)
        values (employer2_id, 'Employer 2', 'https://employer2.org');

        insert into job (id, employer, description, position, original_url)
        values (job2_id, employer2_id, 'Do stuff!', 'Head of stuff', 'https://employer2.org/job2');

        insert into application(id, job, cover_letter)
        values (application2_id, job2_id, 'I am very good');
    end
$$;