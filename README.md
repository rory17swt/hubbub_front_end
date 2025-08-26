# Hubbub
## Description:
Hubbub is a full-stack, CRUD-based social platform where users can discover, create, and share events. I built this project as the final capstone for the General Assembly Software Engineering Intensive Bootham, applying all the core skills I developed throughout the course.

The backend is powered by Python, Django, and Django REST Framework, while the frontend is built with React. Hubbub represents the culmination of my learning, combining clean API design, dynamic user interfaces, and a focus on user experience into a fully functional web app.

## Deployment Link:
You can view Hubbub here: https://hubbub-app.netlify.app/
You can browse events without an account, but to unlock the full experience, including adding, editing, and deleting your own events, as well as participating in the Q&A section, you’ll need to create an account and sign in.

## Accessing My Code:
You can find my code on GitHub by following this link for the frontend: https://github.com/rory17swt/hubbub_front_end/tree/main

And this link for the backend:
https://github.com/rory17swt/hubbub_back_end

## Timeframe / Solo or Team Project:
This project was completed independently over 6 days. I managed all aspects of the design, development, and implementation.

## Technologies Used:
### Backend:
-	Django – High-level web framework used to handle core backend logic and routing
-	Django REST Framework – For building RESTful APIs and handling serialization
-	PostgreSQL – Relational database used to store and manage data
-	Cloudinary – Cloud-based media management used for hosting uploaded images
-	Simple JWT – Handles authentication using JSON Web Tokens
-	Whitenoise – Serves static files efficiently in production
-	django-environ – Manages environment variables securely
-	CORS Headers – Manages Cross Origin Resource Sharing between frontend and backend
-	Custom User Model – Extended Django’s default user model for more flexibility
  
### Frontend:
-	React – JavaScript library for building dynamic user interfaces
-	React Router – Enables client-side routing for a seamless single-page app experience
-	Axios – Handles HTTP requests to the Django API
-	Vite – Fast development server and build tool for modern frontend projects
-	dotenv – Manages environment varibles in the frontend
-	React Hooks ESLint Plugin – Ensures best practices when using React Hooks

## Brief:
For this project, we were tasked with building a Django application with full CRUD functionality. Before receiving approval to begin development, we were required to present our wireframes and database design (DBD) diagram to our instructor.

### MVP:
-	The app utilizes Django templates for rendering templates to users.
-	PostgreSQL is used as the database management system.
-	The app uses Django’s built-in session-based authentication.
-	Authorization is implemented in the app. Guest users (those not signed in) should not be able to create, update, or delete data in the application or access functionality allowing those actions.
-	The app has at least one data entity in addition to the User model. At least one entity must have a relationship with the User model.
-	The app has full CRUD functionality.
-	The app is deployed online so that the rest of the world can use it.
  
### UI/UX:
-	The app exhibits a visual theme, like a consistent color palette and cohesive layout across pages.
-	The app is easily navigable by a first-time user. For example, navigation should be done through links instead of having to type in a URL to navigate around the app.
-	The app utilizes CSS Flexbox and/or Grid for page layout design.
-	When editing an item, the form is pre-filled with that item’s details.
-	Only the user who created a piece of data can see and interact with the UI for editing or deleting that data.
-	All images have alt text.
-	No text is placed on top of an image in a way that makes the text inaccessible.
-	All buttons are styled.
  
## Planning:
I first designed my wireframes:

![Wireframe_image](images/Project%204%20-%20Huubub%20Wireframes.png)
 
I created wireframes to visualise the different user flows and routes within the app, which helped streamline the development process.

I also made a clear distinction between routes accessible to all users and those that require authentication, ensuring it was easy to understand how the experience changes when a user is signed in or not.

To support the back-end structure, I created a Database Design (DBD) diagram that maps out the relationships between the models in my application:

(DBD diagram)
 
In this diagram, I’ve outlined several key one-to-many relationships: Users to Events, Users to Questions and Events to Questions.

### Pseudocode:
Here is the pseudocode for my formatForDateTimeLocal function in my EventUpdate.jsx, which I would like to showcase:
<pre>
Function formatForDatetimeLocal(datetimeString):
Convert the input string into a Date object
Get the user's timezone offset (in minutes) and convert it to milliseconds
Subtract the offset from the original date to get local time
Convert the adjusted date to ISO format
Return only the date and time portion (up to minutes)
  </pre>
And here is the pseudocode for my formatDurationForInput function in my EventUpdate.jsx, which I would like to showcase:
<pre>
Function formatDurationForInput(durationString):
Split the input string by the ":" character into hours and minutes
Ensure both hours and minutes are two digits by padding with a leading zero if needed
Recombine and return the formatted duration string in "HH:MM" format
</pre>
Writing these functions out in pseudocode served as a step-by-step guide before implementing the actual code, helping me stay organised and avoid missing any critical stages in the sign-in process.

