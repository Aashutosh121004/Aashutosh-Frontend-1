// ============================================================
//         HIGHER ORDER FUNCTIONS — COMPLETE REFERENCE
//         Save this. Come back to it. It will always help.
// ============================================================




// ============================================================
// CORE CONCEPT — What even is a Higher Order Function?
//
// A Higher-Order Function is a function that either:
//   1. Accepts another function as an argument, OR
//   2. Returns a function as its output, OR
//   3. Both
//
// This is possible because in JavaScript, functions are
// "first-class values" — meaning a function can be stored
// in a variable, passed around, and returned, just like
// a number or a string.
// ============================================================


// A number stored in a variable
const age = 22;

// A string stored in a variable
const name = "Aman";

// A function stored in a variable — same concept
const sayHi = function() {
  console.log("Hi!");
};

// Just like you pass a number into a function...
function double(n) {
  return n * 2;
}
double(5);

// ...you can pass a FUNCTION into a function
function runSomething(fn) {
  fn();
}
runSomething(sayHi);




// ============================================================
// PART 1 — BUILDING YOUR OWN HOF FROM SCRATCH
//
// Before touching built-in HOFs like map/filter/reduce,
// understand what a HOF actually is by building one.
//
// Problem:
//   - A function hardcoded to do ONE thing is not flexible
//   - Solution: pass the "what to do" part as a function argument
//   - Now one function can do ANYTHING depending on what you pass
// ============================================================


// Step 1 — hardcoded, not flexible at all
function doubleFive() {
  return 5 * 2;
}

// Step 2 — better, but only doubles
function doubleNumber(n) {
  return n * 2;
}

// Step 3 — best: pass BOTH the number AND the operation
// applyOperation is now a Higher-Order Function
function applyOperation(n, operation) {
  return operation(n);
}

applyOperation(5, n => n * 2);    // 10
applyOperation(5, n => n * 3);    // 15
applyOperation(5, n => n + 100);  // 105
applyOperation(5, n => n ** 2);   // 25


// HOF that runs a function multiple times
// 'fn' is the function being passed in
// 'times' controls how many times it runs
function runTimes(fn, times) {
  for (let i = 0; i < times; i++) {
    fn(i);
  }
}

runTimes(i => console.log(`Hello number ${i}`), 3);
runTimes(i => console.log(i * i), 4);


// HOF that runs a function only if a condition is true
// Useful for guarding logic — only execute if allowed
function runIf(condition, fn) {
  if (condition) {
    fn();
  }
}

const isLoggedIn = true;
runIf(isLoggedIn,  () => console.log("Welcome back!"));
runIf(!isLoggedIn, () => console.log("Please login"));


// HOF that RETURNS a function (Function Factory)
// A factory creates specialized functions based on input
// The returned function "remembers" the outer variable — this is a closure
function makeValidator(minLength) {
  return function(password) {
    return password.length >= minLength;
  };
}

const weakValidator   = makeValidator(4);
const normalValidator = makeValidator(8);
const strongValidator = makeValidator(16);

weakValidator("hi");            // false
weakValidator("pass");          // true
normalValidator("pass");        // false
normalValidator("mypassword");  // true
strongValidator("mypassword");  // false




// ============================================================
// PART 2 — forEach
//
// The simplest built-in HOF.
// It loops through every item and runs your function on each one.
//
// Key rule: forEach ALWAYS returns undefined.
// Use it when you want to DO something with each item,
// NOT when you want to collect or transform results.
// ============================================================


const fruits = ["apple", "banana", "mango"];

// Old way — for loop
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// forEach way — same result, cleaner
fruits.forEach(fruit => console.log(fruit));


// forEach gives you the index too if you need it
const friends = ["Aman", "Neha", "Raj"];

friends.forEach((friend, index) => {
  console.log(`${index + 1}. ${friend}`);
});


// The critical thing forEach CANNOT do — collect results
// return inside forEach does nothing, result will be undefined
const numbers = [1, 2, 3];

const result = numbers.forEach(n => n * 2);
console.log(result); // undefined — this is WHY map exists




// ============================================================
// PART 3 — map
//
// map loops through every item just like forEach,
// BUT it collects what you return and gives back a NEW array.
//
// Key rules:
//   - Input array length === Output array length (always same)
//   - Original array is NEVER changed (immutable)
//   - Whatever you return from callback becomes the new item
//
// Mental model:
//   [1, 2, 3, 4]  →  run ×2 on each  →  [2, 4, 6, 8]
//   same length in, same length out, transformed values
// ============================================================


const nums = [1, 2, 3, 4, 5];

