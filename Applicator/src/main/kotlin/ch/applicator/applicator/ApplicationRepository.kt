package ch.applicator.applicator

import ch.applicator.applicator.api.ApplicationStatus
import ch.applicator.jooq.Tables.*
import ch.applicator.jooq.enums.Status
import org.jooq.DSLContext
import org.jooq.Record
import org.jooq.Result
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.util.*

@Component
class ApplicationRepository @Autowired constructor(val create: DSLContext) {

    fun create(jobId: UUID, coverLetter: String): UUID {
        val uuid = UUID.randomUUID()
        create.insertInto(APPLICATION, APPLICATION.ID, APPLICATION.JOB, APPLICATION.COVER_LETTER)
            .values(uuid, jobId, coverLetter)
            .execute()
        return uuid
    }

    fun update(id: UUID, jobId: UUID, coverLetter: String, status: ApplicationStatus) {
        create.update(APPLICATION)
            .set(APPLICATION.JOB, jobId)
            .set(APPLICATION.COVER_LETTER, coverLetter)
            .set(APPLICATION.STATUS, Status.valueOf(status.toString().lowercase()))
            .where(APPLICATION.ID.eq(id))
            .execute()
    }

    fun get(id: UUID): Record {
        return create.select()
            .from(APPLICATION)
            .where(APPLICATION.ID.eq(id))
            .fetchSingle()
    }

    fun getAll(): Result<Record> {
        return create.select()
            .from(APPLICATION)
            .fetch()
    }

    fun getByJobId(jobId: UUID): Result<Record> {
        return create.select()
            .from(APPLICATION)
            .where(APPLICATION.JOB.eq(jobId))
            .fetch()
    }
}