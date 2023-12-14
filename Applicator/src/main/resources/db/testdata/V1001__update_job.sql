do
$$
    declare
        employer3_id uuid := '11111111-1111-1111-1111-111111111111';
        job3_id      uuid := '22222222-2222-2222-2222-222222222222';
    begin
        insert into employer (id, name, website_url)
        values (employer3_id, 'Employer 3', 'https://employer3.org');

        insert into job (id, employer, description, position, original_url)
        values (job3_id, employer3_id, 'Do stuff!', 'Head of stuff', 'https://employer3.org/job3');
    end
$$;