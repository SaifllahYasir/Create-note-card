let addNote = document.querySelector("#add-note");
let formContainer = document.querySelector(".form-container");
let closeForm = document.querySelector(".closeForm");

const stack = document.querySelector(".stack");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");

const form = document.querySelector("form");

const imageUrlInput = form.querySelector(
  "input[placeholder='https://example.com/photo.jpg']"
);
const fullNameInput = form.querySelector(
  "input[placeholder='Enter full name']"
);
const homeTownInput = form.querySelector(
  "input[placeholder='Enter home town']"
);
const purposeInput = form.querySelector(
  "input[placeholder='e.g., Quick appointment note']"
);

const categoryRadios = form.querySelectorAll("input[name='category']");

const submitButton = form.querySelector(".submit-btn");

// ---- Save to Local Storage ----
function saveToLocalStorage(obj) {
  let oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  oldTasks.push(obj);
  localStorage.setItem("tasks", JSON.stringify(oldTasks));
}

// ---- Open/Close Form ----
addNote.addEventListener("click", function () {
  formContainer.style.display = "initial";
});

closeForm.addEventListener("click", function () {
  formContainer.style.display = "none";
});

// ---- Form Submit ----
form.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const imageUrl = imageUrlInput.value.trim();
  const fullName = fullNameInput.value.trim();
  const homeTown = homeTownInput.value.trim();
  const purpose = purposeInput.value.trim();

  let selected = false;
  categoryRadios.forEach(function (cat) {
    if (cat.checked) {
      selected = cat.value;
    }
  });

  if (!imageUrl) return alert("Please enter an Image URL.");
  if (!fullName) return alert("Please enter your Full Name.");
  if (!homeTown) return alert("Please enter your Home Town.");
  if (!purpose) return alert("Please enter the Purpose.");
  if (!selected) return alert("Please select a category");

  saveToLocalStorage({ imageUrl, fullName, purpose, homeTown, selected });

  form.reset();
  formContainer.style.display = "none";
  showCards();
  updateStack();
});

// ---- Render Cards ----
function showCards() {
  stack.innerHTML = "";

  let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  allTasks.forEach(function (task) {
    const card = document.createElement("div");
    card.classList.add("card");

    // Avatar image
    const avatar = document.createElement("img");
    avatar.src = task.imageUrl;
    avatar.alt = "profile";
    avatar.classList.add("avatar");
    card.appendChild(avatar);

    // Name
    const name = document.createElement("h2");
    name.textContent = task.fullName;
    card.appendChild(name);

    // Info: Home town
    const hometownInfo = document.createElement("div");
    hometownInfo.classList.add("info");
    hometownInfo.innerHTML = `<span>Home town</span><span>${task.homeTown}</span>`;
    card.appendChild(hometownInfo);

    // Info: Purpose
    const purposeInfo = document.createElement("div");
    purposeInfo.classList.add("info");
    purposeInfo.innerHTML = `<span>Purpose</span><span>${task.purpose}</span>`;
    card.appendChild(purposeInfo);

    // Buttons container
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.innerHTML = "📞 Call";

    const msgBtn = document.createElement("button");
    msgBtn.classList.add("msg");
    msgBtn.textContent = "Message";

    buttonsDiv.appendChild(callBtn);
    buttonsDiv.appendChild(msgBtn);

    card.appendChild(buttonsDiv);

    stack.appendChild(card);
  });
}

