/*
 * This file is generated by jOOQ.
 */
package ch.applicator.jooq.tables;


import ch.applicator.jooq.Keys;
import ch.applicator.jooq.Public;
import ch.applicator.jooq.enums.Status;
import ch.applicator.jooq.tables.records.ApplicationRecord;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.function.Function;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Function4;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Records;
import org.jooq.Row4;
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
public class Application extends TableImpl<ApplicationRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>public.application</code>
     */
    public static final Application APPLICATION = new Application();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<ApplicationRecord> getRecordType() {
        return ApplicationRecord.class;
    }

    /**
     * The column <code>public.application.id</code>.
     */
    public final TableField<ApplicationRecord, UUID> ID = createField(DSL.name("id"), SQLDataType.UUID.nullable(false), this, "");

    /**
     * The column <code>public.application.job</code>.
     */
    public final TableField<ApplicationRecord, UUID> JOB = createField(DSL.name("job"), SQLDataType.UUID, this, "");

    /**
     * The column <code>public.application.cover_letter</code>.
     */
    public final TableField<ApplicationRecord, String> COVER_LETTER = createField(DSL.name("cover_letter"), SQLDataType.CLOB, this, "");

    /**
     * The column <code>public.application.status</code>.
     */
    public final TableField<ApplicationRecord, Status> STATUS = createField(DSL.name("status"), SQLDataType.VARCHAR.defaultValue(DSL.field(DSL.raw("'draft'::status"), SQLDataType.VARCHAR)).asEnumDataType(ch.applicator.jooq.enums.Status.class), this, "");

    private Application(Name alias, Table<ApplicationRecord> aliased) {
        this(alias, aliased, null);
    }

    private Application(Name alias, Table<ApplicationRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>public.application</code> table reference
     */
    public Application(String alias) {
        this(DSL.name(alias), APPLICATION);
    }

    /**
     * Create an aliased <code>public.application</code> table reference
     */
    public Application(Name alias) {
        this(alias, APPLICATION);
    }

    /**
     * Create a <code>public.application</code> table reference
     */
    public Application() {
        this(DSL.name("application"), null);
    }

    public <O extends Record> Application(Table<O> child, ForeignKey<O, ApplicationRecord> key) {
        super(child, key, APPLICATION);
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : Public.PUBLIC;
    }

    @Override
    public UniqueKey<ApplicationRecord> getPrimaryKey() {
        return Keys.APPLICATION_PKEY;
    }

    @Override
    public List<UniqueKey<ApplicationRecord>> getUniqueKeys() {
        return Arrays.asList(Keys.APPLICATION_JOB_KEY);
    }

    @Override
    public List<ForeignKey<ApplicationRecord, ?>> getReferences() {
        return Arrays.asList(Keys.APPLICATION__APPLICATION_JOB_FKEY);
    }

    private transient Job _job;

    /**
     * Get the implicit join path to the <code>public.job</code> table.
     */
    public Job job() {
        if (_job == null)
            _job = new Job(this, Keys.APPLICATION__APPLICATION_JOB_FKEY);

        return _job;
    }

    @Override
    public Application as(String alias) {
        return new Application(DSL.name(alias), this);
    }

    @Override
    public Application as(Name alias) {
        return new Application(alias, this);
    }

    @Override
    public Application as(Table<?> alias) {
        return new Application(alias.getQualifiedName(), this);
    }

    /**
     * Rename this table
     */
    @Override
    public Application rename(String name) {
        return new Application(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public Application rename(Name name) {
        return new Application(name, null);
    }

    /**
     * Rename this table
     */
    @Override
    public Application rename(Table<?> name) {
        return new Application(name.getQualifiedName(), null);
    }

    // -------------------------------------------------------------------------
    // Row4 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row4<UUID, UUID, String, Status> fieldsRow() {
        return (Row4) super.fieldsRow();
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Function)}.
     */
    public <U> SelectField<U> mapping(Function4<? super UUID, ? super UUID, ? super String, ? super Status, ? extends U> from) {
        return convertFrom(Records.mapping(from));
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Class,
     * Function)}.
     */
    public <U> SelectField<U> mapping(Class<U> toType, Function4<? super UUID, ? super UUID, ? super String, ? super Status, ? extends U> from) {
        return convertFrom(toType, Records.mapping(from));
    }
}