## Code / Build Process:
### Backend:
I began by creating a Trello board to organise my workflow and break the project down into manageable stages. I split the development process into distinct phases, such as planning, backend setup, frontend layout, integration, testing, and deployment. Each phase was represented as a list in Trello, with individual tasks added as cards so I could monitor my progress. This helped me stay focused, prioritise effectively, and ensure nothing was overlooked during the build.

I began by setting up the backend, including configuring the Django environment and initializing environment variables. Next, I created a base User model, which I planned to update later as I defined relationships with other models. I then built the Events model and started working on the corresponding views and URLs, testing these routes using Postman to ensure functionality. Afterwards, I implemented the Event serializers and finalised the process by thoroughly testing all routes again in Postman. Following that, I began the same build process for the Questions model and updated the User model to include relationships with both the Question and Event models.

To finalise the backend, I created the Profile serializer and updated the User views to include a dedicated route for accessing user profile data. I then set up the Cloudinary configuration to handle image uploads efficiently. Finally, I seeded the database with initial data for Users, Events, and Questions, leveraging ChatGPT to generate realistic and varied sample content to support development and testing.

### Frontend:
To begin the frontend development, I set up the React environment, the environment variables (I configured the API URL to point to my local backend during development, as the project had not yet been deployed) and configured the BrowserRouter in main.jsx to enable client-side routing throughout the application. With the routing foundation in place, I moved on to building the core structure of the app by creating all the React components for each page and feature. I ensured the routes were properly connected and tested them in the browser to confirm they rendered as expected.

Once the components were functional, I implemented a basic Navbar component to help me move through the pages. I then tested all navigation links to verify that routing between pages worked smoothly via the BrowserRouter.

Following this, I focused on the authentication logic. I created an auth.js utility to manage the itinero-token for handling user sessions and authentication state. In parallel, I set up the UserContext using React’s Context API to provide global access to user data across the app. This ensured that user information and authentication status could be easily accessed and managed throughout all components, laying a solid foundation for secure and dynamic user interactions.

Next, I moved on to creating dedicated service files, auth.js, events.js, profile.js, and questions.js to handle all HTTP requests between the frontend and backend. I used Axios-based functions to perform the full range of HTTP methods: GET, POST, PUT, PATCH, and DELETE. This approach allowed me to centralize and organize the logic for interacting with the API, leading to a cleaner codebase and easier maintenance. After implementing the services, I thoroughly tested each function using Postman to validate request/response accuracy, and also tested them directly within the browser to confirm smooth integration with the frontend.

I created a custom hook, useFetch.js, to centralise and simplify data fetching across the app. It abstracts common logic using useEffect and useState, handling loading, errors, and response parsing. The hook accepts a service function, optional arguments, and an initial state, returning data, isLoading, and error. This improved code readability, reduced boilerplate, and ensured consistent data-fetching behaviour throughout the app.

I then focused on building all the required React components, including implementing user authentication for protected routes and integrating authentication logic into the navigation bar. I also added a sign-out route and thoroughly tested the entire flow, including error handling, browser rendering, and API authentication, using both the browser and Postman to ensure reliability and response handling.

To finalise my project, I focused on styling the website using CSS. I drew inspiration for the design from Eventbrite, adopting a clean orange-and-white theme as the foundation. I began with the sign-in page, using its form layout as a consistent design pattern across all other forms. As I developed the styling further, my goal was to create an interface that felt inviting and fun, yet streamlined and professional, reflecting the nature of Hubbub as an events platform that balances excitement with usability.

### Code Showcase:
This function handles file uploads via a Django REST request. It checks for a file under the given pathname, uploads it to Cloudinary if present, and returns the request data with the file URL included. If the field is already a string or no file is uploaded, it returns the data unchanged:
<pre>
from cloudinary.uploader import upload

def handle_file_upload(request, pathname = 'image'):
    data = request.data.dict()
    if isinstance(data.get(pathname), str):
        return request.data
    elif request.FILES.get(pathname, None):
        res = upload(request.FILES[pathname])
        return { **data, pathname: res['secure_url'] }
    else:
        return request.data
  </pre>
This code snippet shows a token management utility for handling JWTs using localStorage. It includes functions to set, retrieve, and remove a token, as well as decode it to extract the user information if the token is still valid. If the token has expired, it’s automatically removed. This approach helps manage client-side authentication cleanly and consistently:
<pre>
const tokenName = 'itinero-token'

export const setToken = (token) => {
    if (!token) {
        console.log('No token provided to setToken()')
        return
    }
    localStorage.setItem(tokenName, token)
    console.log('Token stored:', token)
}

export const getToken = () => {
    return localStorage.getItem(tokenName)
}

export const removeToken = () => {
    localStorage.removeItem(tokenName)
}

export const getUserFromToken = () => {
    const token = getToken()
    if (!token) return null

    const payload = token.split('.')[1]
    const payloadAsObject = JSON.parse(atob(payload))

    const timeNow = Date.now() / 1000
    const expTime = payloadAsObject.exp
    if (expTime < timeNow) {
        removeToken()
        console.log('Token removed')
        return null
    }
    return payloadAsObject.user
}
  </pre>
