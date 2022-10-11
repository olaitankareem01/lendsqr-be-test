import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
     return knex.schema.createTable('user', function (table) {
        table.increments('id').primary()
        table.string('firstName').notNullable()
        table.string('lastName').notNullable()
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.boolean('IsDeleted').defaultTo(false);
        table.timestamps(true)
    })
    .createTable('wallet', function (table) {
        table.uuid('WalletId').notNullable().primary();
        table.decimal('balance');
        table.boolean('isDeleted').defaultTo(false);
        table.integer('userId').notNullable().unsigned().unique().references('id').inTable('user');
        table.timestamps(true)
    })
    .createTable('transaction', function (table) {
        table.string('transactionRef').notNullable().unique().primary();
        table.integer('userId').notNullable().unsigned().references('id').inTable('user');
        table.string('paymentRef').notNullable().unique();
        table.string('summary',300).notNullable();
        table.string('description').nullable()
        table.boolean('isDeleted').defaultTo(false);
        table.timestamps(true)
    })
    
    
   
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user')
                     .dropTable('wallet')
                     .dropTable('transaction');
}

