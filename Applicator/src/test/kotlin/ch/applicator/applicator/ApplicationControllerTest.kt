package ch.applicator.applicator

import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.testcontainers.junit.jupiter.Testcontainers

@SpringBootTest
@Testcontainers
@ActiveProfiles("test-containers-flyway")
@AutoConfigureMockMvc
class ApplicationControllerTest @Autowired constructor(
    val mockMvc: MockMvc
) {

    fun getCreateApplicationJson(): String {
        val mapper: ObjectMapper = ObjectMapper()
        val root = mapper.createObjectNode()
        root.put("job", "22222222-2222-2222-2222-222222222222")
        root.put("cover_letter", "I'm very good!")
        return mapper.writeValueAsString(root)
    }

    @Test
    fun create() {
        mockMvc.perform(
            post("/applications")
                .contentType("application/json")
                .content(getCreateApplicationJson())
        )
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.status").value("DRAFT"))
    }

    fun getUpdateApplicationJson(): String {
        val mapper: ObjectMapper = ObjectMapper()
        val root = mapper.createObjectNode()
        root.put("id", "cccccccc-cccc-cccc-cccc-cccccccccccc")
        root.put("job", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb")
        root.put("cover_letter", "I'm very good!")
        root.put("status", "APPLIED")
        return mapper.writeValueAsString(root)
    }

    @Test
    fun update() {
        mockMvc.perform(
            put("/applications/cccccccc-cccc-cccc-cccc-cccccccccccc")
                .contentType("application/json")
                .content(getUpdateApplicationJson())
        )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("APPLIED"))
    }

    @Test
    fun updateWithBadRequest() {
        mockMvc.perform(
            put("/applications/bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb")
                .contentType("application/json")
                .content(getUpdateApplicationJson())
        )
            .andExpect(status().isBadRequest())
    }

    @Test
    fun getAll() {
        mockMvc.perform(get("/applications"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id").value("cccccccc-cccc-cccc-cccc-cccccccccccc"))
            .andExpect(jsonPath("$[1].id").value("ffffffff-ffff-ffff-ffff-ffffffffffff"))
    }

    @Test
    fun getByJobId() {
        mockMvc.perform(get("/applications?jobId=eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id").value("ffffffff-ffff-ffff-ffff-ffffffffffff"))
    }

    @Test
    fun getOne() {
        mockMvc.perform(get("/applications/cccccccc-cccc-cccc-cccc-cccccccccccc"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value("cccccccc-cccc-cccc-cccc-cccccccccccc"))
    }
}
