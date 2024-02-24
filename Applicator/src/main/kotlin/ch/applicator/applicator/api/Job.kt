package ch.applicator.applicator.api

import java.net.URL
import java.util.*

data class Job(
    val id: UUID,
    val employer: Employer,
    val description: String,
    val position: String,
    val originalUrl: URL
) {
    data class Employer(
        val id: UUID,
        val name: String,
        val websiteUrl: URL
    )
}