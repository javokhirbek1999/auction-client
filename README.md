KiskaURL Client
============
<!-- [![GitHub Stars](https://img.shields.io/github/stars/IgorAntun/node-chat.svg)](https://github.com/IgorAntun/node-chat/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/IgorAntun/node-chat.svg)](https://github.com/IgorAntun/node-chat/issues) [![Current Version](https://img.shields.io/badge/version-1.0.7-green.svg)](https://github.com/IgorAntun/node-chat) [![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://igorantun.com/chat) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/IgorAntun/node-chat?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) -->

<a href="http://kiska-url.herokuapp.com/" target="_blank">KiskaURL</a> is a URL shortening web application that shortens long messy URLs into more managable and shorter URL. <br/>
This is a <i>ReactJS</i> client running on NodeJS server, if you want to check out the server-sdie API, you can explore it <a href="https://kiska.herokuapp.com/" target="_blank">here</a>. <br/>
Check out the repo of server-side application <a href="https://github.com/javokhirbek1999/kiska-url-server-side" target="_blank">here</a> 


![Chat Preview](https://i.imgur.com/k1so4ss.png)

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#kiskaurl-client">About The Project</a>
      <ul>
        <li><a href="#technologies">Built With</a></li>
        <li><a href="#request-flow-for-shortening-the-url">How URLs are hashed</a></li>
      </ul>
    </li>
    <li>
      <a href="#features">Features</a>
      <ul>
        <li><a href="#shows-the-stats-of-latest-activities">Stats about latest activities</a></li>
        <li><a href="#user-registration">User Registration</a></li>
        <li><a href="#password-reset-through-email-verification">Password Reset through Email verification</a></li>
        <li><a href="#profile-page">User Profile</a></li>
        <li><a href="#password-change">Password Change</a></li>        
      </ul>
    </li>
    <li>
      <a href="#technologies">Technologies</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#setup">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

---
## Request Flow for Shortening the URL
![Chat Preview](https://i.imgur.com/5mUbTPr.jpeg)

Checkout the server-side repo for better explaination about how URLs are Hashed on <a href="https://github.com/javokhirbek1999/kiska-url-server-side#request-flow-for-shortening-the-url" target="_blank">here</a>
---
## Live Running App

<h6><a href="https://kiska-url.herokuapp.com/" target="_blank">Here</a> you can explore the live web application</h6>

---

## Features
- <h3>Shows the stats of latest activities</h3>
![Chat Preview](https://i.imgur.com/8b39bU0.png)
<h5>Shows latest stats of each user who shortened URL:</h5>
<ul>
  <li>Username</li>
  <li>Original URL</li>
  <li>Short URL</li>
  <li>Also shows the stats for:
    <ul>
    <li>Number of times the URL is shortened</li>
    <li>Number of times the Short URL is visited</li>
    </ul></li>
</ul>

- <h3>User Registration</h3>
<img src="https://i.imgur.com/25M634O.png" />
<h5>Uses custom Token authentication:</h5>
<p style="font-size: 10px">Once the User is registered, User can use the authentication credentials to Login</p>
<img src="https://i.imgur.com/ias0d1l.png"/>
<p style="font-size: 10px">Once the User logs in, it receives the Token from the server and sets it in <strong><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization" target="_blank">Authorization Headers</a></strong> and saves it in the <strong><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">LocalStorage</a></strong> so User do not have to enter authentication credentials everytime</p>

- <h3>Password Reset through Email verification</h3>
<img src="https://i.imgur.com/cWWJKcK.png" />
<p>Users can reset their password through the Emails they used for registration.<br/>Once the user enters the Email, verification Email with password reset link will be sent to user's email to reset the password</p>
<img src="https://i.imgur.com/mnWbiZm.jpg" />
Once the User clicks on the link, User will be verified and redirected to Password Reset Page:
<img src="https://i.imgur.com/g742ajm.png" />
<p>Once the User enters password, password will be confirmed</p>

- <h3>Profile page:</h3>
  <img src="https://i.imgur.com/VHsZIF7.png" />
  <p>Users can change or reset their passwords on their profile page</p>
  <img src="https://i.imgur.com/X9zNXk7.png" />
  <p>User can see other's profiles as well</p>
- <h3>Password Change</h3>
<img src="https://i.imgur.com/erNRRyX.png" />


---
## Technologies
- Javascript
- ReactJS 17.0.2
- Material UI 4.12.3
- Axios 0.24.0
</ul>
---

## Setup
To run the app in your own local machine, first of all, clone this repo to your local machine and install all of the dependecies using `npm` by going to its root directory and on the terminal run the command below:
```bash
$ npm install
```
---

## Usage
Once the dependencies are installed, you can start the application by running the command below : 
```bash 
$ npm start
``` 
You will then be able to access it at `localhost:3000`

---

## License
>You can check out the full license [here](https://github.com/javokhirbek1999/kiska-url-server-side/blob/main/LICENSE)

This project is licensed under the terms of the **MIT** license.
