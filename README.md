# dandy_app

# Dandy is an Autonomous Weed Eliminating Robot

Here we have Crossplatform Apps for mobile devices like Android and iOS built with React-Native. And Web Application build with ReactJs.

There Are two directories currently available.

# dandy-web is the web application directory

and

# dandyapp is the mobile application directory

Both Project needs different methods to run. Here is step by step procedures mentioned to run both of the projects.

# Mobile App

First you need to navigate to the dandyapp directory. You can do it by `cd dandyapp` on your terminal or by opening the directory directly from your text editor.

If your environment is not configured please follow the Setup environment section below. 

1. Open your terminal on the project directory "dandyapp"
2. run the command `npm install`
3. After succesfully finising installing npm run this command for run the project on Android `npx react-native run-android` or `npx react-native run-ios` for iOS
4. You need to start the metro server first before running the app. To run the metro run this command `npx react-native start` .
5. If you dont have any emulator or mobile device connected please make sure to have either of these befor running the project

# Web App

First You need to Navigate to the project directory by `cd dandy-web` on your terminal from the root directory the follow the steps mentioned below.

1. Open your terminal on the project directory
2. run the command `npm install`
3. After succesfully finising installing npm run this command for run the project `npm start`


## Setup Environment for Mobile App.

### For MacOS

You will need Node, Watchman, the React Native command line interface, a JDK, and Android Studio.

We recommend installing Node and Watchman using Homebrew. Run the following commands in a Terminal after installing Homebrew:

`brew install node`
`brew install watchman`

If you have already installed Node on your system, make sure it is Node 14 or newer.

#### Android

We recommend installing the OpenJDK distribution called Azul Zulu using Homebrew. Run the following commands in a Terminal after installing Homebrew:

`brew tap homebrew/cask-versions`
`brew install --cask zulu11`

Download and install [Android studio](https://developer.android.com/studio) from the official website.
After installation need to configure the ANDROID_SDK_ROOT environment variable
Add the following lines to your $HOME/.bash_profile or $HOME/.bashrc (if you are using zsh then ~/.zprofile or ~/.zshrc) config file:

`export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk`
`export PATH=$PATH:$ANDROID_SDK_ROOT/emulator`
`export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools`

#### iOS

Install Xcode from Mac App Store. After installing Xcode it will also install iOS emulator an all the necessary tools to build your iOS app.

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

Another thing is very important is to install CocoaPods. to install CocoaPods run this command
`sudo gem install cocoapods`

### For Linux 
Linux Only supports Android Development. 

#### Android 

#### Node

Follow the [installation instructions](https://nodejs.org/en/download/package-manager/) for your Linux distribution to install Node 14 or newer.
####Java Development Kit

React Native requires at least the version 8 of the Java SE Development Kit (JDK). You may download and install OpenJDK from [AdoptOpenJDK](https://adoptopenjdk.net/) or your system packager. You may also [Download and install Oracle JDK 14](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html) if you want. Or you can install it by using this command `sudo apt-get install openjdk-11-jdk`

##### Android development environment

1. Install [Android Studio](https://developer.android.com/studio/index.html) from From official website.
    While on Android Studio installation wizard, make sure the boxes next to all of the following items are       checked:

   - Android SDK
   - Android SDK Platform
   - Android Virtual Device

Then, click "Next" to install all of these components.

2. Install the Android SDK

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 11 (R) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

To do that, open Android Studio, click on "Configure" button and select "SDK Manager".

    The SDK Manager can also be found within the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 11 (R) entry, then make sure the following items are checked:

    - Android SDK Platform 30
    - Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 30.0.2 is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

3. Configure the ANDROID_SDK_ROOT environment variable

The React Native tools require some environment variables to be set up in order to build apps with native code.

Add the following lines to your $HOME/.bash_profile or $HOME/.bashrc (if you are using zsh then ~/.zprofile or ~/.zshrc) config file, You just need to run these in your terminal:

`export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk`
`export PATH=$PATH:$ANDROID_SDK_ROOT/emulator`
`export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools`

    .bash_profile is specific to bash. If you're using another shell, you will need to edit the appropriate shell-specific config file.

Type source $HOME/.bash_profile for bash or source $HOME/.zprofile to load the config into your current shell. Verify that ANDROID_SDK_ROOT has been set by running echo $ANDROID_SDK_ROOT and the appropriate directories have been added to your path by running echo $PATH.

4. You need to install "adb" on your system. To install it you need run `sudo apt install adb` 

### For Windows

Windows only Support Android Development
#### Android
##### Installing dependencies
You will need Node, the React Native command line interface, a JDK, and Android Studio.

##### Node, JDK
[Chocolaty](https://chocolatey.org) is recommended to install node and other nesseccery tools.

After Installing Chocolaty Run Powershell as Adminstrator then run the following command 
`choco install -y nodejs-lts openjdk11`


#### Android development environment

1. Install [Android Studio](https://developer.android.com/studio/index.html) from From official website.
    While on Android Studio installation wizard, make sure the boxes next to all of the following items are       checked:

   - Android SDK
   - Android SDK Platform
   - Android Virtual Device
   - If you are not already using Hyper-V: Performance (Intel ® HAXM) ([See here for AMD or Hyper-V](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html))

Then, click "Next" to install all of these components.

2. Install the Android SDK

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 11 (R) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

To do that, open Android Studio, click on "Configure" button and select "SDK Manager".

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 11 (R) entry, then make sure the following items are checked:

    Android SDK Platform 30
    Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 30.0.2 is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

3. Configure the ANDROID_HOME environment variable

The React Native tools require some environment variables to be set up in order to build apps with native code.

    Open the Windows Control Panel.
    Click on User Accounts, then click User Accounts again
    Click on Change my environment variables
    Click on New... to create a new ANDROID_HOME user variable that points to the path to your Android SDK:

ANDROID_HOME Environment Variable

The SDK is installed, by default, at the following location:
```http
%LOCALAPPDATA%\Android\Sdk
```
You can find the actual location of the SDK in the Android Studio "Settings" dialog, under Appearance & Behavior → System Settings → Android SDK.

Open a new Command Prompt window to ensure the new environment variable is loaded before proceeding to the next step.

    Open powershell
    Copy and paste Get-ChildItem -Path Env:\ into powershell
    Verify ANDROID_HOME has been added

4. Add platform-tools to Path

    Open the Windows Control Panel.
    Click on User Accounts, then click User Accounts again
    Click on Change my environment variables
    Select the Path variable.
    Click Edit.
    Click New and add the path to platform-tools to the list.

The default location for this folder is:
```http
%LOCALAPPDATA%\Android\Sdk\platform-tools
```


# Set Emulator port to your backend port

To use API from localhost you need to change the emulator `tcp` as same as your local backends port 

adb -s emulator-5554 reverse tcp:5000 tcp:5000
