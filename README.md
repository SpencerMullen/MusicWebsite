# Music Review Website
This site was made by Spencer Mullen to track some of his music reviews! 

## Site Deployment
Frontend and Backend are both hosted on render. The site is deployed live! Note: Can take a little while to initially load because free render sites "spin down" due to inactivity.
- https://music-list-frontend.onrender.com/

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

## Pages
Here are what each of the pages on my site look like. Some features may change in the future but the overall structure should look the same.

### Home
The home page features a stock image of a vinyl record and a link to the list page.
![Alt text](./images/Home.png)

### List
The list page contains all of the entries on my site. You can search for any specific entries using the search bar or filter the list using the checkboxes. You can also use the dropdown to sort by artist, title, date, rating, or review date. Clicking on any specific entry takes you to that entry's page. I used MongoDB's aggregation pipeline to handle sorting, filtering, and searching.
![Alt text](./images/List.png)

### Entry
The entry page contains information on the specific entry including cover art, title, artist, genre, release date and more. If I reviewed the album it also shows that information.
![Alt text](./images/Entry.png)

## CRUD Operations
For my site, I developed it so that only users with type admin can call create, update, and delete operations on the entries. Any user can view the list and view specific entries. When logged into an admin account, a blue banner with the 'Create Entry' button will appear on the List page. A blue banner with 'Edit Entry', 'Delete Entry', 'Add/Edit Review', and 'Delete Review' buttons will also appear on any specific Entry page for admins.

![Alt text](./images/CreateEntry.png)
The create entry form where users can enter the album information and upload the cover image.

![Alt text](./images/EditEntry.png)
The edit entry form is prefilled with the entry information. You can update the album information here.

![Alt text](./images/DeleteEntry.png)
The delete entry form where users can delete entries. Also deletes the image off of Cloudinary so the image does not take unnecessary space.

![Alt text](./images/AddEditReview.png)
If the album is not reviewed or if you want to change the review you can do so here. It will preload any saved review information. You can also use bold by surrounding text with '*' and italics by surrounding text with '_'.

![Alt text](./images/DeleteReview.png)
You can delete the review part of the entry here.

## Potential Features
- Infinite Scroll - Load entries by chunks to reduce frontend load
- Save Scroll Position - Save the Scroll position so if the user goes back to the list page they are at the same place
- Small/Large Entry Icons - Make checkmark on list app bar
- UI Overhaul - Make better UI since it looks pretty basic
- Helmet - Add more security
- Home Page Recommended Album - Add a component in the home page that has a featured album and a graphic.
- Home Page Random Album - Add a component in the home page that has a random album picker.
- User Comments/Reviews - Implement support for other user comments / reviews on albums.

## Other Notes
- I finished this site in 2023 but have saved reviews for a couple of years.
- Surround text using asterisks for bold and underscore for italics.