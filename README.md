# Observable Exercises

## Exercise 1

Create a registration form to validates its inputs. The form should have an email and password field. You should create a stream that represents the email field and the password field, a stream that represents whether the email is valid, a stream that represents whether the password is valid (longer than 8 characters), and a stream that represents whether the whole form is valid. (Hint: combine the two validation streams.)

You can serve the files in `ex1` by running `npm run start:ex1`.

Once those are working, use those streams to display an error message next to the invalid fields, and display a success message if both fields are valid.

Write unit test all your validation functions. `npm run test:ex1` will run your tests in `test.spec.js`.
