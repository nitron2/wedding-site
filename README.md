# wedsite: Hayden and Rachel's Wedding Website

**Note: Every commented function will be signed by contributors.**

## Quick Start Guide

1. Install **Node.js** on your machine: https://nodejs.org/dist/v20.11.1/node-v20.11.1.pkg
2. Install **XAMPP**: https://www.apachefriends.org/
3. Install the **Live Server** extension: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
4. Install: https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets
5. Install: https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next
6. Install: https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons

## Developing the Application

5. Start the **Apache** and **mySQL** servers in **XAMMP** 
6. Go to http://localhost/phpmyadmin/ .
8. **Drop** the locally installed fema databse.
7. Create a new database '*fema*'.
8. The breadcrum trail at the top of phpMyAdmin should now look something like: ***"Server: localhost / Databse: fema"***
9. In VS Code, right-click **fema.sql** and select **Reveal in Finder**
10. Drag **fema.sql** into the current phpMyAdmin window.
11. Upload **fema.sql** here. 
12. In **VScode**, open a new terminal, and cd into the **server** directory.
13. run ***npx nodemon app.js***
14. Nagivate to the HTML file for the page you want to work on.
15. Right-click the file and *Open with Live Server*. 
16. Use your browser's debugger.

**AN IMPORTANT NOTE ON DATABASE COLLABORATION:**: Whenever you make changes to the database, make sure they are reflected in fema.sql.


## The art of Good Git Commit Messages:

https://cbea.ms/git-commit/#seven-rules

## Tutorials Hayden has used that are helpful: 
videos: https://youtube.com/playlist?list=PLnqhWGNR9f9--oV4PHu1-Z8Yx8HlELQgd&si=2tvHg_H2gn3ZIunx

multer: https://www.freecodecamp.org/news/simplify-your-file-upload-process-in-express-js/

HTTP request methods:
https://medium.com/swlh/restful-api-design-get-post-put-patch-delete-a-walkthrough-with-javascripts-fetch-api-e37a8416e2a0

## Time Log

 Hayden:
 
 | Activity | Hours | Contributor |
| -------- | ------- | ----------|
| Learn JavaScript, CSS, HTML, Node Fundamentals | 14 | Hayden |







A beautiful, feature rich, device friendly wedding website.  
_See [wedding.rampatra.com](http://wedding.rampatra.com/) for a demo. Use invite code `271117` to RSVP._

# Getting Started
1. `$ git clone https://github.com/rampatra/wedding-website.git` - clone this project to your computer
2. `$ cd wedding-website` - go inside the project directory
3. `$ npm install` - install dependencies
4. `$ gulp` - compile sass to css, minify js, etc.
5. That's it, open `index.html` file on your browser by just double-clicking on it.

# Documentation
I have written a 
[blog post describing all the features of this wedding website](https://blog.rampatra.com/wedding-website) and how to
customize each of them according to your needs.

Lastly, if you use a Mac then you may also love [Presentify](https://presentifyapp.com/), [FaceScreen](https://facescreenapp.com/), or [ToDoBar](https://todobarapp.com/). Give them a whirl and let me know your thoughts.

# Contribute
Firstly, a big thanks 🙏🏻 for the overwhelming response on [HackerNews](https://news.ycombinator.com/item?id=18556787), and [Reddit](https://www.reddit.com/r/opensource/comments/a1bx4h/i_am_open_sourcing_my_wedding_website_on_my_first/). If you would like to contribute to this project, you can do so by creating a [PR](https://help.github.com/articles/about-pull-requests/); and to support my work, you can click on one of the links under the "Sponsor this project" section or the button below.

<a href="https://www.buymeacoffee.com/rampatra" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

_P.S. For any queries or concerns, you can reach out to me on [Twitter](https://twitter.com/ram__patra). I'll try my best to help._
