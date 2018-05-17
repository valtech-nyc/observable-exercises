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

Once you've considered the differences, add a submit button and create a stream that emits an event on every click (`submit$`). Then create a new stream (`login$`) that:

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

Instead of creating those streams from the DOM and using them directly, create a new function (`login`) that takes them in through the function parameter(s) and returns the stream we created in exercise 2. Using the [`chai-kefir`](https://github.com/kefirjs/chai-kefir) library, test that the behavior of this returned stream matches the expectation. Don't forget to check the negative cases!

If you want to do this in true TDD fashion, write your tests first, then the implementation. "Red, Green, Refactor" - only write one test at a time, do the bare minimum required to make the test pass, then write another test, make that one pass, and so on. Once you've got the behavior of the stream specced out in your tests and passing, you can clean up the implementation to make it as simple as possible.

## Exercise 4 - FlatMapping Streams

The last step is to save the data from the form to the back-end. This exercise will introduce 2 new concepts: the error channel & `#flatMap`.

We've worked with streams that currently only emit values and can potentially end, but streams can also emit errors. A very simple example might be the usage of JSON.parse:

```js
const parseJSON = str => Kefir.stream(emitter => {
    try {
        // Emits the parsed result as a value.
        emitter.value(JSON.parse(str));
    } catch(e) {
        // Emits the error if the parse fails.
        emitter.error(e);
    }

    // End the stream.
    emitter.end();
});
```

This could be used as follows:

```js
parseJSON(str).observe({
    value(result) {
        // do something w/ result
    },

    error(err) {
        // handle error
    },

    end() {
        // when the stream ends
        // for `parseJSON`, this happens immediately
    }
});
```

This allows us to handle expected errors within the stream.

**Regarding errors in Kefir**: Kefir disagrees with the approach RxJS takes to unexpected errors. RxJS works like promises do: any thrown errors are caught and pushed down the error path, providing harmony between the two paradigms. Kefir believes this makes it difficult to distinguish between expected errors (e.g. a failed AJAX request) and unexpected errors (e.g. accessing an object property you believe should be there), so thrown errors will crash the stream.

Once you've created a stream like the above, you can combine it with other streams using `#flatMap`. `#flatMap` is like map, taking each value from a stream, but the function provided should return a new Observable. This Observable will then get plugged into the resulting stream.

Write a function (`connectUser`) that accepts an object with a username & password and returns a new stream with `Kefir.stream`. This stream should check if the username & password are "correct" (choose those values yourself), and if they are, emit a "response" object (`{ success: true }`). If not, the stream should emit an error. `#flatMap` over the stream to start up a `Kefir.fromPoll` that emits the current time every second.

`#observe` this stream and write the current time to the DOM or display a login error if the login fails.
