do
$$
    declare
        employer1_id    uuid := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
        job1_id         uuid := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
        application1_id uuid := 'cccccccc-cccc-cccc-cccc-cccccccccccc';
        employer2_id    uuid := 'dddddddd-dddd-dddd-dddd-dddddddddddd';
        job2_id         uuid := 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee';
        application2_id uuid := 'ffffffff-ffff-ffff-ffff-ffffffffffff';
        employer3_id    uuid := '11111111-1111-1111-1111-111111111111';
        job3_id         uuid := '22222222-2222-2222-2222-222222222222';
    begin
        insert into employer (id, name, website_url)
        values (employer1_id, 'Employer 1', 'https://employer1.org');

        insert into job (id, employer, description, position, original_url)
        values (job1_id, employer1_id, 'Do stuff!', 'Head of stuff', 'https://employer1.org/job1');

        insert into application(id, job, cover_letter)
        values (application1_id, job1_id, 'I am very good');

        insert into employer (id, name, website_url)
        values (employer2_id, 'Employer 2', 'https://employer2.org');

        insert into job (id, employer, description, position, original_url)
        values (job2_id, employer2_id, 'Do stuff!', 'Head of stuff', 'https://employer2.org/job2');

        insert into application(id, job, cover_letter)
        values (application2_id, job2_id, 'I am very good');

        insert into employer (id, name, website_url)
        values (employer3_id, 'Employer 3', 'https://employer3.org');

        insert into job (id, employer, description, position, original_url)
        values (job3_id, employer3_id, 'Do stuff!', 'Head of stuff', 'https://employer3.org/job3');
    end
$$;
