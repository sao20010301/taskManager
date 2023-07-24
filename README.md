Task Manager
======
This project 
Features
======
- Seach USER/REPO to get the issues of the repo as tasks(the doc said default query only gets the open issues,but not working:monocle_face:)  
- Scroll to the bottom to load more tasks  
- Filter tasks by label  
- Order tasks by descending or ascending(query also doesn't work:thinking:)
- Modify tasks:
  - Create new task to github
  - State(deletion will set the issue closed)
  - Label, title and body can be edited(title and body must not be empty, body should contain over 30 letters)  
  
ScreenShot
======
## Search  
![image](https://github.com/sao20010301/taskManager/blob/c4e6ee4e122e605c7b30276186078fc3aa7ea366/search.gif)  
## Create
![image](https://github.com/sao20010301/taskManager/blob/c4e6ee4e122e605c7b30276186078fc3aa7ea366/create.gif)  
## Edit
![image](https://github.com/sao20010301/taskManager/blob/c4e6ee4e122e605c7b30276186078fc3aa7ea366/edit.gif)  

How To Use
======
## Install dependencies
```bash
 npm install
```
## Frontend
```bash
 npm run start
 ```
## Middleware
```bash
 cd server
 node server
```
Enviroment Variables
======
To run this project, you will need to add the following enviroment variables to your .env file.  
`REACT_APP_CLIENT_ID(Client ID)`  
`REACT_APP_CLIENT_SECRET(Client Secrets)`  
To get them,you need to go to github developer settings and add a new oauth app.

# Tech Stack
**Frontend:** React, React Router, Context API  
**Middleware** Node, Express
