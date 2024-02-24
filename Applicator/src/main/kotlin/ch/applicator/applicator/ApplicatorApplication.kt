package ch.applicator.applicator

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.transaction.annotation.EnableTransactionManagement

@SpringBootApplication
@EnableTransactionManagement
class ApplicatorApplication

fun main(args: Array<String>) {
    runApplication<ApplicatorApplication>(*args)
}
