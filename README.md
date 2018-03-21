# Observable Exercises

## Exercise 1

Create a registration form to validates its inputs. The form should have an email and password field. You should create a stream that represents the email field (`email$`) and the password field (`password$`), a stream that represents whether the email is valid (`isEmailValid$`), a stream that represents whether the password is valid (`isPasswordValid$`), and a stream that represents whether the whole form is valid (`isFormValid$`).

You can serve the files in `ex1` by running `npm run start:ex1`.

Once those are working, use those streams to display an error message next to the invalid fields, and display a success message if both fields are valid.

Write unit test all your validation functions (**not** the streams themselves; testing streams will be discussed later). `npm run test:ex1` will run your tests in `test.spec.js`.

### Hints

<details>
1. Use `combine` to derive values from existing streams.
2. Use `#merge(Kefir.constant(initial))` to give you stream an initial value.
3. Use `#log` to test your streams.
</details>
