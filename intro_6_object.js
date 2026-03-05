/*
object in javascript : key value pair, we use object to store data
to create object we use {} curly braces

in js we can create object directly without class

suppose a car is an object ..... key


*/


// Here's the complete guide on JS Objects — everything you need, nothing extra.

// Objects in JavaScript
// 🧠 Lame First
// An object is just a container that holds related information together. Instead of making 5 separate variables for one person, you pack it all in one box with labels.
// js// Without object — messy

const name1 = "Aman";
const age1 = 22;
const city1 = "Delhi";

// With object — clean
const user = {
  name: "Aman",
  age: 22,
  city: "Delhi"
};

// 1. How to Create Objects
// js// Way 1 — Object Literal (you'll use this 95% of the time)
const product = {
  name: "Phone",
  price: 15000,
  inStock: true
};

// Way 2 — new Object() (old way, avoid it)
const product = new Object();
product.name = "Phone";

// Way 3 — Constructor Function (for creating many similar objects)
function createUser(name, age) {
  return {
    name: name,
    age: age
  };
}
const user1 = createUser("Aman", 22);
const user2 = createUser("Neha", 19);

2. Access & Update Properties
jsconst user = {
  name: "Aman",
  age: 22,
  city: "Delhi"
};

// Dot notation — use this normally
console.log(user.name);   // "Aman"
console.log(user.age);    // 22

// Bracket notation — use when key is dynamic or has spaces
console.log(user["name"]); // "Aman"

const key = "city";
console.log(user[key]);    // "Delhi" — dot notation can't do this

// Updating
user.age = 23;
user["city"] = "Mumbai";

// Adding new property
user.email = "aman@gmail.com";

// Deleting
delete user.city;

console.log(user);
// { name: "Aman", age: 23, email: "aman@gmail.com" }
When to use bracket notation specifically:
jsconst field = "price";
const product = { price: 500 };

// This is where bracket shines — dynamic key
function getField(obj, field) {
  return obj[field]; // obj.field would literally look for key "field"
}
getField(product, "price"); // 500

3. Methods Inside Objects
A method is just a function that lives inside an object.
jsconst user = {
  name: "Aman",
  age: 22,

  // Method — function inside object
  greet: function() {
    return "Hi, I am " + this.name; // 'this' = the object itself
  },

  // Shorthand (ES6) — same thing, cleaner
  getAge() {
    return this.age;
  }
};

console.log(user.greet());  // "Hi, I am Aman"
console.log(user.getAge()); // 22
Real example you'll see in projects:
jsconst cart = {
  items: [],
  total: 0,

  addItem(product) {
    this.items.push(product);
    this.total += product.price;
  },

  removeItem(productName) {
    this.items = this.items.filter(item => item.name !== productName);
    this.total = this.items.reduce((sum, item) => sum + item.price, 0);
  },

  getTotal() {
    return `₹${this.total}`;
  }
};

cart.addItem({ name: "Phone", price: 15000 });
cart.addItem({ name: "Cover", price: 500 });
console.log(cart.getTotal()); // ₹15500

cart.removeItem("Cover");
console.log(cart.getTotal()); // ₹15000

4. Nested Objects
Objects inside objects — you'll see this with every API response ever.
jsconst user = {
  name: "Aman",
  age: 22,
  address: {           // nested object
    city: "Delhi",
    pincode: "110001",
    coords: {          // nested inside nested
      lat: 28.6,
      lng: 77.2
    }
  },
  skills: ["JS", "React", "Node"]  // array inside object
};

// Accessing nested
console.log(user.address.city);           // "Delhi"
console.log(user.address.coords.lat);     // 28.6
console.log(user.skills[0]);              // "JS"

// Updating nested
user.address.city = "Mumbai";
user.skills.push("Python");
Real API response shape you'll deal with in React:
jsconst apiResponse = {
  status: "success",
  data: {
    user: {
      id: 101,
      name: "Aman",
      orders: [
        { id: 1, product: "Phone",  amount: 15000 },
        { id: 2, product: "Watch",  amount: 8000  }
      ]
    }
  }
};

// How you'd access it
const userName   = apiResponse.data.user.name;
const firstOrder = apiResponse.data.user.orders[0].product;

console.log(userName);    // "Aman"
console.log(firstOrder);  // "Phone"

5. Two Things You'll Use Constantly
Destructuring — pull properties into variables cleanly:
jsconst user = { name: "Aman", age: 22, city: "Delhi" };

// Old way
const name = user.name;
const age  = user.age;

// Destructuring
const { name, age, city } = user;
console.log(name); // "Aman"

// With renaming
const { name: userName } = user;
console.log(userName); // "Aman"

// In function parameters (you'll see this in React constantly)
function showUser({ name, age }) {
  return `${name} is ${age} years old`;
}
showUser(user); // "Aman is 22 years old"
Spread operator — copy or merge objects:
jsconst user = { name: "Aman", age: 22 };

// Copy (doesn't affect original)
const updatedUser = { ...user, age: 23 };
console.log(updatedUser); // { name: "Aman", age: 23 }
console.log(user);        // { name: "Aman", age: 22 } — untouched

// Merge two objects
const defaults = { theme: "dark", lang: "en" };
const userPrefs = { lang: "hi", fontSize: 16 };

const settings = { ...defaults, ...userPrefs };
// { theme: "dark", lang: "hi", fontSize: 16 }
// userPrefs.lang overwrote defaults.lang

🎯 One Exercise to Lock All of This
js// Build this from scratch and write methods for it:

const student = {
  name: "Aman",
  marks: { math: 85, science: 90, english: 78 },
  attendance: 82,

  // Write these yourself:
  // getAverage()  → average of all marks
  // isEligible()  → attendance >= 75 AND average >= 60
  // getReport()   → returns a string summary
};

