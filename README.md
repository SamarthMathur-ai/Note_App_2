# Note_App_2
It is the new notes app with a complete backend and hopefully deployed you can see the previous version in the repository "Note_App"

Day 1 1/05/2026
What i learnt: git hub and how to add sql and about es module in js
Some other thing
// About github
GIT REPOSITORY SETUP & CONFLICT RESOLUTION
Project: SimpleNotesApp2

1. INITIALIZING LOCAL REPO
- Initialized git in the project folder.
- Committed existing local code to have a starting point.
- Command: git init -> git add . -> git commit -m "Initial commit"

2. CONNECTING TO GITHUB
- Linked local folder to the remote GitHub repository.
- Used rebase to bring in the README and .gitignore from GitHub.
- Command: git remote add origin <URL>
- Command: git pull origin main --rebase

3. RESOLVING .GITIGNORE CONFLICT (ADD/ADD)
- Conflict occurred because both local and GitHub created a .gitignore.
- Manually edited .gitignore to remove conflict markers (<<<<, ====, >>>>).
- Kept the comprehensive GitHub Node.js template.
- Verified node_modules and .env were properly ignored.

4. COMPLETING THE REBASE
- Marked the conflict as resolved.
- Used Vim (:wq) to save the commit message during the rebase process.
- Command: git add .gitignore
- Command: git rebase --continue

5. FINAL PUSH
- Pushed the merged code and history to GitHub.
- Command: git push -u origin main

BEST PRACTICES LEARNED:
- Use git pull --rebase to keep a clean, linear history.
- Always check .gitignore before pushing to keep node_modules and secrets off the web.
- If the project already has code, it is often easier to create an empty repo on GitHub first.


about code
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 






Day 2 3/05/2026
What i learnt: crud operation with the help of mysql 2
              error handling with try and catch and hack proof using prepared statement
              and that json is still useful as even though we are using sql it is still used to interact with the frontend.
              learnt that in such database i also need to send res.json(200) to keep the frontend and backennd in sync
              almost completed the sql part of the app just have to sync the time sort thing
              I will do the search later
              



DAY 3 5/05/2026
What i learnt: Completed the sql things
               Mainly learnt how to make a search bar which was very easy using sql and how to send response.json and make it
               and did make it responsive according to screen size by ai though some updates are still necessary
               Added a separate file for search bar and also learnt about eventlistener of text
               Learn to send query in searches
               now jwt authenticatioin is the next step.



Day 4 7/05/2026
Whar i learnt: Learning jwt authentication still. and about data security stuff.


Day 5 10/05/2026
Actually added some authentication just making some refresh token and access token
added the access token to the database of the user
made a jwt middleware!
and the biggest thing cleared the structure of server side of app.
               

Day 6 11/05/2026
Added signup logic and finalised the user database for now.
learnt how to connect frontend to backend and then backend to frontend
next work is to complete user authenticaion as the database is complete
