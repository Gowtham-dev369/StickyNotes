const addNote = document.querySelector(".add-a-note");
const popup = document.querySelector(".popup-block");
const btn = document.getElementById("bx-x");
const popupTitle = document.querySelector("header h1");
const addbtn = document.querySelector(".addbtn");
const optionbtn = document.querySelector(".bx-dots-horizontal-rounded");
const option = document.querySelector(".options");
const NOTE = document.querySelector("#NOTE");
const titlee = document.querySelector(".title");
const descc = document.querySelector("#description");
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let update = false;
let id;

// Open New Note Dialog
addNote.addEventListener("click", () => {
  popup.classList.add("show");
  titlee.value = "";
  descc.value = "";
  addbtn.innerText = "Add Note";
  popupTitle.innerText = "Add a Note";
});

// close btn for new note 
btn.addEventListener("click", () => {
  popup.classList.remove("show");
});


// Adding to localStorage 
addbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titlee.value;
  let noteDesc = descc.value;
  if (noteTitle || noteDesc) {
    let noteInfo = {
      title: noteTitle,
      desc: `${noteDesc}`,
      date: Date.now(),
    };
    if (!update) {
      notes.push(noteInfo);
    } else {
      notes[id] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  titlee.value = "";
  descc.value = "";
  popup.classList.remove("show");
  showNotes();
});

// Show Edit or delete option
function showMenu(ele) {
  ele.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != ele) {
      ele.parentElement.classList.remove("show");
    }
  });
}
// Update function
function updateNote(index, tit = "", desccc = "") {
  update = true;
  id = index;
  addNote.click();
  addbtn.innerText = "Update Note";
  popupTitle.innerText = "Updata a Note";
  titlee.value = tit;
  descc.value = desccc;
}
// Show Notes from the Local Storage 
function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((element, index) => {
    let li = `        <li class="note">
    <div class="content">
      <div class="header">
        <h1  onclick="openn(${index})">${element.title}</h1>
        <div class="settings">
          <i onclick="showMenu(this)" class="bx bx-dots-horizontal-rounded"></i>
            <div class="option">
              <i class="bx bx-edit-alt" onclick="updateNote(${index},'${
      element.title
    }','${element.desc}')"> Edit</i>
              <i class="bx bx-trash" onclick="deleteNote(${index})">Delete</i>
            </div>
        </div>
      </div>
      <p  onclick="openn(${index})">${element.desc}</p>
    </div>
    <div class="botom">
      <h3>${formatData(element.date)}</h3>
    </div>
  </li>`;

    addNote.insertAdjacentHTML("afterend", li);
  });
}
// formate date 
function formatData(data) {
  return new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(data);
}

// Open Single Note 
function openn(index) {
  let { title, desc, date } = notes[index];
  let ele = `
  <div class="popup-block show" id="popup">
  <div class="OneNote">
    <div class="content">
      <div class="header">
        <h1>${title}</h1>
        <div class="settings">
          <i onclick="closee()" class="bx bx-x" id="bx-x"></i>
            <div class="option">
              <i class="bx bx-edit-alt" onclick="updateNote(${index},'${title}','${desc}')"> Edit</i>
              <i class="bx bx-trash" onclick="deleteNote(${index})">Delete</i>
            </div>
        </div>
      </div>
      <p>${desc}</p>
    </div>
    <div class="botom">
      <h3>${formatData(date)}</h3>
    </div>
  </div>

</div>
  `;
  NOTE.innerHTML = ele;
}
//  Close the single Note 
function closee() {
    document.getElementById("popup").classList.remove("show")
}


// Deleting The Note 
function deleteNote(para) {
  notes.splice(para, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}
showNotes();
