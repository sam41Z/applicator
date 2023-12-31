/*
 * This file is generated by jOOQ.
 */
package ch.applicator.jooq.tables;


import ch.applicator.jooq.Keys;
import ch.applicator.jooq.Public;
import ch.applicator.jooq.tables.records.EmployerRecord;

import java.util.UUID;
import java.util.function.Function;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Function3;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Records;
import org.jooq.Row3;
import org.jooq.Schema;
import org.jooq.SelectField;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.TableOptions;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.SQLDataType;
import org.jooq.impl.TableImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Employer extends TableImpl<EmployerRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>public.employer</code>
     */
    public static final Employer EMPLOYER = new Employer();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<EmployerRecord> getRecordType() {
        return EmployerRecord.class;
    }

    /**
     * The column <code>public.employer.id</code>.
     */
    public final TableField<EmployerRecord, UUID> ID = createField(DSL.name("id"), SQLDataType.UUID.nullable(false), this, "");

    /**
     * The column <code>public.employer.name</code>.
     */
    public final TableField<EmployerRecord, String> NAME = createField(DSL.name("name"), SQLDataType.CLOB.nullable(false), this, "");

    /**
     * The column <code>public.employer.website_url</code>.
     */
    public final TableField<EmployerRecord, String> WEBSITE_URL = createField(DSL.name("website_url"), SQLDataType.CLOB, this, "");

    private Employer(Name alias, Table<EmployerRecord> aliased) {
        this(alias, aliased, null);
    }

    private Employer(Name alias, Table<EmployerRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>public.employer</code> table reference
     */
    public Employer(String alias) {
        this(DSL.name(alias), EMPLOYER);
    }

    /**
     * Create an aliased <code>public.employer</code> table reference
     */
    public Employer(Name alias) {
        this(alias, EMPLOYER);
    }

    /**
     * Create a <code>public.employer</code> table reference
     */
    public Employer() {
        this(DSL.name("employer"), null);
    }

    public <O extends Record> Employer(Table<O> child, ForeignKey<O, EmployerRecord> key) {
        super(child, key, EMPLOYER);
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : Public.PUBLIC;
    }

    @Override
    public UniqueKey<EmployerRecord> getPrimaryKey() {
        return Keys.EMPLOYER_PKEY;
    }

    @Override
    public Employer as(String alias) {
        return new Employer(DSL.name(alias), this);
    }

    @Override
    public Employer as(Name alias) {
        return new Employer(alias, this);
    }

    @Override
    public Employer as(Table<?> alias) {
        return new Employer(alias.getQualifiedName(), this);
    }

    /**
     * Rename this table
     */
    @Override
    public Employer rename(String name) {
        return new Employer(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public Employer rename(Name name) {
        return new Employer(name, null);
    }

    /**
     * Rename this table
     */
    @Override
    public Employer rename(Table<?> name) {
        return new Employer(name.getQualifiedName(), null);
    }

    // -------------------------------------------------------------------------
    // Row3 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row3<UUID, String, String> fieldsRow() {
        return (Row3) super.fieldsRow();
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Function)}.
     */
    public <U> SelectField<U> mapping(Function3<? super UUID, ? super String, ? super String, ? extends U> from) {
        return convertFrom(Records.mapping(from));
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Class,
     * Function)}.
     */
    public <U> SelectField<U> mapping(Class<U> toType, Function3<? super UUID, ? super String, ? super String, ? extends U> from) {
        return convertFrom(toType, Records.mapping(from));
    }
}
