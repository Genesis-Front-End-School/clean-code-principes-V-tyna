<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Crimson+Text&weight=600&size=30&pause=1000&color=000000&center=true&vCenter=true&multiline=true&width=800&height=60&lines=%F0%9F%91%8B+Hello+and+Welcome." alt="Typing SVG" /></a>

# How to run project:

## Step 1.
- cd client (go to the client folder)
- npm i
- cd server (go to the server folder)
- npm i
- cd .. (back to the root folder)
- npm i

## Step 2.
- npm run start (in the root folder)
You should see in the terminal messages: 'Server is running at post 3000.' &  '√ Compiled successfully'. 
Then http://localhost:4200/ should automatically run at your default browser.

# Demo

## You can watch it by the link: https://drive.google.com/file/d/1BwlAwFAaU1XpOu18sYhnqps1fOFsPO8u/view?usp=share_link

# API Error token:
(It should work, but for any case).
If TOKEN in server/app.js is old for you, please go to postman:
1) Make fork https://www.postman.com/aninix/workspace/genesis-front-end-school/overview
2) Send request for token ('http://api.wisey.app/api/v1//auth/anonymous?platform=subscriptions')
Check screenshot in the end of readme.md

# CORS issue: 

### Describing issue:
Request by links from API sometimes (randomly) has a CORS error.
The same link could work properly or with an error.

### Solution:
Server handles CORS errors. Added cors package and credentials(token).
Video html tag still have the error and in the client/shared/error-link.handler.ts I've made validation if request by the link is ok or not. Then in the VideoService, this function is used. I added comments in the code for faster understanding what is going on there. 

### Alternative approach:
If there is no CORS issue, the function from client/shared/error-link.handler.ts handle all video streaming errors for better user experience.

## Video loading spinner info:
By default in video added controls, which automatically show spinner. One of the task was adding own loading spinner. I added it, but do not turn off controls (that would disable default spinner and controls) for user comfort. So you can see both spinners custom and default.

# Run tests: 
- cd client (go to the client folder)
- npm run test 
<img width="600" src="https://user-images.githubusercontent.com/78938313/226205680-f6a1bb8a-c1da-4cef-815b-8c8dacc8b636.png" alt="test-screenshot"/>

## Error API Token
<img width="600" src="https://user-images.githubusercontent.com/78938313/226197551-90d70931-8f8d-4144-b5bb-494dfd2a559d.png" alt="error-token"/>
