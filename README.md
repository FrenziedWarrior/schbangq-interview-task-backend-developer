## SchbangQ - Backend Developer Position - Interview Task

### To-do list

The UI is Express serving EJS templates. After adding the book, you will be shown the result of the POST request being successful or error, kindly navigate back and refresh to see the table refresh. Can use React or Angular for this. Tried to follow the specification as close as possible.

- [x] Building a book directory and developing a REST API. endpoints in the directory using the following four methods – GET, POST, PUT, and DELETE
- [x] PATCH instead of PUT
- [x] Note: Book Schema should include { title, image, author, dateOfPublication, chapters (array), price }
- [x] GET – fetches the book details from the directory. This can include all the books or specific books by ID.
- [x] POST – adds a new book to the directory of books.
- [x] PATCH – updates any existing book in the directory.
- [x] DELETE – delete any existing book from the directory.
- [x] Login & Logout Authentication is required for Google Auth using JWT.
- [x] Use MongoDB database. Using a MongoDB Free Atlas Cluster.
- [x] Deploy code in Heroku and share the link (An environment variable set to locate MongoDB Atlas Cluster)
- [x] Also, deploy code in git and share the Repo Link (It's public now, will make it private, once the interview is done.)
- [x] Make a basic UI to add a new Book which has all the fields of Schema (using cookie scheme to manage JWT, but can convert to fully RESTful API by setting the Authorization header with Bearer token)
- [] (This condition can be added to the GET route for individual book) It should check conditionally for FIRSTBOOK as coupon code and the price should be discounted by 30%.
- [] (Profile information received from Google can be encrypted but secret will be hard-coded in source.) User Data should be stored in an encrypted format
- [] Project API should be testable in postman and share the Postman JSON file. (Can be tested using the JWT that is generated and cookie set)
- [] Also has added a coupon input field and Buy button. (optional)