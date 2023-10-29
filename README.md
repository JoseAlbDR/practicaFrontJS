# WallaFake Web Application

This is the README.md file for the WallaFake web application repository on GitHub. In this document, you will find an overview of the different HTML pages and their functionalities within the web application.

## Sign Up Page (signin.html)

The `signin.html` page is the registration page of the WallaFake web application. It allows new users to create an account. Here are the main features of this page:

- Users can create a new account by providing a username, password, and repeating the password.
- Validation is in place for the username (minimum length of 3 characters) and password (minimum length of 6 characters) fields.
- After filling in the details, users can click the "Submit" button to create their account.
- If already a member, there is an option to navigate to the login page.
- Once registered it will redirect to login.html page

## Login Page (login.html)

The `login.html` page is the login page of the WallaFake web application. It allows users to log in to their accounts. Here are the main features of this page:

- Users can enter their username and password.
- Validation is in place for the username (minimum length of 3 characters) and password (minimum length of 6 characters) fields.
- After filling in the details, users can click the "Submit" button to log in.
- If not a member, there are options to navigate to the registration page or return to the home page.
- Once logged in successfully it will redirect to index.hmtl page

## Home Page (index.html)

The `index.html` page is the home page of the WallaFake web application. This page displays a list of products. Here are the main features of this page:

- Users can search for products using a search form.
- The product list is displayed with details about each product, including the name, image, description, price, and type (for sale or for search).
- Pagination is available for navigating through the product list.
- Users can click on a product to view more details.
- The menu provides navigation options.

## Create Product Page (create-product.html)

The `create-product.html` page allows users to add new products to the WallaFake platform. Here are the main features of this page:

- Users can set an url as a image for the product, if not a valid url or there are some error a default image will be loaded.
- Users can provide the name, description, price, and type (for sale or for search) of the product.
- Validation is in place to ensure that all required fields are filled.
- Users can click the "Submit" button to add the product to the platform.
- There is a "Back" button to return to the previous page.

## Product Detail Page (product-detail.html)

The `product-detail.html` page displays detailed information about a specific product. Here are the main features of this page:

- Users can view the product's image, name, description, price, and type.
- If the user created the product there will be a button to Update the product and another to Delete the product.
- There is a "Back" button to return to the previous page for all users.
- Update button will redirect user to update-product.html
- Delete button will show a confirmation modal.

## Update Product Page (update-product.html)

The `update-product.html` page allows users to edit and update the information of a product. Here are the main features of this page:

- Users can modify the image, name, description, price, and type (for sale or for search) of the product.
- Validation is in place to ensure that all required fields are filled.
- Users can click the "Submit" button to save the changes to the product.
- There is a "Back" button to return to the previous page.

## Reusable Components

### Notifications
Used to show notifications or give feedback about what is happening to the user, like error messages or success messages, (user created, user logged in, product created...)

### Spinner
Used to show a spinner element while pages are loading (making asyncronous operations).

### Menu
Menu items are conditionally rendered based on user authentication, if a user is correctly logged in or not.

### Modal
Confirmation modal that show a message when a product is about to being deleted.

## Sample Data
A db.json file is provided with sample data to be used along with sparrest.js backend.

