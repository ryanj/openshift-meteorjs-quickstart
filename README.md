#Meteor.js on OpenShift
Deploy meteor.js application bundles on OpenShift

## Basic Setup
You'll need an OpenShift Online account, and the `rhc` and `meteor` command-line tools in order to proceed.  
If you already have these pre-requisites, skip ahead to the section on "Creating your application".

### OpenShift Online
In this quickstart guide, we'll be using OpenShift Online to host our application.

Sign up for an account at http://openshift.redhat.com/app/account/new

If you don't already have the `rhc` (Red Hat Cloud) command-line tools, install them:

    sudo gem install rhc

You'll need to run `rhc setup` to link your OpenShift Online account with your local development environment, and to select an application namespace:

    rhc setup

If you need any additional setup assistance, these links may come in handy:

 * https://openshift.redhat.com/community/get-started#cli
 * https://openshift.redhat.com/community/developers/rhc-client-tools-install

### Install meteor.js

    curl https://install.meteor.com | sh

## Create your application
### Setup your OpenShift gear
Spin up a new OpenShift gear with Node.js, MongoDB, and some basic starter-code:

    rhc app create meteor nodejs mongodb-2.2 --from-code=https://github.com/ryanj/openshift-meteorjs-quickstart.git

The above command will output a local copy of your OpenShift application source in a folder matching your application name (meteor).  Be sure to run this command from within a folder where you would like to store your application source.

### Create a Meteor.js example project
To see a list of all available meteor.js example projects, type `meteor create --list`.

In this guide, we'll try the meteor.js leaderboard example:

    meteor create --example leaderboard

See [http://meteor.com/examples/](http://meteor.com/examples/) for additional help getting started with meteor.js.

### Bundle and merge your meteor.js code
Bundle up your meteor.js source:

    cd leaderboard
    meteor bundle bundle.tar.gz

And add the result to your OpenShift application source:

    tar -xvkf bundle.tar.gz --transform 's|^bundle/||' --directory ../meteor/
    cd ../meteor

The above example assumes that you named your OpenShift application "meteor", as shown in the `rhc app create` step.

Add your meteor application bundle and update your OpenShift gear:

    git add .
    git commit -am "Adding a meteor.js application bundle"

### Deploy to OpenShift
Then, push your changes to OpenShift to deploy your new meteor.js application

    git push

That's it! Check out your new Meteor.js application at:

    http://meteor-$yournamespace.rhcloud.com
