// ============================================================
//              PROMISES — COMPLETE REFERENCE
//         Save this. Come back to it. It will always help.
// ============================================================




// ============================================================
// CORE CONCEPT — What is a Promise?
//
// You order food on Zomato. The app gives you a receipt instantly.
// That receipt is a PROMISE — "I promise your food will arrive."
//
// Right now the receipt is in a PENDING state.
// Two things can happen:
//   Food arrives ✅  → promise is FULFILLED
//   Restaurant cancels ❌ → promise is REJECTED
//
// While waiting — you don't freeze.
// You watch Netflix, scroll Instagram.
// The app notifies you when something happens.
//
// That receipt = Promise object in JavaScript.
//
// Technical definition:
// A Promise is an object representing the eventual completion
// or failure of an asynchronous operation.
// It acts as a proxy for a value that isn't known yet.
//
// A Promise is always in one of three states:
//   Pending   — initial state, operation not complete yet
//   Fulfilled — operation completed successfully, value available
//   Rejected  — operation failed, error available
//
// Once fulfilled or rejected — it is SETTLED
// and its state NEVER changes again.
// ============================================================




// ============================================================
// PART 1 — WHY PROMISES EXIST (The Direct Link to Callbacks)
//
// You wrote callback hell in the last topic.
// Promises solve that exact problem.
// Same logic — flat structure — one error handler.
// That's the entire reason Promises exist.
// ============================================================


// CALLBACK HELL — what you just learned
// loginUser("aman@gmail.com", function(err, user) {
//   if (err) { console.log(err); return; }
//   getUserProfile(user.id, function(err, profile) {
//     if (err) { console.log(err); return; }
//     getUserPosts(profile.username, function(err, posts) {
//       if (err) { console.log(err); return; }
//       getPostComments(posts[0].id, function(err, comments) {
//         if (err) { console.log(err); return; }
//         console.log(comments); // 4 levels deep, pyramid of doom
//       });
//     });
//   });
// });


// THE SAME THING with Promises — completely flat
// loginUser("aman@gmail.com")
//   .then(user     => getUserProfile(user.id))
//   .then(profile  => getUserPosts(profile.username))
//   .then(posts    => getPostComments(posts[0].id))
//   .then(comments => console.log(comments))
//   .catch(err     => console.log(err)); // ONE catch handles ALL errors




// ============================================================
// PART 2 — CREATING A PROMISE FROM SCRATCH
//
// new Promise takes one function — called the "executor"
// executor receives two arguments:
//   resolve → call this when everything worked — fulfills the promise
//   reject  → call this when something failed  — rejects the promise
//
// The executor function runs SYNCHRONOUSLY
// but resolve/reject schedule .then()/.catch() callbacks
// ASYNCHRONOUSLY via the microtask queue —
// which has higher priority than the callback queue.
// ============================================================


// A promise that always succeeds
// .then() runs when promise is fulfilled
// .catch() runs when promise is rejected
const myPromise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve("Data is ready!");
  }, 2000);
});

myPromise
  .then(data => console.log(data))
  .catch(err => console.log(err));


// A promise that fails
const failingPromise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    reject("Something went wrong!");
  }, 2000);
});

failingPromise
  .then(data => console.log(data))
  .catch(err => console.log("Error:", err));


// Promise with a condition — success or failure depending on input
function getUserFromDB(userId) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (userId <= 0) {
        reject("Error: Invalid user ID");
      } else {
        const user = { id: userId, name: "Aman", age: 22 };
        resolve(user);
      }
    }, 1000);
  });
}

getUserFromDB(1)
  .then(user => console.log("Got user:", user.name))
  .catch(err => console.log(err));

getUserFromDB(-1)
  .then(user => console.log("Got user:", user.name))
  .catch(err => console.log(err));




// ============================================================
// PART 3 — then, catch, finally
//
// These three methods are how you CONSUME a Promise.
//
// .then()    → handles success, returns a new promise (enables chaining)
// .catch()   → handles failure from ANY step above it
// .finally() → always runs no matter what — perfect for cleanup
// ============================================================


// .then() receives the resolved value
// it also RETURNS a new promise — this is what enables chaining
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ id, name: "Aman" }), 1000);
  });
}

getUser(1)
  .then(function(user) {
    console.log(user.name);
    return user.name;
  })
  .then(function(name) {
    console.log("Name is:", name);
  });


// .catch() receives the rejected value (the error)
// ONE catch at the end handles errors from ALL previous .then() steps
// if ANY step fails — execution jumps straight to .catch()
function getUserWithError(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject("Invalid ID");
      else resolve({ id, name: "Aman" });
    }, 1000);
  });
}

getUserWithError(-1)
  .then(user  => console.log(user.name))
  .then(name  => console.log("Name:", name))
  .catch(err  => console.log("Error:", err));


// .finally() always runs — success OR failure
// Perfect for cleanup: hide loading spinner, close DB connection
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data!"), 1000);
  });
}

console.log("Loading...");

fetchData()
  .then(data  => console.log("Got:", data))
  .catch(err  => console.log("Error:", err))
  .finally(() => console.log("Done loading"));


