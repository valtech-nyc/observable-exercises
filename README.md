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

## Exercise 2

Building on the registration form you created in Exercise 1, add a submit button and create a stream that emits an event on every click (`submit$`). Then create a new stream that:

1. Emits a new value every button click...
2. ... only when the form is valid...
3. ... and only once.

Once the stream emits a new value, disable all the inputs.

### Hints

<details>
1. Use `#sampledBy` to take a value from one stream when another emits a value.
2. Use `#filteredBy` to remove values from one stream based on the latest value from another stream.
3. Use `#take` to limit the number of values emitted from a stream.
</details>
