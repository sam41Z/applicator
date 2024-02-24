package ch.applicator.applicator

import com.fasterxml.jackson.databind.ObjectMapper
import com.jayway.jsonpath.JsonPath
import com.jayway.jsonpath.JsonPath.*
import org.hamcrest.core.StringEndsWith
import org.hamcrest.core.StringEndsWith.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.testcontainers.junit.jupiter.Testcontainers
import java.net.URI

@SpringBootTest
@Testcontainers
@ActiveProfiles("test-containers-flyway")
@AutoConfigureMockMvc
class JobControllerTest @Autowired constructor(
    val mockMvc: MockMvc
) {

    fun getCreateJobJson(): String {
        val mapper: ObjectMapper = ObjectMapper()
        val root = mapper.createObjectNode()
        val employer = mapper.createObjectNode()
        employer.put("name", "Test Inc.")
        employer.put("website_url", "https://testinc.org")
        root.putIfAbsent("employer", employer)
        root.put("description", "Test some stuff.")
        root.put("position", "Head of stuff")
        root.put("original_url", "https://testinc.org/job-for-stuff")
        return mapper.writeValueAsString(root)
    }

    fun getUpdateJobJson(jobId: String, position: String, employerId: String, employerName: String): String {
        val mapper: ObjectMapper = ObjectMapper()
        val root = mapper.createObjectNode()
        val employer = mapper.createObjectNode()
        employer.put("id", employerId)
        employer.put("name", employerName)
        employer.put("website_url", "https://testinc.org")
        root.putIfAbsent("employer", employer)
        root.put("id", jobId)
        root.put("description", "Test some stuff.")
        root.put("position", position)
        root.put("original_url", "https://testinc.org/job-for-stuff")
        return mapper.writeValueAsString(root)
    }

    @Test
    fun create() {
        val mvcResult = mockMvc.perform(
            post("/jobs")
                .contentType("application/json")
                .content(getCreateJobJson())
        )
            .andExpect(status().isCreated())
            .andExpect { res ->
                header().string(
                    "Location",
                    endsWith("/jobs/" + read(res.response.contentAsString, "$.id"))
                ).match(res)
            }
            .andReturn()
        val id = read<Any?>(mvcResult.response.contentAsString, "$.id").toString()
        val location = mvcResult.response.getHeader("Location")
        mockMvc.perform(get(URI(location!!)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(id))

    }

    @Test
    fun update() {
        mockMvc.perform(
            put("/jobs/bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb")
                .contentType("application/json")
                .content(
                    getUpdateJobJson(
                        "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
                        "Head of Stuff ++",
                        "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                        "Employer 1 ++"
                    )
                )
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.position").value("Head of Stuff ++"))
            .andExpect(jsonPath("$.employer.name").value("Employer 1 ++"))
    }

    @Test
    fun updateIdMismatch() {
        mockMvc.perform(
            put("/jobs/bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb")
                .contentType("application/json")
                .content(
                    getUpdateJobJson(
                        "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                        "Head of Stuff ++",
                        "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                        "Employer 1 ++"
                    )
                )
        )
            .andExpect(status().isBadRequest())
    }

    @Test
    fun updateEmployerIdChange() {
        mockMvc.perform(
            put("/jobs/bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb")
                .contentType("application/json")
                .content(
                    getUpdateJobJson(
                        "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
                        "Head of Stuff ++",
                        "dddddddd-dddd-dddd-dddd-dddddddddddd",
                        "Employer 1 ++"
                    )
                )
        )
            .andExpect(status().isBadRequest())
    }

    @Test
    fun getAll() {
        mockMvc.perform(get("/jobs"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].employer.name").value("Employer 1"))
            .andExpect(jsonPath("$[1].employer.name").value("Employer 2"))
    }

    @Test
    fun getOne() {
        mockMvc.perform(get("/jobs/bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.employer.name").value("Employer 1"))
    }
}
