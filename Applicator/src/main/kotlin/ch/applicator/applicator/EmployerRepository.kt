package ch.applicator.applicator

import ch.applicator.jooq.Tables
import ch.applicator.jooq.Tables.*
import org.jooq.DSLContext
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.net.URL
import java.util.*

@Component
class EmployerRepository @Autowired constructor(val create: DSLContext) {
    fun create(name: String, websiteUrl: URL): UUID {
        val uuid = UUID.randomUUID()
        create.insertInto(EMPLOYER, EMPLOYER.ID, EMPLOYER.NAME, EMPLOYER.WEBSITE_URL)
            .values(uuid, name, websiteUrl.toString())
            .execute()
        return uuid
    }

    fun update(id: UUID, name: String, websiteUrl: URL) {
        create.update(EMPLOYER)
            .set(EMPLOYER.NAME, name)
            .set(EMPLOYER.WEBSITE_URL, websiteUrl.toString())
            .where(EMPLOYER.ID.eq(id))
            .execute()
    }
}