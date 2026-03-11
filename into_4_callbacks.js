// ============================================================
//              CALLBACKS — COMPLETE REFERENCE
//         Save this. Come back to it. It will always help.
// ============================================================




// ============================================================
// CORE CONCEPT — What is a Callback?
//
// You go to a restaurant. You place your order.
// The waiter says "I'll call you when it's ready."
// You don't stand at the counter staring.
// You go sit down, talk to friends, do other things.
// When the food is ready — the waiter calls you back.
//
// That "call you back" = Callback.
//
// You gave the waiter a set of instructions (your function)
// "when food is ready, bring it to table 5."
// The waiter decides WHEN to run those instructions.
//
// Pro definition:
// A callback function is a function passed as an argument
// to another function, which is then invoked inside that
// function at a specific time — either immediately (synchronous)
// or later (asynchronous).
// ============================================================




// ============================================================
// PART 1 — You Already Know Callbacks
//
// map, filter, forEach — all take callbacks.
// Those are SYNCHRONOUS callbacks — they run immediately.
// But the callbacks that define real project work are
// ASYNCHRONOUS callbacks. That's what this topic is really about.
// ============================================================


const nums = [1, 2, 3];
nums.forEach(n => console.log(n));
//           ↑ this arrow function IS the callback




// ============================================================
// PART 2 — Why Async Even Exists (The Core Problem)
//
// JavaScript is SINGLE THREADED.
// It can only do ONE thing at a time.
//
// If JS just waited for slow tasks (API calls, DB queries),
// your entire page would freeze. That's called BLOCKING.
//
// Blocking     = "I won't do anything else until this is done"
// Non-blocking = "Start this, I'll do other stuff, tell me when done"
//
// Callbacks solve this — you say:
// "start the task, and when it's done — run THIS function"
// ============================================================




// ============================================================
// PART 3 — Synchronous vs Asynchronous Callbacks
//
// Synchronous Callback  — runs immediately, right now
// Asynchronous Callback — runs LATER, after some time or event
// ============================================================


// SYNCHRONOUS CALLBACKS — run right now, block nothing (they're instant)

function greetAll(names, formatter) {
  return names.map(formatter);
}

const result = greetAll(["Aman", "Neha", "Raj"], name => `Hello, ${name}!`);
console.log(result);
// ["Hello, Aman!", "Hello, Neha!", "Hello, Raj!"]


// sort uses a callback to decide order — runs immediately
const marks = [85, 42, 91, 38, 76];

marks.sort((a, b) => a - b);
console.log(marks); // [38, 42, 76, 85, 91]

marks.sort((a, b) => b - a);
console.log(marks); // [91, 85, 76, 42, 38]


// Building your own synchronous HOF with callback
function transform(data, callback) {
  return callback(data);
}

transform(5,       n => n * 2);            // 10
transform("aman",  s => s.toUpperCase());  // "AMAN"
transform([1,2,3], arr => arr.reverse());  // [3,2,1]


// ASYNCHRONOUS CALLBACK — runs LATER
// setTimeout registers the callback, JS moves on, comes back when timer fires
// JS doesn't stop and wait — it keeps going

console.log("1 - Start");

setTimeout(function() {
  console.log("2 - I ran after 2 seconds");
}, 2000);

console.log("3 - End");

// Output ORDER:
// 1 - Start                    <- runs immediately
// 3 - End                      <- runs immediately (JS doesn't wait)
// 2 - I ran after 2 seconds    <- runs after 2 seconds




// ============================================================
// PART 4 — Simulating Real Async (Before We Touch Servers)
//
// In real projects you call APIs, read databases, read files.
// All of these take time.
// For now, we simulate that delay with setTimeout.
// ============================================================


// Simulating a database call that takes 1 second
function getUserFromDB(userId, callback) {
  console.log("Fetching user from DB...");

  setTimeout(function() {
    const user = { id: userId, name: "Aman", age: 22 };
    callback(user);
  }, 1000);
}

getUserFromDB(1, function(user) {
  console.log("Got user:", user.name);
});

console.log("This runs immediately, before user arrives");


