## NodeJS Database Repository using Knex 

Looking to increase your productivity on your next data driven NodeJS service? 
Coming from the .NET C# ecosystem, I have come to appreciate the benefits of object
relational mappers(ORM) for database table changes using Entity Framework.  
(insert, update, delete, etc.) While making a generic document storage 
micro-service, I decided to test drive Knex.js, a pretty popular ORM for for the
NodeJS community. I wanted to share some of benefits of Knex for our readers.

### Benefits of Knex Object Relational Mapper(ORM)
- I appreciate the terse syntax for your CRUD operations.
- The tool helped me feel super productive for database operations
- For type-enabled languages, the interfaces and class definitions can help you avoid run-time errors.
- The ORM supports all your favorite relational databases. (Postgres, MariaDb,  MsSQL, etc. )
- Nice documentation and community
- The system provides a simple migration system.  

To provide a tour of Knex, let's jog through the implementation of our simple
document storage service. We'll focus on the repository for Sqlite.  In the 
code below, we'll describe our document repository.

Please refer to the following helpful blog posts and links for reference.
- <a href="https://blog.shahednasser.com/knex-js-tutorial-for-beginners/#set-up-project" target="_blank">KnexJS for Beginners from shahednasser.com</a>
- <a href="https://devhints.io/knex">devhints.io/knex</a>
- <a href="knexjs.org">knexjs.org</a>

In the service, we created a repository interface for changing documents
in the database.  (add, delete, get, list)  Under the infrastructure,
we created a concrete class implementing the repository.

#### /core/interfaces/doc-repository.ts
``` javascript 
export interface IDocRepository
{
    add(command: AddDocumentCommand) : Promise<AddDocumentResponse>;
    delete(command: DeleteDocumentCommand) : Promise<AppResponse>;
    get(command: GetDocumentQuery) : Promise<GetDocumentResponse>;
    getDocuments(command: GetDocumentsQuery) : Promise<GetDocumentsResponse>;
}
```

The setup process for knex leads you through the process of creating database connections and describing the database type.

#### db/knexfile.js
``` javascript

const path = require('path');
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'db.sqlite3')
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  }

};
```

#### Sample migration 

Knex enables you to describe database table structure, data types using JavaScript.  I can see why content management systems like STRAPI use Knex.  The migration system helps developers to translate meta-data into SQL create statements or table update statements.

``` javascript 
exports.up = function(knex) {
    return knex.schema
      .createTable('docs', function (table) {
 
        table.string('collection').notNullable();
        table.string('data').notNullable();
        table.string('id').notNullable().primary();
        table.string('name').notNullable();
        table.string('tags');
        table.integer('createdAt');
        table.string('createdBy').notNullable();
        table.integer('updatedAt');
        table.string('updatedBy');
 
      });
  };

  exports.down = function(knex) {
    return knex.schema
      .dropTable('docs');
  };
```

#### Add operation
``` javascript
let insertResponse = await knex('docs').insert(doc)
```

#### Delete operation
``` javascript
let deleteResponse = await knex('docs')
.where({"id": command.recordId})
.del();

```

#### Get record 
``` javascript 
let selectResponse = await knex('docs')
.select()
.where({"id": command.recordId})
```

#### Get records ....

``` javascript
let selectResponse = await knex('docs')
.select().where({"collection": command.collection})
```

You can inspect the completed document service repository at the following github repo: 

- <a href="http://github.com/michaelprosario/proto-server">github.com/michaelprosario/proto-server</a>
- src/infra/documents-sqlite-repository.ts

We love to hear from our readers! Do you have a favorite NodeJs productivity tool?