This code snippet shows a function in my EventShow.jsx that formats a time duration string (in "HH:MM" format) into a more readable form. It parses the input, converts the hours and minutes to integers, and returns a human-friendly string like "2 hours 15 minutes" or "45 minutes". If the duration is "00:00", it returns "0 minutes":
<pre>
function formatDuration(durationStr) {
        const [hours, minutes] = durationStr.split(':')
        const h = parseInt(hours, 10)
        const m = parseInt(minutes, 10)

        let result = ''
        if (h > 0) result += `${h} hour${h > 1 ? 's' : ''} `
        if (m > 0) result += `${m} minute${m > 1 ? 's' : ''}`
        return result.trim() || '0 minutes'
    }
  </pre>
## Challenges:
In all my previous projects, I used Express for the backend, which gave me complete control over the server setup and routing. However, for this final project, we were required to learn Python and use Django as the backend framework.

The main challenge was adapting to Django’s more opinionated structure, coming from Express, where everything is fully customizable; it was initially difficult to adjust to a framework that handles so much behind the scenes. I had to shift my mindset from building everything manually to learning and trusting the framework’s built-in features.

Over time, I came to appreciate Django’s design and actually began to prefer it. Once I got used to its flow, I found that it allowed me to write clean, structured, and more maintainable code, which made development faster and more organized overall.

Another challenge I faced was building the time formatter. Getting it to display durations in a readable format, like "2 hours 15 minutes", took a fair amount of trial and error, along with a lot of research to find the right approach. It was definitely frustrating at first, but as I got deeper into the problem-solving process, I started to enjoy the grind. Finally seeing it work exactly how I envisioned was a really rewarding moment.

One of the most challenging parts of the project was building the question section on the event show page. This feature took the longest to implement and required the most mental effort. I had to carefully plan how to use React’s state management to handle user interactions, display questions and responses correctly, and update the UI in real-time.

On top of that, setting up proper authorisation logic added another layer of complexity; only the event owner should be able to respond to questions, which meant making sure permissions were handled correctly both on the frontend and backend. It was a tough feature to get right, but also one of the most rewarding once everything worked as intended.

## Key Learnings:
-	Adapting to a New Backend Language & Framework
Transitioning from JavaScript and Express to Python and Django taught me how to quickly adapt to new technologies. I had to learn Django’s structure and routing, which differed greatly from Express’s flexibility and minimal setup.

-	Understanding Frontend–Backend Communication Differences
Unlike Express, where APIs are often built manually and structured however you like, Django offers a more opinionated, built-in approach to building APIs, especially when using Django REST Framework. I had to understand how Django handles serialization, views, and permissions differently, and how to adjust my frontend accordingly to handle responses and errors.

-	Working with useEffect for Asynchronous Logic
This project deepened my understanding of React's useEffect hook, especially for handling asynchronous API calls. I learned how to manage loading states and ensure that components only fetch or update data when needed, without causing unnecessary re-renders.

-	Deeper State Management in React
Implementing complex features like the Q & A section required thoughtful use of React’s state. I improved my ability to keep the frontend UI in sync with backend data and handle conditional rendering.
-	Frontend-Backend Integration
I built my knowledge base on how to securely pass tokens, handle user authentication, and enforce authorization rules, ensuring only certain users could perform specific actions like answering questions.

-	Problem Solving & Debugging
Features like the time formatter and file upload logic forced me to think critically and troubleshoot carefully. This project reminded me that problem-solving is a skill built through persistence and creativity.

-	User Experience & Design Thinking
Designing a clean interface helped me grow my understanding of how UI/UX decisions affect user engagement. I was able to create a layout that feels both professional and inviting.

## Future Improvements:
While thoroughly testing the application, I discovered a bug in the Q&A section on the event show page. When a user submits a new question, the question itself appears immediately in the UI, but the username of the question's author does not display in real time. The name only appears after refreshing the page.

Unfortunately, I didn’t have enough time before the deadline to fully resolve this, but here's how I would approach fixing it:
The issue occurs because the createQuestion response is used to update the local state, but that response does not include the fully populated owner object. To fix this, I would update the handleCreateQuestion function to re-fetch the questions from the backend after a successful submission, rather than simply appending the raw response to the existing state. That way, all questions would have complete data, including the author's username.

Another important improvement I would make is to make the web application mobile-friendly. Currently, the layout and styling are optimized for desktop use, but many people today use their phones or tablets to access applications or browse the web.

I would implement responsive design using CSS media queries or a CSS framework like Tailwind or Bootstrap. This would involve adjusting layout components (like forms, images, and buttons) to stack or resize appropriately on smaller screens, ensuring text remains readable and navigation runs smoothly. I’d also test touch interactions and spacing on different devices to create a professional mobile experience.

This enhancement would not only improve usability but also make the application feel polished, accessible and complete.
