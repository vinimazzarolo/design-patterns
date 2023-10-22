# Design Patterns
This repository contains simple and practical examples that we can apply in our daily work.

Some of patterns implemented:
- **Data Transfer Object (DTO)**: Transition data between layers.
- **Repository**: Isolates the data layer from the rest of the app. It provides an abstraction of data.Adding, removing, updating, and selecting items from this collection is done through a series of straightforward methods, without the need to deal with database concerns like connections, commands, cursors, or readers.
- **Adapter**: Allows objects with incompatible interfaces to collaborate.
- **Entities**: An entity has semantic significance and is usually tied to a concept linked to business logic.
- **Strategory**: Strategy is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable
- **Factory**: Suggests that you replace direct object construction calls (using the new operator) with calls to a special factory method.
- **Presenter**: Used to hide implementation details from views.
- **Decorator**: Lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.
- **Mediator**: Restricts direct communications between the objects and forces them to collaborate only via a mediator object.
- **Controller**: Handles all requests for a website. It could have a controller to handle requests from HTTP, GRPC, queues.
- **Composition Root**: The application entrypoint.

Additionally, this repository contains a well-organized folder structure commonly seen in projects that adhere to TDD, DDD, and Clean Architecture principles.

Thanks to [Rodrigo Branas](https://branas.io/) and [Full Cycle](https://fullcycle.com.br/) for the class.