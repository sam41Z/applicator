package ch.applicator.applicator

import ch.applicator.applicator.api.Job
import ch.applicator.jooq.Tables
import org.jooq.Record
import org.jooq.exception.NoDataFoundException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatus.*
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.net.URI
import java.net.URL
import java.util.*


@RestController
@RequestMapping("/jobs")
class JobController @Autowired constructor(
    val jobRepository: JobRepository,
    val employerRepository: EmployerRepository
) {

    @GetMapping("/{id}")
    fun get(@PathVariable id: UUID): Job {
        try {
            return getJobById(id)
        } catch (e: NoDataFoundException) {
            throw ResponseStatusException(NOT_FOUND, "No job with this ID", e)
        }
    }

    @GetMapping()
    fun getAll(): List<Job> {
        return jobRepository.getAllJobs().map { record -> mapJob(record) }
    }


    @PutMapping("/{id}")
    fun update(@PathVariable id: UUID, @RequestBody body: Job): Job {
        if (id != body.id) {
            throw ResponseStatusException(BAD_REQUEST, "ID mismatch")
        }
        val oldJob = getJobById(id)
        if (body.employer.id != oldJob.employer.id) {
            throw ResponseStatusException(BAD_REQUEST, "Can't change employer")
        }
        employerRepository.update(body.employer.id, body.employer.name, body.employer.websiteUrl)
        jobRepository.update(id, body.description, body.position, body.originalUrl)
        return getJobById(id)
    }

    @PostMapping
    @ResponseStatus(CREATED)
    fun create(@RequestBody body: JobIn): ResponseEntity<Job> {
        val employerId = employerRepository.create(body.employer.name, body.employer.websiteUrl)
        val jobId = jobRepository.create(employerId, body.description, body.position, body.originalUrl)

        val job = getJobById(jobId)
        val location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(job.id)
            .toUri()

        return ResponseEntity.created(location).body(job)
    }

    data class JobIn(
        val employer: EmployerIn,
        val description: String,
        val position: String,
        val originalUrl: URL
    ) {
        data class EmployerIn(
            val name: String,
            val websiteUrl: URL
        )
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    fun delete(@PathVariable id: UUID) {
        try {
            jobRepository.delete(id)
        } catch (e: DataIntegrityViolationException) {
            throw ResponseStatusException(
                CONFLICT,
                "Could not delete resource because of data integrity, possibly an associated application",
                e
            )
        }
    }

    private fun getJobById(id: UUID) = jobRepository.getJob(id).map { record -> mapJob(record) }

    private fun mapJob(record: Record): Job {
        val jobRecord = record.into(Tables.JOB)
        val employerRecord = record.into(Tables.EMPLOYER)
        return Job(
            jobRecord.id,
            Job.Employer(employerRecord.id, employerRecord.name, URI(employerRecord.websiteUrl).toURL()),
            jobRecord.description,
            jobRecord.position,
            URI(jobRecord.originalUrl).toURL()
        )
    }
}