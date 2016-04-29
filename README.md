# Mafia

Mafia is built on an Ionic foundation. The structure of the project was generated by Ionic's build functions. We populated the necessary files with the functionality that was desired for the app. Within the mafiaApp/www directory exists files that are responsible for the execution of the app. Within his directory, lib contains all Ionic-generated code that acts as the default for the project. The img folder contains images used within the app. Our written code for this project is found within the templates and js directories. 

The files that we built followed the MVC design architecture. The Model may be found in js/services.js. The Controllers may be found in js/controllers.js. The Views are all found within the templates directory, one per page in the app. 

# Installation and Execution

In order to run our app, the Ionic framework and its dependencies must be installed. To do so, make sure you first have Node.js installed on your machine and then run the following lines from your command line:

$ sudo npm install -g cordova
$ sudo npm install -g ionic

Now you should have Ionic and its dependencies installed on your machine. In order to run the app, run the following line from within the mafiaApp directory found in this folder:

$ ionic serve -l

This will emulate the app within your internet browser. You will see two versions of the app, one for iOS and one for Android. Both work in the same way. Refreshing the page acts in the same way as closing out of the app on your mobile device. Enjoy playing Mafia!

# Testing
