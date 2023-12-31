/*
 * This file is generated by jOOQ.
 */
package ch.applicator.jooq;


import ch.applicator.jooq.tables.Application;
import ch.applicator.jooq.tables.Employer;
import ch.applicator.jooq.tables.Job;

import java.util.Arrays;
import java.util.List;

import org.jooq.Catalog;
import org.jooq.Table;
import org.jooq.impl.SchemaImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Public extends SchemaImpl {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>public</code>
     */
    public static final Public PUBLIC = new Public();

    /**
     * The table <code>public.application</code>.
     */
    public final Application APPLICATION = Application.APPLICATION;

    /**
     * The table <code>public.employer</code>.
     */
    public final Employer EMPLOYER = Employer.EMPLOYER;

    /**
     * The table <code>public.job</code>.
     */
    public final Job JOB = Job.JOB;

    /**
     * No further instances allowed
     */
    private Public() {
        super("public", null);
    }


    @Override
    public Catalog getCatalog() {
        return DefaultCatalog.DEFAULT_CATALOG;
    }

    @Override
    public final List<Table<?>> getTables() {
        return Arrays.asList(
            Application.APPLICATION,
            Employer.EMPLOYER,
            Job.JOB
        );
    }
}
