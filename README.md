# Getting Started with the app

Steps in order to run the app:

- Run the provided mock nodejs server locally
- Create a .env file in the project root containing the variable REACT_APP_SERVER_URL which has the address of the server assigned
- npm install
- npm start

# Things that can be improved but were not completed, due to time constraints

- Loading animation for operations
- Better UI
- Addition of images when creating/editing a book
- Removal of explicit 'any' types
- Better coordination of async operations: the 'add book' request is not completetd while the swr mutation is called so the changes won't instantly be reflected in the UI
