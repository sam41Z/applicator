package ch.applicator.applicator

import ch.applicator.jooq.Tables.*
import org.jooq.DSLContext
import org.jooq.Record
import org.jooq.Record4
import org.jooq.Result
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.net.URL
import java.util.*

@Component
class JobRepository @Autowired constructor(val create: DSLContext) {

    fun create(employerId: UUID, description: String, position: String, originalUrl: URL): UUID {
        val uuid = UUID.randomUUID()
        create.insertInto(JOB, JOB.ID, JOB.EMPLOYER, JOB.DESCRIPTION, JOB.POSITION, JOB.ORIGINAL_URL)
            .values(uuid, employerId, description, position, originalUrl.toString())
            .execute()
        return uuid
    }

    fun update(id: UUID, description: String, position: String, originalUrl: URL) {
        create.update(JOB)
            .set(JOB.DESCRIPTION, description)
            .set(JOB.POSITION, position)
            .set(JOB.ORIGINAL_URL, originalUrl.toString())
            .where(JOB.ID.eq(id))
            .execute()
    }

    fun getAllJobs(): Result<Record> {
        return create.select()
            .from(JOB)
            .join(EMPLOYER)
            .on(JOB.EMPLOYER.eq(EMPLOYER.ID))
            .fetch()
    }

    fun getJob(id: UUID): Record {
        return create.select()
            .from(JOB)
            .join(EMPLOYER)
            .on(JOB.EMPLOYER.eq(EMPLOYER.ID))
            .where(JOB.ID.eq(id))
            .fetchSingle()
    }


}
