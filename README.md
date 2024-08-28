
### Note 


I deployed it on backend on render and frontend on netlify.

depoyed link: https://blogappdaveed.netlify.app/ 

backend deplyed link: https://blogbackend-3hud.onrender.com 

backend repository: https://github.com/DaveedGangi/blogbackend.git 


I have used a third party packages 

I have added a responsiveness to different screen sizes 

i have written a clean code guiddelinse 

i have used this commands for frontend 

Installation Command:

npm install -g create-react-app


Creating a React Application

create-react-app myapp --use-npm


Starting a React Application

npm start


npm i react-router-dom@5.2.0

npm i js-cookie

npm install react-bootstrap bootstrap

npm install lottie-react

npm i react-icons



### home page 

Here are the main points from  `index.js` file:

1. **Imports:**
   - Essential modules and components are imported, including:
     - `Component` from React.
     - `Link` from `react-router-dom`.
     - `Cookies` for managing JWT tokens.
     - `DNA` loader from `react-loader-spinner`.
     - `Lottie` for animations.
     - A Lottie animation JSON file (`animation.json`).
     - Styling from `index.css`.

2. **State Management:**
   - The `Home` component maintains state with the following properties:
     - `posts`: An array to store the fetched posts.
     - `status`: Tracks the status of the fetch operation (`pending`, `success`, or `fail`).
     - `searchText`: Stores the text input for searching posts.

3. **Lifecycle Method:**
   - `componentDidMount`: The `getPosts` method is called when the component mounts to fetch posts from the server.

4. **Fetching Posts:**
   - The `getPosts` method:
     - Sets the `status` to `pending`.
     - Fetches posts from the backend API using an authorization header with a JWT token.
     - Filters posts based on the search text.
     - Updates the state with the fetched posts and the `status` based on the API response.

5. **Search Functionality:**
   - The `inputSearchText` method updates the `searchText` state as the user types, triggering a new fetch request to filter posts.

6. **Rendering Posts:**
   - The `blogList` method:
     - If no posts are found, a Lottie animation with a message prompts the user to add a post.
     - If posts are available, it maps over the `posts` array to display each post's title, description, and a link to read more.

7. **Loading and Error Handling:**
   - The `loading` method displays a DNA spinner animation with a "Loading..." message while data is being fetched.
   - The `homeComponent` method uses a switch statement to determine what to render based on the `status` (`pending`, `success`, or `fail`).

8. **Render Method:**
   - In the `render` method:
     - Checks if a JWT token is present; if not, redirects the user to the login page.
     - Displays a navbar with the blog title and a link to the user's profile.
     - Includes a search input field.
     - Calls the `homeComponent` method to render the appropriate content based on the current status.

9. **Conditional Rendering:**
   - Depending on the state (`posts`, `status`, etc.), the component conditionally renders the list of posts, a loading spinner, or an error message.

This `Home` component is well-structured, handling data fetching, search filtering, and conditional rendering based on the fetch status. It ensures a smooth user experience by showing loading animations, handling errors, and providing interactivity through the search functionality.



### specific post 

Here are the main points from `index.js` file for the `Post` component:

### 1. **Imports:**
   - Core libraries and components:
     - `Component` from React.
     - `Link` from `react-router-dom`.
     - `Cookies` for managing JWT tokens.
     - `DNA` loader from `react-loader-spinner`.
     - Custom CSS for styling.

### 2. **State Management:**
   - The component maintains state with the following properties:
     - `post`: Stores data for the specific post being viewed.
     - `comments`: Stores the comments associated with the post.
     - `commentShow`: Boolean flag to toggle the display of the comments section.
     - `comment`: Stores the text input for a new comment.
     - `status`: Tracks the status of fetching the post and comments (`pending`, `success`, or `fail`).

### 3. **Lifecycle Method:**
   - `componentDidMount`: Invokes `getSpecificPost` and `getComments` methods to fetch the post details and associated comments once the component is mounted.

### 4. **Fetching Post and Comments:**
   - `getSpecificPost`: 
     - Fetches the details of a specific post using the post ID from the URL.
     - Updates the state with the fetched post data and adjusts the `status` accordingly.
   - `getComments`:
     - Fetches comments associated with the post using the post ID from the URL.
     - Updates the `comments` state with the fetched data.

### 5. **Comment Functionality:**
   - `showComment`: Toggles the visibility of the comments section.
   - `commentText`: Updates the `comment` state as the user types a new comment.
   - `addComment`: 
     - Submits the new comment to the backend.
     - Upon successful submission, the new comment is added to the state, and the comments are re-fetched.
   - `deleteComment`: 
     - Deletes a comment based on its ID.
     - Re-fetches the comments after successful deletion.

### 6. **Rendering Post and Comments:**
   - `specificPost`: 
     - Displays the post details, including title, image, description, and posted date/time.
     - Includes a section for showing/hiding comments, adding a new comment, and listing all comments.
     - If the logged-in user is the one who posted a comment, a "Delete" button is available for that comment.
   - `loading`: Shows a loading animation while data is being fetched.
   - `specificComponent`: 
     - Renders content based on the `status` (`pending`, `success`, or `fail`).
     - Calls `specificPost` to display the post and comments or shows a loading/error message accordingly.

### 7. **Render Method:**
   - The render method:
     - Displays a navbar with links to the home page and the user's profile.
     - Calls `specificComponent` to render the appropriate content (post, comments, loading state, etc.).

### 8. **Conditional Rendering:**
   - Depending on the current state (`status`, `commentShow`, etc.), the component conditionally renders the post details, comments section, and error/loading states.

This `Post` component is structured to handle viewing a specific post, managing comments (including adding and deleting), and ensuring that data is fetched and displayed dynamically based on user interaction and server responses.






# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