// Simulating fetching a list of posts
function getPostsFromDB(userId, callback) {
  setTimeout(function() {
    const posts = [
      { id: 1, title: "Learning JS"    },
      { id: 2, title: "HOFs are great" },
      { id: 3, title: "Callbacks next" }
    ];
    callback(posts);
  }, 1500);
}

getPostsFromDB(1, function(posts) {
  posts.forEach(post => console.log(post.title));
});


// Simulating an order placement
function placeOrder(item, callback) {
  console.log(`Placing order for ${item}...`);

  setTimeout(function() {
    const order = { orderId: "ORD123", item, status: "confirmed" };
    callback(order);
  }, 2000);
}

placeOrder("Phone", function(order) {
  console.log(`Order ${order.orderId} confirmed for ${order.item}`);
});




// ============================================================
// PART 5 — Error Handling in Callbacks
//
// In real projects things fail — API times out, user doesn't
// exist, server crashes. You need to handle errors.
//
// The standard pattern (used everywhere in Node.js) is called
// ERROR-FIRST CALLBACK.
//
// Rule:
//   First argument  = always the error
//   Second argument = always the data
//   If error exists -> handle it, stop
//   If no error     -> use the data
// ============================================================


function getUserFromDBSafe(userId, callback) {
  setTimeout(function() {
    if (userId <= 0) {
      callback("Error: Invalid user ID", null);
    } else {
      const user = { id: userId, name: "Aman" };
      callback(null, user);
    }
  }, 1000);
}

getUserFromDBSafe(1, function(err, user) {
  if (err) {
    console.log("Something went wrong:", err);
    return;
  }
  console.log("Got user:", user.name);
});

getUserFromDBSafe(-1, function(err, user) {
  if (err) {
    console.log("Something went wrong:", err);
    return;
  }
  console.log("Got user:", user.name);
});


// Login validation with error-first pattern
function loginUser(email, password, callback) {
  setTimeout(function() {
    if (email !== "aman@gmail.com") {
      callback("Error: User not found", null);
    } else if (password !== "1234") {
      callback("Error: Wrong password", null);
    } else {
      callback(null, { email, name: "Aman", token: "abc123" });
    }
  }, 1000);
}

loginUser("aman@gmail.com", "1234", function(err, user) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Logged in as:", user.name);
});

loginUser("wrong@gmail.com", "1234", function(err, user) {
  if (err) {
    console.log(err); // "Error: User not found"
    return;
  }
  console.log("Logged in as:", user.name);
});




// ============================================================
// PART 6 — Callback Hell (Feel The Pain)
//
// When you do multiple async operations one after another,
// each step needing the result of the previous — this happens.
//
// Real scenario: Login -> Get Profile -> Get Posts -> Get Comments
//
// Problems with callback hell:
//   1. Hard to read     — logic buried inside nested levels
//   2. Hard to debug    — error at level 4? good luck tracing it
//   3. Hard to maintain — one more step = another nesting level
//   4. Error handling   — repeat if(err) at every single level
//   5. Hard to reuse    — all logic is tangled, can't extract pieces
//
// This is called the "Pyramid of Doom" — look at the indentation shape.
// This exact pain is WHY Promises were invented.
// ============================================================


// Simulate all 4 async operations
function loginUserCB(email, callback) {
  setTimeout(() => callback(null, { id: 1, email }), 1000);
}

function getUserProfile(userId, callback) {
  setTimeout(() => callback(null, { userId, username: "aman_dev" }), 1000);
}

function getUserPosts(username, callback) {
  setTimeout(() => callback(null, [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" }
  ]), 1000);
}

function getPostComments(postId, callback) {
  setTimeout(() => callback(null, [
    { id: 1, text: "Great post!"  },
    { id: 2, text: "Very helpful" }
  ]), 1000);
}


