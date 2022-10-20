## Bookstore Mobile App (Coeus)

Hybrid mobile application built with react native. This application makes use
of [Bookstore RESTFul API](http://github.com/Yagua/Bookstore_API)

### Build

In order to use this application, you must first install
[expo-cli](https://docs.expo.dev/workflow/expo-cli/), clone the project's
repository and resolve the project's dependencies with the following
instructions. (It is assumed that you have already cloned the
[API](http://github.com/Yagua/Bookstore_API) repository of which this project
makes use.)

```bash
$ git clone https://github.com/Yagua/Bookstore_mobile_app
$ cd Bookstore_mobile_app
$ npm install
```

Once you have done the above, if you just want to run the application without
build it, you can run the development server with the following instruction (to
do this you need to have installed the Expo Go application either at
[Android](https://play.google.com/store/apps/details?id=host.exp.exponent&gl=US)
or [IOS](https://apps.apple.com/us/app/expo-go/id982107779)

```bash
$ expo start
```

#### Android

To build the application for android use

```bash
$ expo build:android
```

#### IOS

To build the application for android use

```bash
$ expo build:ios
```

<!-- ### Preview -->

##### TODOS

- Implement Axios interceptors in order to refresh the JWT Tokens if these are
  expired
- Add some preview images of the application in the README file
