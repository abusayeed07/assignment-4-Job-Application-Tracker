# Questions and Answers


### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

## Answer:

## getElementById()

- Selects one element
- Uses id
- Returns a single element

## getElementsByClassName()

- Selects all elements with that class
- Returns an HTMLCollection
- It is live (updates automatically)

## querySelector()

- Selects the first matching element
- Uses CSS selector (id, class, tag, etc.)
- Returns one element

## querySelectorAll()

- Selects all matching elements
- Uses CSS selector
- Returns a NodeList (not live)


## 2. How do you create and insert a new element into the DOM?

## Answer:

## Step 1: Create the element

Use:
`document.createElement()`

Example:
We create a new `div` or `p` element.

## Step 2: Add text/content

We can add text using:

`element.innerText`

`element.textContent`


## Step 3: Insert into the DOM

Using one of these methods:

`appendChild()` → adds at the end

`append()` → adds at the end (modern)

## 3. What is Event Bubbling? And how does it work?

## Answer:

Event Bubbling is when an event starts from the clicked element and then moves upward to its parent elements.

It works like a bubble in water — it goes up

## How it Works

Example:

HTML:
```html
<div id="parent" style="padding:20px; border:2px solid blue;">
  Parent Div
  <button id="child">Click Me</button>
</div>
```
JavaScript:
```javascript
document.getElementById("child").addEventListener("click", () => {
  alert("Button clicked!");
});

document.getElementById("parent").addEventListener("click", () => {
  alert("Parent clicked!");
});
```

### What happens when you click the button?

1. Button click event runs → shows Button clicked!
2. Then the Parent Div event runs → shows Parent clicked!

✅ The event bubbles from child to parent automatically.


## 4. What is Event Delegation in JavaScript? Why is it useful?

## Answer:

Event Delegation is a technique in JavaScript where you attach one event listener to a parent element to handle events on its child elements instead of attaching individual listeners to each child.

## How It Works

HTML
```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```
### Without delegation:
We would need to add a click listener to every `<li>`:

JavaScript
```javascript
document.querySelectorAll("li").forEach(li => {
  li.addEventListener("click", () => {
    alert("You clicked " + li.innerText);
  });
});
```
## With Event Delegation:
JavaScript
```
document.getElementById("list").addEventListener("click", (event) => {
  if(event.target.tagName === "LI") {
    alert("You clicked: " + event.target.innerText);
  }
});
```

- event.target tells us which child was clicked.
- Even if new `<li>` items are added later, this still works!

## 5. What is the difference between preventDefault() and stopPropagation() methods?

## Answer:

| Aspect | `preventDefault()` | `stopPropagation()` |
|--------|-------------------|---------------------|
| **What it stops** | Browser's default action | Event bubbling/capturing |
| **Event flow** | Event continues to propagate | Event stops propagating |
| **Use case** | Override browser behavior | Prevent parent handlers from firing |
| **Can both be used?** | ✅ Yes | ✅ Yes |
