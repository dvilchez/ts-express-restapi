# Description
This project tries to give en reference implementation to create a API RESTish using NODEJS, EXPRESS and TYPESCRIPT.

# Principles, patterns used in this implementation

* The model is inspired in the set of tactic patterns exposes in Domain Driven Design. You can find, entities, aggregates, value objects and repositories.

* Separation of layers. The application is distributed in three layers, application, domain and infrastructure. The communication between layers only travel in this direction Infrastructure -> Application -> Domain.

* Separation of concerns

* SOLID

* Simple design

# Test strategy

* Domain - Unit tests

* Application - Interaction tests

* E2E - Postman collection

# TODO

- [ ] Move validations to invariants inside entities
- [ ] Replace Teacher inside Course by a VO
- [ ] Review the concept of registration and course
- [ ] Add OpenAPI doc
- [ ] Generalize exceptions
- [ ] Refactor express adapters

# Run app
`````
npm install
npm start
`````
You can import the postman collection to see the exposed routes but just in case these are the current endpoints serving from localhost without change the default port.

* Make a new registration: curl -X POST -H "Content-Type: application/json" -d '{"teacher": "teacher4@email.com","course": "My Course"}' http://localhost:8080/registrations

* Vote for a teacher: curl -X POST -H "Content-Type: application/json" -d '{"teacher": "teacher4@email.com","voter": "voter6@email.com"}' http://localhost:8080/votes

* Vote for a course: curl -X POST -H "Content-Type: application/json" -d '{"voter": "voter4@email.com","course": "My Course"}' http://localhost:8080/votes

* Get list of registrations: curl -H "Content-Type: application/json" http://localhost:8080/registrations

# Run tests

````
npm install
npm test
```` 