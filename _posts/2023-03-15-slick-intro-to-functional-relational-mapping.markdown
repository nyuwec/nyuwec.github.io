---
title: A Slick intro to functional mapping of relational databases
date: 2023-03-15 21:21:00
tags: [featured, tech]
---

When I planned backend applications and I highlighted the key elements of them I used words like flexibility, speed, scalability and platform-independence. But the last one of these was always a lie in many ways.

Now I would like to focus on the database part and especially the relational database systems. QUESTION: If you have ever released an application, how many times have you swapped the underlying database software to a different one?

There are many relational database management systems (RDBMS) out there: Oracle, MySQL, Microsoft SQL, PostgreSQL, SQLite, etc… They are different in many ways, but not on these criteria: well structured datastores with fast data access via the structured query language (SQL). We can argue about which software could be the best fit for your application, but those debates are mostly about licenses or resource requirements and less likely about “can I model the data structure in it” or “can I query the data with the SQL dialect it supports” because the answer in almost all cases is yes.

Let’s check the data structure you can define in an RDBMS. It is relational! It means you can extract (normalize) some parts of the data you want to store into different tables. Tables are defining the categories of the data you want to store. The relation between these tables gives the real power of the RDBMS. You can define one-to-one, one-to-many and many-to-many relations. (example: A person’s occupation level could be “elementary”, “high” or “university”, so we have two tables “occupation” and “person”, so the relation between them is one-to-many, as one occupation record (“university”) could be connected to many person records.) This is the concept, but how the various RDBMSes implement it are quite different. That is why some of them are ideal for mobile apps (SQLite), while others are good for high-reliability bank systems.