// CALLBACK HELL — each callback nested inside the previous one
loginUserCB("aman@gmail.com", function(err, user) {
  if (err) { console.log(err); return; }

  getUserProfile(user.id, function(err, profile) {
    if (err) { console.log(err); return; }

    getUserPosts(profile.username, function(err, posts) {
      if (err) { console.log(err); return; }

      getPostComments(posts[0].id, function(err, comments) {
        if (err) { console.log(err); return; }

        console.log(comments);
        // you are 4 levels deep
        // indentation going to the right forever
        // adding one more step = another nesting level
        // this is the pyramid of doom
      });
    });
  });
});




// ============================================================
// PART 7 — The Event Loop (How Async Actually Works)
//
// JavaScript Runtime has 3 key parts:
//
// 1. Call Stack     — runs your code, one thing at a time
// 2. Web APIs       — browser handles slow tasks (setTimeout, fetch)
// 3. Callback Queue — finished callbacks wait here to run
//
// Event Loop — watches the call stack and callback queue.
//              When stack is empty, it moves next callback from
//              queue to stack. This is how "run later" works.
//
// +------------------+     +------------------+
// |   Call Stack     |     |    Web APIs      |
// |  (runs code)     |     |  setTimeout      |
// |  one at a time   |     |  fetch           |
// +--------+---------+     +--------+---------+
//          |      +-----------------v------+
//          |      |    Callback Queue      |
//          |      |  (waiting callbacks)   |
//          |      +-----------------+------+
//          +----------+    +--------+
//                     |    |
//               +-----v----v------+
//               |   Event Loop   |
//               |  pushes waiting|
//               |  callbacks when|
//               |  stack is empty|
//               +----------------+
// ============================================================


// Trace this EXACTLY to understand the event loop
console.log("A"); // 1. goes to call stack, runs, prints A

setTimeout(() => {
  console.log("B"); // sent to Web API -> callback queue -> runs last
}, 0); // even 0ms — still goes through the queue!

console.log("C"); // 2. goes to call stack, runs, prints C

// call stack is now empty
// event loop moves "B" callback from queue to stack

// Output: A, C, B
// NOT A, B, C — even with 0ms timeout!
// This proves JS never blocks — async always runs after sync




// ============================================================
// PART 8 — Real Event Listener Callbacks
//
// Every event listener IS a callback.
// "When this button is clicked — run THIS function"
// You'll use these the moment you touch the DOM.
// ============================================================


// Basic click callback
document.getElementById("btn").addEventListener("click", function(event) {
  console.log("Button clicked!");
  console.log("Clicked element:", event.target);
});

// Arrow function version — same thing
document.getElementById("btn").addEventListener("click", (event) => {
  console.log("Button clicked!");
});


// Multiple events on the same element
const input = document.getElementById("search");

input.addEventListener("keyup", function(e) {
  console.log("You typed:", e.target.value);
});

input.addEventListener("focus", function() {
  console.log("Input is focused");
});

input.addEventListener("blur", function() {
  console.log("Input lost focus");
});


// Reusing the same callback for multiple elements
function handleClick(event) {
  console.log("Clicked:", event.target.id);
}

document.getElementById("btn1").addEventListener("click", handleClick);
document.getElementById("btn2").addEventListener("click", handleClick);
document.getElementById("btn3").addEventListener("click", handleClick);




// ============================================================
// QUICK REFERENCE
//
//  Synchronous Callback  ->  runs immediately (map, filter, sort)
//  Asynchronous Callback ->  runs later (setTimeout, events, API calls)
//  Error-first Pattern   ->  callback(err, data) — always check err first
//  Callback Hell         ->  nested callbacks for sequential async = ugly
//  Event Loop            ->  how JS handles "run this later" without blocking
// ============================================================




// ============================================================
// PRACTICE EXERCISE — Build This Yourself
//
// 1. makeGetUser(id, callback)
//    - If id is valid (> 0), return user object after 1 second
//    - If invalid, return an error
//
// 2. makeGetPosts(userId, callback)
//    - Return array of 2 fake posts after 1 second
//
// 3. makeGetComments(postId, callback)
//    - Return array of 2 fake comments after 1 second
//
// Then chain all 3 using nested callbacks.
// Then look at the pyramid you created.
// Feel the pain.
// THAT feeling is why you will love Promises.
// ============================================================