const doubled  = nums.map(n => n * 2);
const squared  = nums.map(n => n ** 2);
const asString = nums.map(n => `Number ${n}`);

console.log(doubled);   // [2, 4, 6, 8, 10]
console.log(squared);   // [1, 4, 9, 16, 25]
console.log(asString);  // ["Number 1", "Number 2", ...]
console.log(nums);      // [1, 2, 3, 4, 5] — original untouched


// Transforming an array of objects — most common real use case
// You'll do this every single day in React
const users = [
  { firstName: "Aman",  lastName: "Sharma", age: 22 },
  { firstName: "Neha",  lastName: "Gupta",  age: 17 },
  { firstName: "Raj",   lastName: "Verma",  age: 25 }
];

// Pull out just full names
const fullNames = users.map(user => `${user.firstName} ${user.lastName}`);
console.log(fullNames); // ["Aman Sharma", "Neha Gupta", "Raj Verma"]

// Add a new field to every object without touching the original
// Spread operator (...user) copies all existing fields
// then we add isAdult on top
const withAdultStatus = users.map(user => ({
  ...user,
  isAdult: user.age >= 18
}));
console.log(withAdultStatus);


// Real pricing example — apply discount to all products
const products = [
  { name: "Phone",  price: 20000 },
  { name: "Laptop", price: 60000 },
  { name: "Watch",  price: 10000 }
];

const discounted = products.map(p => ({
  name: p.name,
  originalPrice: p.price,
  discountedPrice: p.price * 0.9
}));
console.log(discounted);


// In React — this is literally how you render lists
// map returns an array of HTML strings or JSX elements
const productCards = products.map(p =>
  `<div class="card">
     <h2>${p.name}</h2>
     <p>₹${p.price}</p>
   </div>`
);
console.log(productCards);




// ============================================================
// PART 4 — filter
//
// filter asks a YES/NO question about every item.
//   YES (true)  → item is kept
//   NO  (false) → item is removed
//
// Key rules:
//   - Returns a NEW array (never mutates original)
//   - Output array can be shorter than input
//   - Callback MUST return true or false (or truthy/falsy)
//
// Mental model:
//   [1, 2, 3, 4, 5]  →  keep evens?  →  [2, 4]
//   bouncer at a club — only let in who passes the check
// ============================================================


const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens  = allNumbers.filter(n => n % 2 === 0);
const odds   = allNumbers.filter(n => n % 2 !== 0);
const bigOnes = allNumbers.filter(n => n > 5);

console.log(evens);   // [2, 4, 6, 8, 10]
console.log(odds);    // [1, 3, 5, 7, 9]
console.log(bigOnes); // [6, 7, 8, 9, 10]


// Filter on objects — most common real use case
const students = [
  { name: "Aman",  marks: 85, passed: true  },
  { name: "Neha",  marks: 42, passed: false },
  { name: "Raj",   marks: 91, passed: true  },
  { name: "Priya", marks: 38, passed: false },
  { name: "Aryan", marks: 76, passed: true  }
];

const passed  = students.filter(s => s.passed);
const failed  = students.filter(s => !s.passed);
const toppers = students.filter(s => s.marks >= 80);

console.log(passed);   // Aman, Raj, Aryan
console.log(failed);   // Neha, Priya
console.log(toppers);  // Aman(85), Raj(91)


// Deleting an item — THIS IS THE EXACT REACT PATTERN
// In React, you never use splice. You always use filter.
// filter(item => item.id !== deletedId) removes that one item
const todos = [
  { id: 1, task: "Learn JS"       },
  { id: 2, task: "Build project"  },
  { id: 3, task: "Sleep"          },
  { id: 4, task: "Exercise"       }
];

const afterDelete = todos.filter(todo => todo.id !== 3);
console.log(afterDelete); // id 1, 2, 4 remain. id 3 is gone.


// Search/filter functionality — like a search bar
const allProducts = [
  { name: "Phone",   price: 15000, inStock: true,  category: "electronics" },
  { name: "Shirt",   price: 800,   inStock: false, category: "clothing"    },
  { name: "Laptop",  price: 55000, inStock: true,  category: "electronics" },
  { name: "Shoes",   price: 3000,  inStock: true,  category: "clothing"    },
  { name: "Earbuds", price: 2000,  inStock: false, category: "electronics" }
];

const searchQuery = "e";
const searchResults = allProducts.filter(p =>
  p.name.toLowerCase().includes(searchQuery)
);
console.log(searchResults); // Phone, Earbuds (both contain 'e')


