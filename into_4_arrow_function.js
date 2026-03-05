// # Arrow Functions — Deep Dive

// ---

// ## 🧠 Lame Language First

// You know how in English you can say *"I am going to the store"* or just *"Going to store"* — same meaning, shorter sentence?

// Arrow functions are exactly that. A **shorter way to write functions.** But there's one superpower difference — they handle the word **`this`** differently. That's it. That's the whole story.

// ---

// ## 📚 Pro Language

// Arrow functions are **anonymous function expressions** introduced in ES6 with a concise `=>` syntax. The key technical difference from regular functions is that they have **no own `this` binding, no `arguments` object, and cannot be used as constructors**. They use **lexical `this`** — meaning `this` is inherited from the surrounding scope at the time of definition, not at the time of invocation.

// ---

// ## Part 1 — Syntax (Beginner)

// ### The transformation — same function, 4 ways to write it

// ```js
// Regular function (old way)
function add(a, b) {
  return a + b;
}

// Step 1 — make it anonymous
const add = function(a, b) {
  return a + b;
}

// Step 2 — add arrow, remove 'function' keyword
const add = (a, b) => {
  return a + b;
}

// Step 3 — one line? remove braces + return (implicit return)
const add = (a, b) => a + b;

console.log(add(2, 3)); // 5
// ```
// > 💬 **Lame:** Each step just removes unnecessary words.  
// > 🎓 **Pro:** The final form uses an **implicit return** — when the body is a single expression, the `return` keyword and curly braces are dropped.

// ---

// ### All syntax variations you'll see in real code

// ```js
// No parameters — empty parens required
const sayHi = () => "Hello!";

// One parameter — parens optional
const double = n => n * 2;
const double2 = (n) => n * 2; // same thing

// Multiple parameters — parens required
const add = (a, b) => a + b;

// Multiple lines — need braces + explicit return
const add = (a, b) => {
  const result = a + b;
  return result;
};

// Returning an object — wrap in () or JS thinks {} is a code block
const getUser = () => ({ name: "Aman", age: 22 });
//                     ↑ this bracket is important, don't forget
// ```

// ---

// ## Part 2 — The `this` Problem (Intermediate)

// This is where 90% of people get confused. Read this slowly.

// ---

// ### First, understand what `this` is

// ```js
// 'this' just means "who is calling me right now"

const user2 = {
  name: "Aman",
  greet: function() {
    console.log(this.name); // 'this' = user object
  }
}

user2.greet(); // "Aman" ✅
// ```
// > 💬 **Lame:** When `user` calls `greet`, `this` points back at `user`. Makes sense.  
// > 🎓 **Pro:** In a regular function, `this` is determined at **call time** — whoever calls the function becomes `this`.

// ---

// ### Now break it with arrow function

// ```js
const user = {
  name: "Aman",
  greet: () => {
    console.log(this.name); // undefined ❌ — why?
  }
}

user.greet(); // undefined
// ```
// > 💬 **Lame:** Arrow function doesn't care who's calling it. It looks outside the object for `this` instead.  
// > 🎓 **Pro:** Arrow functions use **lexical `this`** — `this` is captured from the **enclosing scope at definition time**, not from the caller. Here, the enclosing scope is the global scope, where `this.name` doesn't exist.

// ---

// ### The place where arrow function SAVES you

// ```js
// Problem with regular function inside setTimeout
const user3 = {
  name: "Aman",
  greet: function() {
    setTimeout(function() {
      console.log(this.name); // undefined ❌ — 'this' is now window/global
    }, 1000);
  }
}

// Fix with arrow function
const user4 = {
  name: "Aman",
  greet: function() {
    setTimeout(() => {
      console.log(this.name); // "Aman" ✅ — inherits 'this' from greet
    }, 1000);
  }
}

user4.greet();
// ```
// > 💬 **Lame:** The arrow function inside `setTimeout` "borrows" `this` from its parent `greet` function.  
// > 🎓 **Pro:** The arrow function closes over the `this` value of the enclosing `greet` method, solving the classic **`this` context loss** problem in async callbacks.

// ---

// ## Part 3 — What Arrow Functions DON'T Have (Pro)

// These are things regular functions have that arrow functions simply don't:

// ### 1. No `arguments` object
// ```js
// Regular function has 'arguments'
function showArgs() {
  console.log(arguments); // [1, 2, 3]
}
showArgs(1, 2, 3);

// Arrow function does NOT
const showArgs = () => {
  console.log(arguments); // ❌ ReferenceError
}
showArgs(1, 2, 3);

// Fix — use rest params instead
const showArgs = (...args) => {
  console.log(args); // [1, 2, 3] ✅
}
// ```

// ---

// ### 2. Cannot be used as a Constructor
// ```js
// Regular function — can construct objects
function Person(name) {
  this.name = name;
}
const p2 = new Person("Aman"); // ✅ works

// Arrow function — cannot
const Person = (name) => {
  this.name = name;
}
const p = new Person("Aman"); // ❌ TypeError: Person is not a constructor
// ```

// ---

// ### 3. No own `prototype`
// ```js
function Regular() {}
console.log(Regular.prototype); // {constructor: f} ✅

const Arrow = () => {}
console.log(Arrow.prototype); // undefined ❌
// ```

// ---

// ## Part 4 — Real World Usage (Pro)

// ### In array methods (you'll write this daily)
// ```js
const users = [
  { name: "Aman", age: 22 },
  { name: "Neha", age: 17 },
  { name: "Raj",  age: 25 }
];

// Get names of users above 18
const adults = users
  .filter(user => user.age >= 18)
  .map(user => user.name);

console.log(adults); // ["Aman", "Raj"]
// ```

// ### In React (preview of what's coming)
// ```js
// Every handler in React is an arrow function
const Button = () => {
  const handleClick = () => {
    console.log("clicked!"); // 'this' issue never comes up
  }

  return <button onClick={handleClick}>Click</button>
}
// ```

// ---

// ## ⚡ The Decision Chart — When to use which

// ```
// Writing a method inside an object?
// → Use regular function (needs its own 'this')

// Writing a callback / array method?
// → Use arrow function (cleaner, no 'this' issues)

// Need 'arguments' object?
// → Use regular function

// Writing in React components?
// → Almost always arrow functions
// ```

// ---

// ## 🎯 The One Exercise To Nail This

// ```js
// Predict the output of each BEFORE running it
// Then run it and understand why

const obj = {
  val: 10,

  a: function()  { console.log(this.val) },
  b: ()          => { console.log(this.val) },
  c: function()  { setTimeout(function()  { console.log(this.val) }, 100) },
  d: function()  { setTimeout(()          => { console.log(this.val) }, 100) },
};

obj.a(); // ?
obj.b(); // ?
obj.c(); // ?
obj.d(); // ?
// ```
// **Answers:** `10`, `undefined`, `undefined`, `10`

// If you can explain **why** each one outputs what it does — you own arrow functions. Move to HOFs.