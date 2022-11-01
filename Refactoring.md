# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

Made code more concise by removing conditional check for a truthy candidate value, and stringifying the event and partition key within the event conditional. This eliminates the number of crypto method invocations to allow for a shorter and more readable function.

Lines 7 to 17 were grouped to determine the value of the candidate variable, regardless of whether the event had a partitionKey or not. This grouping of logic makes the code more ingestible for future iterations.

Line 16's return statement returns out "0" to indicate that there was no event provided.

I also noticed that partitionKeys with a length < 256 were not being hashed, so I moved the crypto method invocations down to line 19 in order to hash any truthy candidate.
