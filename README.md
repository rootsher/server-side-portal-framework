# server-side-portal-framework

Simple server-side framework for routing management. Based on SOA and simple permissions handling.

## Installation

```bash
$ git clone git@github.com:rootsher/server-side-portal-framework.git
$ cd server-side-portal-framework/Web
$ npm install # install all dependencies
$ redis-server & # run database server of Redis
$ mongod & # run database server of MongoDB
$ node Application.js 8888
```

## TODOs

 - [x] Use spaces instead tabs
 - [x] Enable `strict mode`
 - [ ] Print warning when number of params is not correct.
 - [ ] Set default path `/`.
 - [ ] Move routing to Router not in Application.
 - [ ] One class in one file, ex. /Adapters/Mongo.js move error to another file
 - [ ] Use layout (definition of all page in one file, not in each of views)
 - [ ] Apply Twittstrap or Bootstrap to better design.
 - [x] Set some constants of user types in `CurrentUser`.
 - [ ] Write a lot of comments.
 - [ ] Use camelCase style on name of files and directories
 - [x] Move application to one folder `app/`.
 - [x] Create directory `test` with specs and write them!
 - [ ] Create UML diagrams for all architecture of application in directory `docs`.

## License

[The MIT License][0]


[0]: https://github.com/rootsher/server-side-portal-framework/blob/master/LICENSE