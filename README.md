![WW](https://github.com/erictatchell/portfolio-website/blob/master/public/img/ww-splash.jpg)
# WineWhisperer
We're Code & Cork, and together we've created WineWhisperer, an AI powered wine recommendation app that aims to make finding your next favourite wine easy.

## Technology
### Frontend
* Tailwind CSS
* NextJS 13.4
* MaterialUI

### Backend
* TypeScript
* JavaScript
* NextAuth.js

### Extra Tools
* MongoDB
* OpenAI API
* Hosted on Vercel

## Folder Structure
```
|   .gitignore
|   next.config.js
|   package.json
|   postcss.config.js
|   README.md
|   tailwind.config.js
|   tsconfig.json
|
+---pages
|   |   404.js                     
|   |   index.tsx                  # Landing page
|   |   _app.tsx                   # App layout
|   |   _document.tsx              # Outer HTML layout, don't edit
|   |   
|   +---api
|   |   |   ai.ts
|   |   |   
|   |   +---auth
|   |   |       [...nextauth].js
|   |   |       
|   |   \---wine
|   |           getsaveWine.ts
|   |           saveWine.ts
|   |           unsaveWine.ts
|   |           [_id].ts            # Wine fetching API dependent on Wine ID
|   |             
|   +---main
|   |       page.tsx                # All of the sites pages are in /pages/main
|   |       
|   \---wine
|           [_id].tsx                # Wine page depending on Wine ID
|           
+---public
|          images.png               # Every image, audio and gif is in /public
|       
\---styles
    globals.css
```

## Prerequisites

### MongoDB
1. [Create a MongoDB account](https://account.mongodb.com/account/login)
2. Install [Studio3T](https://studio3t.com/download/) (optional but recommended)
3. Create a wine database called **'Wine1'** with a collection named **'wset'**
4. Download the [Wine Tasting dataset](https://www.kaggle.com/datasets/mysarahmadbhat/wine-tasting) from Kaggle and fill your wset collection with the contents

### Google OAuth 
5. Go to [Google Developer Console](console.google.com) and obtain the following:
  * Client ID API Key
  * Secret API Key

### OpenAI
6. Go to [OpenAI's Developer Platform](platform.openai.com) and obtain an API key

### Last but not least...
7. Go to [a GUID generator](https://guidgenerator.com/) and obtain ***TWO*** API keys
* Save one under **JWT_SECRET**, and the other under **SECRET**

## Installation

1. Clone the repo with
```git clone https://github.com/erictatchell/2800-202310-BBY29```
2. In the project root, create a ***.env*** file with the following structure:
```
GOOGLE_CLIENT_SECRET=
GOOGLE_CLIENT_ID=

NEXTAUTH_URL=https://2800-202310-bby-29.vercel.app/

SECRET=
JWT_SECRET=

OPENAI_API_KEY=

MONGODB_URI=
MONGODB_HOST=
MONGODB_USER=
MONGODB_PASSWORD=
MONGODB_DATABASE=Wine1
```
3. Insert your obtained API keys and MongoDB data in the fields and save.

4. Open your terminal and run ```npm install``` to fetch the latest dependencies.

## You're done! To run, enter ```npm run dev``` in your terminal.
### [Testing Log](https://docs.google.com/spreadsheets/d/13nMZhT907nleudMOk-nwra6mgmaMXCsCr6rPnq2MMR0/edit#gid=394496370)

# Using WineWhisperer
### You can continue as a guest or sign in with Google. If you are a guest, you cannot save wines.

### Home page
1. On the home page, enter any wine you want in the textbox! We have 3 sample options listed.
2. Click **Discover** to see your recommended options. (and learn a fact about wine!)
3. When the wines show up, you can click the arrow to learn more or save them!

### Top Picks (the top 10)
#### Gold, Silver and Bronze are our top 3 wines as sorted on a 100 point scale.

### Cellar
#### This is every single wine in our dataset. You can sort by price and points by clicking the dropdown, or view all eco friendy wines!

### Saved
#### This is where you can see all of your saved wines. You can unsave them or click to learn more.

# Credits/Referneces 
* OpenAI API
* MaterialUI icons
* Wine Tasting dataset from MYSAR AHMAD BHAT
* Bordeaux image from WineXpert
* Background video was mashup of [this](https://www.pexels.com/video/pouring-wine-in-glass-1003928/), [this](https://www.pexels.com/video/a-person-poring-red-wine-on-a-wineglass-3197862/) and [this](https://www.pexels.com/video/a-person-pouring-wine-on-a-row-of-wine-glasses-3188887/)

# Using OpenAI API
* We used GPT 4.0 to aid in the autocompletion of code blocks. We provided logic, it provided a solution. It was tremendously helpful as we were using brand new technologies that none of us have used prior.
* We had kind of struck gold with our Wine Tasting dataset so we didn't need to alter it with AI.
* Our app uses OpenAI's GPT3 text-davinci-003 model to read and analyze the users entered wine preference. On the backend, we provide the model this prompt: 'List 10 DISTINCT wines that best fits this prompt:' with the users prompt filled at the end. GPT3 returns a list of 10 wines in json format, which are then queried against our wine dataset. For every word, it first searches each document's title to find a match. If there's no match, it moves to the description where it does the same thing. Aside from a few random responses from the model, the success rate is almost 100%. The DB then returns 3 of the select 10. Moving forward, we would like to refine this logic and allow the user to customize the amount of options they have.
* We are not able to train GPT3 on our wine dataset. We solved this by adding the DB query in the middle. If we were to train the model, it would cut out the Mongo middleman and provide a faster, more accurate query.

# Contact Info
## Eric Tatchell
* erictatch@gmail.com
* [GitHub](https://github.com/erictatchell)
* [LinkedIn](https://www.linkedin.com/in/eftatchell)

## Noor Sangha
* noorsangh@gmail.com
* [GitHub](https://github.com/noorksangha)
* [LinkedIn](https://www.linkedin.com/in/noor-sangha-277a32240)

## Brendan Doyle
* brendan-doyle@hotmail.com
* [GitHub](https://github.com/Brendan-Doy1e)
* [LinkedIn](https://www.linkedin.com/in/brendan-j-doyle)

## Victor Vasconcellos
* victor.amaim@gmail.com
* [GitHub](https://github.com/victoramaim)
* [LinkedIn](https://www.linkedin.com/in/victor-vasconcellos-4ab255262)


