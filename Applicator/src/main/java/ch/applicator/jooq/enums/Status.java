/*
 * This file is generated by jOOQ.
 */
package ch.applicator.jooq.enums;


import ch.applicator.jooq.Public;

import org.jooq.Catalog;
import org.jooq.EnumType;
import org.jooq.Schema;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public enum Status implements EnumType {

    draft("draft"),

    applied("applied"),

    interviewing("interviewing"),

    offered("offered"),

    rejected("rejected"),

    declined("declined"),

    accepted("accepted");

    private final String literal;

    private Status(String literal) {
        this.literal = literal;
    }

    @Override
    public Catalog getCatalog() {
        return getSchema().getCatalog();
    }

    @Override
    public Schema getSchema() {
        return Public.PUBLIC;
    }

    @Override
    public String getName() {
        return "status";
    }

    @Override
    public String getLiteral() {
        return literal;
    }

    /**
     * Lookup a value of this EnumType by its literal
     */
    public static Status lookupLiteral(String literal) {
        return EnumType.lookupLiteral(Status.class, literal);
    }
}
