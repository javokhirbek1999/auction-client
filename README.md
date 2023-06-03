Auction Client [Semester 4 - REST Oriented Web Services]
============
<!-- [![GitHub Stars](https://img.shields.io/github/stars/IgorAntun/node-chat.svg)](https://github.com/IgorAntun/node-chat/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/IgorAntun/node-chat.svg)](https://github.com/IgorAntun/node-chat/issues) [![Current Version](https://img.shields.io/badge/version-1.0.7-green.svg)](https://github.com/IgorAntun/node-chat) [![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://igorantun.com/chat) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/IgorAntun/node-chat?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) -->

<a href="http://kiska-url.herokuapp.com/" target="_blank">EasyAuction</a> is an online Auction web service. <br/>
This is a <i>ReactJS</i> client running on NodeJS server. <br/>
Check out the repo of server-side repository <a href="https://github.com/javokhirbek1999/auction-server-side" target="_blank">here</a> 


![Chat Preview](https://i.imgur.com/hg7He68.png)

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#kiskaurl-client">About The Project</a>
      <ul>
        <li><a href="#technologies">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#features">Features</a>
      <ul>
        <li><a href="#user-registration">User Registration</a></li>
        <li><a href="#profile-page">User Profile</a></li>
        <li><a href="#password-change">Delete User</a></li>        
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

## Features
- <h3> You can bid to on-going auction items </h3>
![Imgur](https://i.imgur.com/FHYehsc.png)
- <h3>Shows the bids for the specific items</h3>
![Chat Preview](https://imgur.com/GOcLtuR.png)
<h5>Shows latest stats of each user who bidded:</h5>
<ul>
  <li>Username</li>
  <li>Bid Price</li>
  <li>Bid Date</li>
</ul>

- <h3>User Registration</h3>
<img src="https://imgur.com/qzuOvRk.png" />
<h5>Uses custom Token authentication:</h5>
<p style="font-size: 10px">Once the User is registered, User can use the authentication credentials to Login</p>
<img src="https://i.imgur.com/ias0d1l.png"/>
<p style="font-size: 10px">Once the User logs in, it receives the Token from the server and sets it in <strong><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization" target="_blank">Authorization Headers</a></strong> and saves it in the <strong><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">LocalStorage</a></strong> so User do not have to enter authentication credentials everytime</p>

- <h3>Profile page:</h3>
  <img src="https://imgur.com/wyy7vqq.png" />
  <p>Users can delete their profile</p>
  <p>User has to confirm deleting his/her account</p>
- <h3>Account deleting confirmation</h3>
<img src="https://imgur.com/QLykpVR.png" />


---
## Technologies
- Javascript
- ReactJS 18.2.0
- Material UI 4.12.3
- Axios 1.4.0
</ul>
---

## Setup
To run the app in your own local machine, first of all, clone this repo to your local machine and install all of the dependecies using `npm` by going to its root directory and on the terminal run the command below:
```bash
$ yarn install
```
---

## Usage
Once the dependencies are installed, you can start the application by running the command below : 
```bash 
$ yarn start
``` 
You will then be able to access it at `localhost:3000`

---

## License
>You can check out the full license [here](https://github.com/javokhirbek1999/kiska-url-server-side/blob/main/LICENSE)

This project is licensed under the terms of the **MIT** license.
