# server-side-portal-framework

Simple server-side framework for routing management. Based on SOA and simple permissions handling.

## Installation

```bash
$ git clone git@github.com:rootsher/server-side-portal-framework.git
$ cd server-side-portal-framework
$ npm install # install all dependencies
$ redis-server & # run database server of Redis
$ mongod & # run database server of MongoDB
$ cd app/Web
$ node Application.js 8888
```

## TODOs

 - [x] Use spaces instead tabs
 - [x] Enable `strict mode`
 - [x] Print warning when number of params is not correct.
 - [x] Set default path `/`.
 - [x] Move routing to Router not in Application.
 - [x] One class in one file, ex. /Adapters/Mongo.js move error to another file
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