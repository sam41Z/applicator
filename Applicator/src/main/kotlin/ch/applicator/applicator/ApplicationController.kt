package ch.applicator.applicator

import ch.applicator.applicator.api.Application
import ch.applicator.applicator.api.ApplicationStatus
import ch.applicator.applicator.api.Job
import ch.applicator.jooq.Tables
import org.jooq.Record
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.*

@RestController
@RequestMapping("/applications")
class ApplicationController @Autowired constructor(
    val applicationRepository: ApplicationRepository
) {

    @GetMapping("/{id}")
    fun get(@PathVariable id: UUID): Application {
        return getApplicationById(id)
    }

    @GetMapping()
    fun getAll(@RequestParam(required = false) jobId: UUID?): List<Application> {
        return (
                if (jobId != null) applicationRepository.getByJobId(jobId)
                else applicationRepository.getAll())
            .map { record -> mapApplication(record) }
    }

    @PutMapping("/{id}")
    fun update(@PathVariable id: UUID, @RequestBody body: Application): Application {
        if (id != body.id) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "ID mismatch")
        }
        applicationRepository.update(id, body.job, body.coverLetter, body.status)
        return getApplicationById(id)
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody body: ApplicationCreate): Application {
        val uuid = applicationRepository.create(body.job, body.coverLetter)
        return getApplicationById(uuid)
    }

    data class ApplicationCreate(
        var job: UUID,
        var coverLetter: String
    )

    private fun getApplicationById(id: UUID) = applicationRepository.get(id).map { record -> mapApplication(record) }

    private fun mapApplication(record: Record): Application {
        val applicationRecord = record.into(Tables.APPLICATION)
        val value = applicationRecord.status.toString()
        return Application(
            applicationRecord.id,
            applicationRecord.job,
            applicationRecord.coverLetter,
            ApplicationStatus.valueOf(value.uppercase())
        )
    }
}