// Multiple conditions — like a real filter panel on an ecommerce site
const filteredProducts = allProducts.filter(p =>
  p.inStock === true &&
  p.category === "electronics" &&
  p.price < 20000
);
console.log(filteredProducts); // Phone only




// ============================================================
// PART 5 — reduce
//
// reduce collapses an entire array into ONE single value.
// That value can be a number, string, object, or even an array.
//
// It has 4 parts:
//   1. accumulator (acc) — the running result, builds up each step
//   2. currentItem       — the item being processed right now
//   3. index             — position of current item (optional)
//   4. initialValue      — what acc starts as (ALWAYS provide this)
//
// Mental model:
//   Like counting money one note at a time.
//   Start with ₹0. Pick up each note. Add to hand. End = total.
//   Your hand = accumulator. Each note = current item.
//
// The shape of initialValue determines the shape of your output:
//   start with 0   → output is a number
//   start with {}  → output is an object
//   start with []  → output is an array
// ============================================================


const moneyNotes = [10, 20, 30, 40];

// Step by step:
// acc starts at 0
// Step 1: acc = 0  + 10 = 10
// Step 2: acc = 10 + 20 = 30
// Step 3: acc = 30 + 30 = 60
// Step 4: acc = 60 + 40 = 100
const total = moneyNotes.reduce((acc, n) => acc + n, 0);
console.log(total); // 100


// More number operations using reduce
const moreNumbers = [5, 10, 15, 20, 25];

const sum     = moreNumbers.reduce((acc, n) => acc + n, 0);
const product = moreNumbers.reduce((acc, n) => acc * n, 1);
const max     = moreNumbers.reduce((acc, n) => n > acc ? n : acc, moreNumbers[0]);
const countBig = moreNumbers.reduce((acc, n) => n > 10 ? acc + 1 : acc, 0);

console.log(sum);       // 75
console.log(product);   // 375000
console.log(max);       // 25
console.log(countBig);  // 3 (15, 20, 25 are above 10)


// Reduce to an OBJECT — counting occurrences
// initialValue is {} so output is an object
const votes = ["Aman", "Neha", "Aman", "Raj", "Neha", "Aman"];

const voteCount = votes.reduce((acc, name) => {
  acc[name] = (acc[name] || 0) + 1;
  return acc;
}, {});

console.log(voteCount); // { Aman: 3, Neha: 2, Raj: 1 }


// Grouping data with reduce — very common real-world pattern
const people = [
  { name: "Aman",  city: "Delhi"  },
  { name: "Neha",  city: "Mumbai" },
  { name: "Raj",   city: "Delhi"  },
  { name: "Priya", city: "Mumbai" },
  { name: "Aryan", city: "Pune"   }
];

const groupedByCity = people.reduce((acc, person) => {
  const city = person.city;
  if (!acc[city]) {
    acc[city] = [];
  }
  acc[city].push(person.name);
  return acc;
}, {});

console.log(groupedByCity);
// { Delhi: ["Aman","Raj"], Mumbai: ["Neha","Priya"], Pune: ["Aryan"] }


// Shopping cart total — this is a real project use case
const cart = [
  { name: "Phone",   price: 15000, qty: 1 },
  { name: "Cover",   price: 500,   qty: 2 },
  { name: "Charger", price: 800,   qty: 3 }
];

const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
console.log("Cart Total: ₹" + cartTotal); // ₹18400


// Full bill object using reduce — acc starts as an object
const bill = cart.reduce((acc, item) => {
  const itemTotal = item.price * item.qty;
  acc.items.push(`${item.name} x${item.qty} = ₹${itemTotal}`);
  acc.total += itemTotal;
  return acc;
}, { items: [], total: 0 });

console.log(bill);
// {
//   items: ["Phone x1 = ₹15000", "Cover x2 = ₹1000", "Charger x3 = ₹2400"],
//   total: 18400
// }




// ============================================================
// PART 6 — CHAINING (The Real Power Move)
//
// You can connect map, filter, reduce one after another.
// Output of one becomes input of the next.
// This is called a pipeline.
//
// Flow:
//   Original Data
//       ↓
//     filter  →  remove what you don't want
//       ↓
//      map    →  transform what's left
//       ↓
//     reduce  →  collapse into final answer
// ============================================================


const chainNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Sum of squares of even numbers
const chainResult = chainNumbers
  .filter(n => n % 2 === 0)       // [2, 4, 6, 8, 10]
  .map(n => n ** 2)                // [4, 16, 36, 64, 100]
  .reduce((acc, n) => acc + n, 0); // 220

console.log(chainResult); // 220


