# Word-of-the-Day-App

# To-Do
* Fix the UI, cause rn it's a disaster
* Fix UX issue where the word information takes a few seconds to show up. Something to distract the user with...

## What is this app?
This app's sole purpose is to randomly generate a new word for you to learn everyday.

## Who is this app for?
This app was not originally intended for anyone's use but my own, but of course you're welcome to use it! I love to learn, and decided to learn a new word everyday. I thought that building an app to determine what word I would learn would be a fun and quick project, so that's what I decided to build. If you're looking to learn a new word everyday then this app is perfect for you!

## Getting the App Started
I'll go over a quick guide on how to get the app running in case you're unfamiliar with the process. I'll also be including all of the download links in case you don't have all of the software you need to get started.

* Firstly, we're going to clone the application to your local machine so you can run it. With [Git](https://git-scm.com/downloads) installed navigate to the directory you'd like to install the app (maybe your desktop?) and type the following into your terminal:
> git clone https://github.com/Agunderman10/Word-of-the-Day.git

* Our clone brought the project onto our local machine, but there are external packages that we still need to install. Navigate into the project directory with the cd (change directory as shown below) command and with [NPM](https://nodejs.org/en/) (npm will come with the installation of nodejs) installed type the following into your terminal:
> cd Word-of-the-Day
>> npm install

* Next, connect your phone with the correct cord (usb to an android in my case). Make sure you have developer options turned on. I'll let you google how to do that on your individual phone. Gotta make you work for something ;)

* Now, the app is ready to run! In the root directory of the app type the following (depending if your phone is on android or ios):
> npx react-native run-android
> npx react-native run-ios

* If you followed all the steps above correctly then the app should be installed on your phone. Go to the next section to sort out the API key issue. The app will not give you a word if you don't get the API Key set up in app.

### Information about the API key
You'll notice that in the App.js for the api key I have listed 'YOUR_API_KEY_HERE'. Obviously, I did not want to include my own personal
api key for everyone to see, so the instructions on how to generate your own are given below.

* Firstly, go to the [Merriam-Webster Dictionary API website](https://dictionaryapi.com)
* Click the register button and go through the sign in process on the site
* Once you've registered the application you can go to the 'YOUR KEYS' tab to find the key. Simply copy and paste the key into the code
where I wrote 'YOUR_API_KEY_HERE' and your application should work correctly.