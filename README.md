# The Toleio Testing App

This project is a regular React app that makes testing and tweaking easier than working with packed Chrome Extension.
Example Norwegian text has been provided to make it easier to click on translatable words. In the final version the extension will be working on every website at large (which will also need separate testing and bugfixing).

For now please use the example text to test window popup, searches and the looks that we can tweak.

## How to install

1. Install **Node.JS** on your computer. Instructions here: https://nodejs.dev/learn/how-to-install-nodejs
2. Install **yarn** by running `npm install -g yarn` in the command line
3. Install **Git** on your computer. Instructions here: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
4. Clone the Toleio extension repository on your computer by running the following command:
   `git clone --branch develop https://github.com/EndreElv/toleio-chrome-extension.git`
5. Enter the toleio-chrome-extension folder and type `yarn` to install dependent packages
6. Finally, type `yarn start` to start the app. Chrome browser will open and a single test text page will come up with the Toleio Chrome Extension installed and ready for testing.
7. Click any highlighted word to start translation.
