# Music Review Website
This site was made by Spencer Mullen to track some of his music reviews! 

## Site Deployment
Frontend and Backend are both hosted on render. The site is deployed live! Note: Can take a little while to initially load because free render sites "spin down" due to inactivity.
- https://spencermusic.onrender.com/

## Quick Start
If you want to run the site UI locally follow the steps listed below:

```bash
# Clone the repository
git clone https://github.com/SpencerMullen/MusicWebsite

# Navigate to the frontend directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```
## Frontend
- Vite - I used Vite for setting up my React project.
- React.js - React is the JavaScript framework that I leveraged to develop responsive, user-friendly UI for my site.
- Material UI - I used the React library Material UI to utilize components like sliders and app bars.

## Backend
- Node.js - JavaScript was the server side language I chose for this project.
- Express.js - The Express framework helped me set up RESTful APIs that my frontend could communicate to the backend with using axios.
- MongoDB - The database I chose to host entry and user data was MongoDB. I utilized the Mongoose library to create models and schemas for validating data and saving data from the frontend to the database.
- Joi - Joi helped me sanitize any user input data as well as validate the data against the schemas I created.
- Cloudinary - To host images that represent the album cover, I used Cloudinary, an online image hosting service. Their Node API as well as Multer helped facilitate the image upload process. The database objects store a Cloudinary link to the image file.
- Passport - I used the Passport Local Strategy to implement Authentication on my site. Using passport and express-session, I can authenticate users using the browser session once they have logged in.
- Discogs API - I utilized the Discogs API to be able to search up entries and add them to the database. The npm package 'disconnect' made creating a client to communicate with the API esay. Users can still manually add an entry for any specific cases. Discogs also provides cover art which helps reduce load on my Cloudinary storage since I only have the free plan. However, the API seems slow sometimes when loading images so I am looking to spread out where I get the cover art.

## Pages
Here are what each of the pages on my site look like. Some features may change in the future but the overall structure should look the same.

### Home
The home page features a stock image of a vinyl record and a link to the list page.
![Alt text](https://github.com/SpencerMullen/MusicWebsite/blob/main/images/home.PNG?raw=true)

### List
The list page contains all of the entries on my site. Users can search for any specific entries using the search bar or filter the list using the checkboxes. Users can also use the dropdown to sort by artist, title, date, rating, or review date. Clicking on any specific entry navigates to that entry's page. I used MongoDB's aggregation pipeline to handle sorting, filtering, and searching.
![Alt text](https://github.com/SpencerMullen/MusicWebsite/blob/main/images/List.PNG?raw=true)

### Search
The search page contains an interface where users can search for entries using the Discogs API where they can then add new entries to the site. Hovering over any search result card puts a button on the card that opens a dialog for confirming to add the entry. The entry is added in the same way as manual entries but uses the Discogs image link instead of uploading to Cloudinary. Note: the API is limited in terms of queries per minute so I reduced each search to 15 results.
![Alt text](https://github.com/SpencerMullen/MusicWebsite/blob/main/images/Search.PNG?raw=true)

### Entry
The entry page contains information on the specific entry including cover art, title, artist, genre, release date and more. If I reviewed the album it also shows that information.
![Alt text](https://github.com/SpencerMullen/MusicWebsite/blob/main/images/Entry.PNG?raw=true)

## CRUD Operations
For my site, I developed it so that only users with type admin can call create (manually), update, and delete operations on the entries. Any user can view the list and view specific entries. When logged into an admin account, a blue banner with the 'Create Entry' button will appear on the List page. A blue banner with 'Edit Entry', 'Delete Entry', 'Add/Edit Review', and 'Delete Review' buttons will also appear on any specific Entry page for admins. Users can without admin status can search for entries and add them after providing a release date (helps with sorting).

![Alt text](https://github.com/SpencerMullen/MusicWebsite/blob/main/images/CreateEntry.PNG?raw=true)
The create entry form where users can manually enter the album information and upload the cover image.

![Alt text](https://github.com/SpencerMullen/MusicWebsite/blob/main/images/SearchAdd.PNG?raw=true)
After selecting a specific entry searched using the Discogs API, a dialogue for adding some additional information is opened to be able to create an entry.

![Alt text](https://github.com/SpencerMullen/MusicWebsite/blob/main/images/EditEntry.PNG?raw=true)
The edit entry form is prefilled with the entry information. Users can update the album information here.

![Alt text](https://github.com/SpencerMullen/MusicWebsite/blob/main/images/DeleteEntry.PNG?raw=true)
The delete entry form where users can delete entries. Also deletes the image off of Cloudinary so the image does not take unnecessary space.

![Alt text](https://github.com/SpencerMullen/MusicWebsite/blob/main/images/AddEditReview.PNG?raw=true)
Users can add or edit the review here. It will preload any saved review information. Users can also use bold by surrounding text with '*' and italics by surrounding text with '_'.

![Alt text](https://github.com/SpencerMullen/MusicWebsite/blob/main/images/DeleteReview.PNG?raw=true)
Users can delete the review part of the entry here.

## Potential Features
- Infinite Scroll - Load entries by chunks to reduce frontend load
- More Mobile Friendly UI Support
- Small/Large Entry Cards - Make checkmark on list app bar to choose card size
- UI Overhaul - Make better UI since it looks pretty basic
- Helmet - Add more security
- Home Page Recommended Album - Add a component in the home page that has a featured album and a graphic.
- Home Page Random Album - Add a component in the home page that has a random album picker.
- User Comments/Reviews - Implement support for other user comments / reviews on albums.

## Other Notes
- I finished this site in 2023 but have saved reviews for a couple of years.
- Surround text using asterisks for bold and underscore for italics.