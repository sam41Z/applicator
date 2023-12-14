do
$$
    declare
        employer1_id    uuid := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
        job1_id         uuid := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
        application1_id uuid := 'cccccccc-cccc-cccc-cccc-cccccccccccc';
        employer2_id    uuid := 'dddddddd-dddd-dddd-dddd-dddddddddddd';
        job2_id         uuid := 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee';
        application2_id uuid := 'ffffffff-ffff-ffff-ffff-ffffffffffff';
    begin
        insert into employer (id, name, website)
        values (employer1_id, 'Employer 1', 'https://employer1.org');

        insert into job (id, employer, description, position)
        values (job1_id, employer1_id, 'Do stuff!', 'Head of stuff');

        insert into application(id, job, cover_letter)
        values (application1_id, job1_id, 'I am very good');

        insert into employer (id, name, website)
        values (employer2_id, 'Employer 2', 'https://employer2.org');

        insert into job (id, employer, description, position)
        values (job2_id, employer2_id, 'Do stuff!', 'Head of stuff');

        insert into application(id, job, cover_letter)
        values (application2_id, job2_id, 'I am very good');
    end
$$;