// Total revenue from delivered orders only
const orders = [
  { product: "Phone",   amount: 15000, status: "delivered" },
  { product: "Shirt",   amount: 800,   status: "cancelled"  },
  { product: "Laptop",  amount: 55000, status: "delivered"  },
  { product: "Earbuds", amount: 2000,  status: "returned"   },
  { product: "Watch",   amount: 8000,  status: "delivered"  }
];

const revenue = orders
  .filter(o => o.status === "delivered")   // Phone, Laptop, Watch
  .map(o => o.amount)                      // [15000, 55000, 8000]
  .reduce((total, amt) => total + amt, 0); // 78000

console.log("Revenue: ₹" + revenue); // ₹78000


// Average marks of passed students
const allStudents = [
  { name: "Aman",  marks: 85, passed: true  },
  { name: "Neha",  marks: 42, passed: false },
  { name: "Raj",   marks: 91, passed: true  },
  { name: "Priya", marks: 38, passed: false },
  { name: "Aryan", marks: 76, passed: true  }
];

// The 4th argument in reduce callback is the array being reduced
// Here arr = [85, 91, 76] — the filtered+mapped array
// Dividing each mark by arr.length before adding gives the average directly
const average = allStudents
  .filter(s => s.passed)
  .map(s => s.marks)
  .reduce((sum, marks, _, arr) => sum + marks / arr.length, 0);

console.log(average.toFixed(2)); // 84.00


// Real ecommerce filter + display pipeline
const shopProducts = [
  { name: "Phone",   price: 15000, rating: 4.5, inStock: true  },
  { name: "Tablet",  price: 25000, rating: 3.8, inStock: true  },
  { name: "Laptop",  price: 55000, rating: 4.8, inStock: false },
  { name: "Watch",   price: 8000,  rating: 4.2, inStock: true  },
  { name: "Earbuds", price: 2000,  rating: 4.0, inStock: true  }
];

// User wants: in stock + under ₹20000 + rating above 4.0
const filteredShop = shopProducts
  .filter(p => p.inStock)
  .filter(p => p.price <= 20000)
  .filter(p => p.rating >= 4.0)
  .map(p => `${p.name} - ₹${p.price} ⭐${p.rating}`);

console.log(filteredShop);
// ["Phone - ₹15000 ⭐4.5", "Watch - ₹8000 ⭐4.2", "Earbuds - ₹2000 ⭐4.0"]




// ============================================================
// PART 7 — BUILD map, filter, reduce YOURSELF
//
// This is the best way to prove you understand how they work.
// If you can rebuild them, you truly own this concept.
// We're adding them to Array.prototype so they work on any array.
// (In production, never modify built-in prototypes — this is learning only)
// ============================================================


Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

Array.prototype.myFilter = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.myReduce = function(callback, initialValue) {
  let acc = initialValue;
  for (let i = 0; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};

const testNums = [1, 2, 3, 4, 5];
console.log(testNums.myMap(n => n * 2));           // [2, 4, 6, 8, 10]
console.log(testNums.myFilter(n => n > 3));        // [4, 5]
console.log(testNums.myReduce((a, b) => a + b, 0));// 15




// ============================================================
// QUICK REFERENCE — When to use what
//
//  Just want to loop and do something?
//  → forEach  (no return value needed)
//
//  Want to TRANSFORM every item into something else?
//  → map  (same length in, same length out)
//
//  Want to REMOVE some items based on a condition?
//  → filter  (shorter array out)
//
//  Want ONE final value from the whole array?
//  → reduce  (one number / object / string out)
//
//  Want to do multiple of the above?
//  → chain them:  filter → map → reduce
// ============================================================




// ============================================================
// PRACTICE EXERCISES — Solve these without looking above
//
//   const students = [
//     { name: "Aman",  marks: 85, passed: true,  city: "Delhi"  },
//     { name: "Neha",  marks: 42, passed: false, city: "Mumbai" },
//     { name: "Raj",   marks: 91, passed: true,  city: "Delhi"  },
//     { name: "Priya", marks: 38, passed: false, city: "Mumbai" },
//     { name: "Aryan", marks: 76, passed: true,  city: "Delhi"  }
//   ];
//
//   Exercise 1 (Easy):
//   Get names of all passed students
//   Expected: ["Aman", "Raj", "Aryan"]
//
//   Exercise 2 (Medium):
//   Get total marks scored by failed students
//   Expected: 80  (42 + 38)
//
//   Exercise 3 (Hard):
//   Group students by city
//   Expected: { Delhi: ["Aman","Raj","Aryan"], Mumbai: ["Neha","Priya"] }
// ============================================================