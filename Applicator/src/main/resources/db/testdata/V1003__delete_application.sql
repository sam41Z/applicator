do
$$
    declare
        employer_id    uuid := '1aaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
        job_id         uuid := '2aaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
        application_id uuid := '3aaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    begin
        insert into employer (id, name, website_url)
        values (employer_id, 'Employer', 'https://employer.org');

        insert into job (id, employer, description, position, original_url)
        values (job_id, employer_id, 'Do stuff!', 'Head of stuff', 'https://employer.org/job3');

        insert into application(id, job, cover_letter)
        values (application_id, job_id, 'I am very good');
    end
$$;