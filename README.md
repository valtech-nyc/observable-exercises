# Observable Exercises

## Exercise 1 - Basic Streams

Create a registration form to validates its inputs. The form should have an email and password field. You should create a stream that represents the email field (`email$`) and the password field (`password$`), a stream (`isEmailValid$`) that represents whether the email is valid (find a regex on StackOverflow), a stream (`isPasswordValid$`) that represents whether the password is valid (longer than 8 characters), and a stream that represents whether the whole form is valid (`isFormValid$`).

You can serve the files in `ex1` by running `npm run start:ex1`.

Once those are working, use those streams to display an error message next to the invalid fields, and display a success message if both fields are valid.

Write unit test all your validation functions (**not** the streams themselves; testing streams will be discussed later). `npm run test:ex1` will run your tests in `test.spec.js`.

### Hints

<details>
<ol>
<li>Use <code>combine</code> to derive values from existing streams.</li>
<li>Use <code>#merge(Kefir.constant(initial))</code> to give your stream an initial value. (Sidenote: This because of the difference between Streams & Properties in Kefir. This will be covered later.)</li>
<li>Use <code>#log</code> to test your streams are working correctly.</li>
</ol>
</details>

## Exercise 2 - Combining Streams

After completing the form in Exercise 1, take a look at the base code in the `ex2` folder. What was done differently? Why? Do you think this is better or worse? Which is more readable to you?

Once you've considered the differences, add a submit button and create a stream that emits an event on every click (`submit$`). Then create a new stream that:

1. Emits the username & password every button click...
2. ... only when the form is valid...
3. ... and only once.

Once the stream emits a new value, disable all the inputs.

You can serve the files in `ex2` by running `npm run start:ex2`.

### Hints

<details>
<ol>
<li>Use <code>#sampledBy</code> to take a value from one stream when another emits a value.</li>
<li>Use <code>#filteredBy</code> to remove values from one stream based on the latest value from another stream.</li>
<li>Use <code>#take</code> to limit the number of values emitted from a stream.</li>
</ol>
</details>

## Exercise 3 - Testing Streams

Now that we've built a complex stream for our form, it's time to test it. Start by asking yourself this question:

> Which streams are the result of external inputs?

Instead of creating those streams from the DOM and using them directly, create a new function that takes them in through the function parameter(s) and returns the stream we created in exercise 2. Using the [`chai-kefir`](https://github.com/kefirjs/chai-kefir) library, test that the behavior of this returned stream matches the expectation. Don't forget to check the negative cases!

If you want to do this in true TDD fashion, write your tests first, then the implementation. "Red, Green, Refactor" - only write one test at a time, do the bare minimum required to make the test pass, then write another test, make that one pass, and so on. Once you've got the behavior of the stream specced out in your tests and passing, you can clean up the implementation to make it as simple as possible.