The other main feature of the RDBMS is SQL. It is a high-level language responsible for defining the data structures, then inserting, updating, deleting and querying data from it. SQL has many complex functions and capabilities which makes it a versatile and powerful tool for many use-cases. But there are many dialects of it, some are vendor specific ones and some are just generic extensions of an older standard. It was introduced in 1974, it has at least 10 standard versions based on [Wikipedia](https://en.wikipedia.org/wiki/SQL). The result of this long lifespan and the many influences from various vendors is that you can easily find yourself in a situation that some of the SQL commands you wrote for MySQL won’t work in PostgreSQL.

As you can see the main concept behind all RDBMS is the same: a relational database queried by a kinda standardized language. SQL is the high-level interface between the RDBMS and the application you are developing.

## What about the data you ask via SQL and your RDBMS gives back?

This is the tricky part. In general, the result of a query would always be a list of records. The way you will parse it is your decision, ideally. In most of the cases let’s say that decision was made by others who created some “relational to something else” mapping library you chose to use in your application.

For some reason, which is out of the scope of this article, the creators of those libraries adapt the object-relational-mapping idea ([ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping)). You might have heard some of them: [Hybernate](https://en.wikipedia.org/wiki/Hibernate_%28framework%29), [Doctrine](https://en.wikipedia.org/wiki/Doctrine_(PHP)) and of course [Django](https://en.wikipedia.org/wiki/Django_(web_framework)) itself has its own, non-replaceable implementation. ORM tries to help translating the relational data structures to objects. In many programming languages you can deal with objects much easier than a list of records. For example the above example could fit into an ORM model well. I can easily define a Person and an Occupation class and when I get back a list of person-occupation records from the DB the ORM can parse them to a list of these objects. As a convenience, I can get the occupation table fields from the person object’s occupation property as an Occupation type object. Sounds easy, doesn’t it?

## What is wrong with this approach?

Object oriented and relational models differ in the following concepts. ([from Stefan Ziegler - Typesafe](https://scala-slick.org/talks/2014-06-09_33rd_Degree/Functional%20Relational%20Mapping%20with%20Slick.pdf))

| Object Oriented | Relational              |
|-----------------|-------------------------|
| Identity        | **NO** Identity         |
| State           | **TRANSACTIONAL** State |
| Behavior        | **NO** Behavior         |
| Encapsulation   | **NO** Encapsulation    |

Also ORMs are trying to hide the underlying RDBMS in many ways.

### Hiding the real relations between tables

The well defined data structures are transformed into objects using object oriented programming constraints. For example, you can map the one-to-one and one-to-many relations quite easily, but it is cumbersome to express the many-to-many though.

### SQL becomes a low-level/hidden interface

As I stated earlier, SQL is a high-level query language, capable of doing many complex transformations on the data. Degrading it to a low-level interface and sealing it in a proprietary query language defined by the ORM could create many headaches or false assumptions about the performance or versatility of the underlying RDBMS.
When a service grows in the amount of stored data and its complexity, you might find that the DB becomes the bottleneck. To overcome this issue you have to understand what query the ORM creates, so at the end you have to see and optimize these queries too.

### ORM mixes your business logic with DB operations

As the SQL is hidden and the DB structure is more-or-less described in an object-model the business logic can be written in the ORM layer of your application and if you are not careful the separation of concerns could be mixed easily.

## How to do this a bit better?

Let’s check what you really need from the DB and if that could come right out of it.

### RDBMS should be a first class citizen in your application

First of all if you treat your RDBMS as a first class citizen and you don’t want to hide it, but use its SQL dialect as an API to access the data stored in it, you’ve just simplified your application with at least one layer.

This way you can focus on how to leverage its benefits, like using native JSON fields, full-text search or audit logs via triggers in MySQL.

### Use a more lightweight layer to transform your data.

What you really need is a simple, descriptive and transparent representation of the data in your programming language.

#### Types

If you look at all the RDBMSes they all define strict types for every column, hence we can say they are kinda typesafe. It is not complicated to define the map from these types to the ones your programming language provides.

#### Relations

This is tricky, as with OOP languages it is harder to work with complex structures, lists or streams  seamlessly. Relations are handled in the RDBMS, so what you have to deal with is how you can get the  data in the result. The trick is that you’ll get a flat list of records with fields you asked in the query, so what you really need to do is map the fields into structures you define in your application. In functional programming you can leverage on the map and flatmap and other functions to extract the fields you need quite easily. At the end, you will have your data in pure data objects and you can run functions on them for further transformation in contrast to the OOP way where your objects should contain the methods and the data too.

#### Queries

Use SQL to ask for data, then transform the DB types to your programming language ones and transform this native data structure to your data objects. Sounds functional, doesn’t it?

### Functional-relational mapping

Yes we are here finally, the gist of this article. But wait there is no such thing as functional-relational mapping, at least Wikipedia does not have an article about it. But what I wrote about the more lightweight layer basically describes the concept.

For me this is more like an approach to how you would like to interact with your database. And yes, this could only work with functional languages as I described earlier.

Let’s check some libraries, first let me quote [Anorm](https://playframework.github.io/anorm/): “Anorm […] uses plain SQL to interact with the database and provides an API to parse and transform the resulting datasets.” Anorm is somewhat a bare-bone FRM tool, despite it does not use that term. Anorm does not define any SQL like query language on top of the chosen RDBMS’s SQL, but helps you to work with the data you got from the DB.

Here is an example:

```
import anorm.{Macro, RowParser, SqlStringInterpolation}
import java.sql.Connection

class DatabaseDefinitions(implicit connection: Connection) {
  // pure typesafe data classes aka structures
  case class Occupation(id: Long, name: String)

  case class Person(id: Long, name: String, age: Int, occupation: Occupation)

  // nested parser
  implicit val occupationParser: RowParser[Occupation] = Macro.parser[Occupation]("occupation_id", "occupation_name")
  val personOccupation: RowParser[Person] = Macro.namedParser[Person]

  def getBela: Person =
    SQL"""SELECT
            p.name, p.age,
            o.id as occupation_id, o.name as occupation_name
          FROM person p JOIN occupation o ON p.occupation_id=o.id WHERE f.name=${"Bela"}
          """.as(personOccupation.single)
}
```

#### If this is “a norm” then how more “slick” it could be?

[Slick](https://scala-slick.org/) defines itself as a function-relational mapping library with all the bells and whistles. Sometimes too much of them.

On top of Anorm slick has its own DSL written in Scala, so you can write your “database queries in Scala instead of SQL, thus profiting from the static checking, compile-time safety and compositionality of Scala. Slick features an extensible query compiler which can generate code for different backends.”

Is it bad then, as it hides SQL and most of the RDBMS?

Let me be more clear: it can hide them, but it also gives you the tools to use it similarly to Anorm, giving you all the benefits of Scala if you need to sit closer to the engine. Let’s see the above example written in Slick:

```
import slick.basic.DatabaseConfig
import slick.jdbc.JdbcProfile
import slick.lifted.{ForeignKeyQuery, ProvenShape}
import scala.concurrent.{ExecutionContext, Future}

trait DatabaseDefinitions {
  val profile: slick.jdbc.JdbcProfile

  import profile.api._

  // pure typesafe data classes aka structures
  case class Occupation(id: Long, name: String)
  case class Person(id: Long, name: String, age: Int, occupationId: Long)

  class OccupationTable(tag: Tag) extends Table[Occupation](tag, "occupation") {
    def id: Rep[Long] = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def name: Rep[String] = column[String]("name")

    override def * : ProvenShape[Occupation] = (id, name).mapTo[Occupation]
  }

  lazy val occupations = new TableQuery(tag => new OccupationTable(tag))

  class PersonTable(tag: Tag) extends Table[Person](tag, "person") {
    def id: Rep[Long] = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def name: Rep[String] = column[String]("name")
    def age: Rep[Int] = column[Int]("age")
    def occupationId: Rep[Long] = column[Long]("occupation_id")
    def occupationFk: ForeignKeyQuery[OccupationTable, Occupation] =
      foreignKey("fk_person_occupation", occupationId, occupations)(_.id, onUpdate = ForeignKeyAction.Restrict, onDelete = ForeignKeyAction.Cascade)

    override def * : ProvenShape[Person] = (id, name, age, occupationId).mapTo[Person]
  }

  lazy val persons = new TableQuery(tag => new PersonTable(tag))
}

class ExampleDAO(implicit executionContext: ExecutionContext, databaseConfig: DatabaseConfig[JdbcProfile]) extends DatabaseDefinitions {
  override val profile = databaseConfig.profile
  import profile.api._

  def getBela: Future[(Person, Occupation)] = databaseConfig.db.run(
    persons
      .filter(_.name === "Bela")
      .join(occupations)
      .on(_.occupationId === _.id)
      .result
      .head
  )
}
```

As you can see Slick requires more boilerplate and as a result it does return a tuple of objects instead of the nice nested ones Anorm gives out of the box.

But from the point on if you define the database table, its case class representation and their transformation rule (the `def *` ) you can use typesafe function calls on any `TableQuery` objects.

## Take aways

- Functional-relation mapping is a thing, despite it is not a definition in Wikipedia
- Treat your database software as a first class citizen
- SQL is a powerful and elegant language, don’t try to hide it too much
- Scala and functional programming could help a lot in data transformation