// Real use case for finally — show/hide a loading spinner
// function loadUserData(id) {
//   showSpinner();
//   getUser(id)
//     .then(user => displayUser(user))
//     .catch(err => showError(err))
//     .finally(() => hideSpinner()); // hide no matter what happens
// }




// ============================================================
// PART 4 — PROMISE CHAINING (The Real Power)
//
// Each .then() returns a new Promise —
// so you can chain them FLAT instead of nesting.
//
// .then() can return:
//   a plain value   → passed directly to next .then()
//   a new Promise   → next .then() waits for it to resolve
//
// No nesting. No pyramid. No callback hell.
// ============================================================


function getUserC(id) {
  return new Promise(resolve =>
    setTimeout(() => resolve({ id, name: "Aman" }), 1000)
  );
}

function getPosts(userId) {
  return new Promise(resolve =>
    setTimeout(() => resolve([
      { id: 1, title: "Post One" },
      { id: 2, title: "Post Two" }
    ]), 1000)
  );
}

function getComments(postId) {
  return new Promise(resolve =>
    setTimeout(() => resolve([
      { id: 1, text: "Awesome!"     },
      { id: 2, text: "Very helpful" }
    ]), 1000)
  );
}

// Flat chain — each .then() passes result to the next
getUserC(1)
  .then(user     => getPosts(user.id))
  .then(posts    => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err     => console.log(err));


// Transforming data in chain
// .then() doesn't have to return a Promise
// returning a plain value passes it directly to next .then()
getUserC(1)
  .then(user => {
    console.log("Step 1 - Got user:", user.name);
    return user.id;
  })
  .then(userId => {
    console.log("Step 2 - User ID is:", userId);
    return getPosts(userId);
  })
  .then(posts => {
    console.log("Step 3 - Got posts:", posts.length);
    return posts[0];
  })
  .then(firstPost => {
    console.log("Step 4 - First post:", firstPost.title);
  })
  .catch(err => console.log("Error at some step:", err));


// Real login flow — same as callback hell version but completely flat
function loginUser(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email !== "aman@gmail.com") reject("User not found");
      else resolve({ id: 1, email });
    }, 1000);
  });
}

function getUserProfile(userId) {
  return new Promise(resolve =>
    setTimeout(() => resolve({ userId, username: "aman_dev" }), 1000)
  );
}

function getUserPosts(username) {
  return new Promise(resolve =>
    setTimeout(() => resolve([
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" }
    ]), 1000)
  );
}

function getPostComments(postId) {
  return new Promise(resolve =>
    setTimeout(() => resolve([
      { id: 1, text: "Great!"   },
      { id: 2, text: "Helpful"  }
    ]), 1000)
  );
}

loginUser("aman@gmail.com")
  .then(user     => getUserProfile(user.id))
  .then(profile  => getUserPosts(profile.username))
  .then(posts    => getPostComments(posts[0].id))
  .then(comments => console.log("Final result:", comments))
  .catch(err     => console.log("Something failed:", err));




// ============================================================
// PART 5 — ERROR HANDLING IN CHAINS
//
// If any step throws or rejects —
// execution JUMPS to .catch(), all steps in between are SKIPPED.
//
// You can also throw inside .then() — it behaves like reject.
//
// .catch() can RECOVER and let the chain continue
// by returning a fallback value instead of re-throwing.
// ============================================================


// Any step failing jumps straight to .catch()
function step1() { return Promise.resolve("Step 1 done"); }
function step2() { return Promise.reject("Step 2 failed"); }
function step3() { return Promise.resolve("Step 3 done"); }

step1()
  .then(res => { console.log(res); return step2(); })
  .then(res => { console.log(res); return step3(); })
  .then(res => { console.log(res); })
  .catch(err => console.log("Caught:", err));


// Throwing inside .then() — behaves exactly like reject
getUser(1)
  .then(user => {
    if (!user.isAdmin) {
      throw new Error("Access denied — not an admin");
    }
    return user;
  })
  .then(user => console.log("Admin access granted"))
  .catch(err => console.log(err.message));


// .catch() recovering and continuing the chain
// returning a value from .catch() lets the chain continue
getUserFromDB(-1)
  .then(user  => console.log("Got user:", user))
  .catch(err  => {
    console.log("Error caught, using default user");
    return { id: 0, name: "Guest" };
  })
  .then(user  => console.log("Continuing with:", user.name));




// ============================================================
// PART 6 — Promise.all, Promise.race, Promise.allSettled
//
// These are for running MULTIPLE promises at the same time.
//
// Promise.all        → parallel, fails fast if ANY one fails
// Promise.race       → first settled wins (resolve or reject)
// Promise.allSettled → parallel, NEVER fails, shows all results
// ============================================================


// --- Promise.all ---
// Runs all promises IN PARALLEL — much faster than one by one
// Resolves when ALL succeed
// Rejects immediately if ANY ONE fails
// Result order matches INPUT order — not which finished first

const p1 = new Promise(resolve => setTimeout(() => resolve("User data"),    1000));
const p2 = new Promise(resolve => setTimeout(() => resolve("Posts data"),   2000));
const p3 = new Promise(resolve => setTimeout(() => resolve("Friends data"), 1500));