// ---- Stack Animation ----
function updateStack() {
  const cards = document.querySelectorAll(".stack .card");

  cards.forEach((card, i) => {
    if (i < 3) {
      card.style.zIndex = 3 - i;
      card.style.transform = `translateY(${i * 10}px) scale(${1 - i * 0.02})`;
      card.style.opacity = `${1 - i * 0.2}`;
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// ---- Card Navigation ----
upBtn.addEventListener("click", function () {
  let lastChild = stack.lastElementChild;
  if (lastChild) {
    stack.insertBefore(lastChild, stack.firstElementChild);
    updateStack();
  }
});

downBtn.addEventListener("click", function () {
  const firstChild = stack.firstElementChild;
  if (firstChild) {
    stack.appendChild(firstChild);
    updateStack();
  }
});
document.querySelectorAll(".dot").forEach(dot => {
  dot.addEventListener("click", () => {
    const color = window.getComputedStyle(dot).backgroundColor;
    if (stack.firstElementChild) {
      stack.firstElementChild.style.background = color;
      stack.firstElementChild.style.color = "#fff"; // contrast
    }
  });
});

// ---- Initial Load ----
showCards();
updateStack();



// let addNote = document.querySelector("#add-note");
// let formContainer = document.querySelector(".form-container");
// let closeForm = document.querySelector(".closeForm");

// const stack = document.querySelector(".stack");
// const upBtn = document.querySelector("#upBtn");
// const downBtn = document.querySelector("#downBtn");

// const form = document.querySelector("form");

// // ---------------------- Local Storage Helpers ----------------------
// function getNotes() {
//   return JSON.parse(localStorage.getItem("notes")) || [];
// }

// function saveNotes(notes) {
//   localStorage.setItem("notes", JSON.stringify(notes));
// }

// // ---------------------- Render Notes ----------------------
// function renderNotes() {
//   stack.innerHTML = "";
//   let notes = getNotes();
//   notes.forEach(note => {
//     const card = document.createElement("div");
//     card.classList.add("card");

//     card.innerHTML = `
//       <img src="${note.imageUrl}" class="avatar" />
//       <h2>${note.fullName}</h2>
//       <div class="info"><strong>Home Town:</strong> ${note.homeTown}</div>
//       <div class="info"><strong>Category:</strong> ${note.category}</div>
//       <div class="info"><strong>Purpose:</strong> ${note.purpose}</div>
//       <div class="buttons">
//           <button class="call">Call</button>
//           <button class="msg">Message</button>
//       </div>
//     `;

//     stack.appendChild(card);
//   });
// }

// // ---------------------- Show form ----------------------
// addNote.addEventListener("click", () => {
//   formContainer.style.display = "block";
// });

// // ---------------------- Close form ----------------------
// closeForm.addEventListener("click", () => {
//   formContainer.style.display = "none";
// });

// // ---------------------- Create new note ----------------------
// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const imageUrl = form.querySelector("input[placeholder='https://example.com/photo.jpg']").value;
//   const fullName = form.querySelector("input[placeholder='Enter full name']").value;
//   const homeTown = form.querySelector("input[placeholder='Enter home town']").value;
//   const purpose = form.querySelector("input[placeholder='e.g., Quick appointment note']").value;
//   const category = form.querySelector("input[name='category']:checked").value;

//   // Save to localStorage
//   let notes = getNotes();
//   notes.unshift({ imageUrl, fullName, homeTown, purpose, category }); // newest first
//   saveNotes(notes);

//   renderNotes();
//   form.reset();
//   formContainer.style.display = "none";
// });

// // ---------------------- Reorder Notes ----------------------
// downBtn.addEventListener("click", () => {
//   let notes = getNotes();
//   if (notes.length > 0) {
//     let first = notes.shift();
//     notes.push(first);
//     saveNotes(notes);
//     renderNotes();
//   }
// });

// upBtn.addEventListener("click", () => {
//   let notes = getNotes();
//   if (notes.length > 0) {
//     let last = notes.pop();
//     notes.unshift(last);
//     saveNotes(notes);
//     renderNotes();
//   }
// });

// // ---------------------- Change note color ----------------------
// document.querySelectorAll(".dot").forEach(dot => {
//   dot.addEventListener("click", () => {
//     const color = window.getComputedStyle(dot).backgroundColor;
//     if (stack.firstElementChild) {
//       stack.firstElementChild.style.background = color;
//       stack.firstElementChild.style.color = "#fff"; // contrast
//     }
//   });
// });

// // ---------------------- Load notes on page start ----------------------
// window.addEventListener("DOMContentLoaded", renderNotes);
