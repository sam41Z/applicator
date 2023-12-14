package ch.applicator.applicator.api

import java.util.*

data class Application(
    val id: UUID,
    val job: UUID,
    val coverLetter: String,
    val status: ApplicationStatus
)