Promise.all([p1, p2, p3])
  .then(results => {
    console.log(results);
  })
  .catch(err => console.log("One failed:", err));


// Real use case — loading a dashboard with parallel requests
// All 3 can be fetched at the same time — no need to wait for each
// function loadDashboard(userId) {
//   const userPromise    = getUser(userId);
//   const postsPromise   = getPosts(userId);
//   const friendsPromise = getFriends(userId);
//
//   Promise.all([userPromise, postsPromise, friendsPromise])
//     .then(([user, posts, friends]) => {
//       console.log("User:",    user.name);
//       console.log("Posts:",   posts.length);
//       console.log("Friends:", friends.length);
//     })
//     .catch(err => console.log("Dashboard failed to load:", err));
// }


// Promise.all FAILS FAST — one failure rejects everything
const pa1 = Promise.resolve("Success 1");
const pa2 = Promise.reject("Failed!");
const pa3 = Promise.resolve("Success 3");

Promise.all([pa1, pa2, pa3])
  .then(results => console.log(results))
  .catch(err    => console.log(err));


// --- Promise.race ---
// Resolves or rejects with whichever promise settles FIRST
// Like a race — whoever finishes first, wins

const fast = new Promise(resolve => setTimeout(() => resolve("Fast server"),  500));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow server"), 3000));

Promise.race([fast, slow])
  .then(result => console.log(result))
  .catch(err   => console.log(err));


// Real use case — timeout pattern
// If API takes more than 3 seconds, reject with timeout error
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject("Request timed out!"), ms)
  );
  return Promise.race([promise, timeout]);
}

const apiCall = new Promise(resolve =>
  setTimeout(() => resolve("API data"), 5000)
);

withTimeout(apiCall, 3000)
  .then(data => console.log(data))
  .catch(err => console.log("Error:", err));


// --- Promise.allSettled ---
// Unlike Promise.all — it NEVER rejects
// Waits for ALL promises to settle (succeed or fail)
// Gives you the result of EACH one individually
// status is either "fulfilled" or "rejected"

const ps1 = Promise.resolve("User loaded");
const ps2 = Promise.reject("Posts failed");
const ps3 = Promise.resolve("Friends loaded");

Promise.allSettled([ps1, ps2, ps3])
  .then(results => {
    results.forEach(result => {
      if (result.status === "fulfilled") {
        console.log("Success:", result.value);
      } else {
        console.log("Failed:", result.reason);
      }
    });
  });


// Real use case — sending notifications to multiple users
// You want to know which ones succeeded and which failed
// You don't want ONE failure to stop the rest
// const users = ["aman@gmail.com", "neha@gmail.com", "invalid-email"];
// const notifications = users.map(email => sendNotification(email));
// Promise.allSettled(notifications)
//   .then(results => {
//     const sent   = results.filter(r => r.status === "fulfilled").length;
//     const failed = results.filter(r => r.status === "rejected").length;
//     console.log(`Sent: ${sent}, Failed: ${failed}`);
//   });




// ============================================================
// PART 7 — PROMISE STATES VISUALIZED
//
//   new Promise(...)
//         │
//         ▼
//     PENDING ──────────────────────────┐
//         │                             │
//         │ resolve(value)              │ reject(error)
//         │                             │
//         ▼                             ▼
//     FULFILLED                     REJECTED
//         │                             │
//         ▼                             ▼
//      .then()                       .catch()
//   runs with value               runs with error
//         │                             │
//         └──────────┬──────────────────┘
//                    │
//                    ▼
//               .finally()
//            always runs here
//
// Once settled (fulfilled or rejected) —
// STATE NEVER CHANGES AGAIN.
// ============================================================




// ============================================================
// QUICK REFERENCE — Everything in one place
//
//   new Promise((resolve, reject) => {}) → create a promise
//   resolve(value)       → fulfill it    → .then() runs
//   reject(error)        → reject it     → .catch() runs
//   .then()              → handle success, returns new promise
//   .catch()             → handle failure from ANY step above
//   .finally()           → always runs — use for cleanup
//   Promise.all()        → parallel, fails fast if any fails
//   Promise.race()       → first settled wins
//   Promise.allSettled() → parallel, never fails, shows all results
// ============================================================




// ============================================================
// PRACTICE EXERCISE — Build this yourself
//
//   Build these 3 functions that return Promises:
//
//   1. getUser(id)
//      - resolves with { id, name: "Aman" } after 1 second
//      - rejects with "User not found" if id <= 0
//
//   2. getPosts(userId)
//      - resolves with array of 3 fake posts after 1 second
//
//   3. getComments(postId)
//      - resolves with array of 2 fake comments after 1 second
//
//   Then do all 3 tasks:
//
//   Task 1 — chain all 3 together
//            get comments for first post of user 1
//
//   Task 2 — try with user id -1
//            make sure .catch() handles it cleanly
//
//   Task 3 — load user, posts, and comments IN PARALLEL
//            using Promise.all
//
//   When you finish all 3 tasks —
//   rewrite the same code using async/await in the next topic.
//   You will feel the difference immediately.
// ============================================================