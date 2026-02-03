import { dragOver, dragStart, drop } from "./drag.js";
import { handleAllClicks } from "./buttons.js";
import {
  getNoteIDFromButton,
  handleSearch,
  downloadAsTXT,
  downloadAsPDF,
} from "./extras.js";
import {
  titleInput,
  editableDiv,
  placeholderDiv,
  deleteBtn,
  download,
  searchInput,
  newNote,
  themes,
  logo,
  header,
  toolbar,
  sidebar,
  searchContainer,
  dropdown,
  spellcheck,
  downloadPDFBtn,
} from "./globals.js";

//Class that holds each note
class Note {
  constructor(id, title = "", content = "") {
    this.id = id;
    this.title = title;
    this.content = content;
  }
  updateContent(newContent) {
    this.content = newContent;
  }
  updateTitle(newTitle) {
    this.title = newTitle;
  }
}

export let title = "Untitled Note";
export let saveNotesTimeout;

//Main variables that keep track of data
export let allNotes = [];
export let noteButtons = [];
export let activeNote = null;
export let currTheme = themes["theme1"];

//saves notes to local storage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(allNotes));
  localStorage.setItem("currentTheme", JSON.stringify(currTheme)); // Save the current theme
}

//loads notes saved in local storage
function loadNotes() {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    allNotes.length = 0;

    //convert JSON to object
    const parsedNotes = JSON.parse(savedNotes);
    parsedNotes.forEach((note) => {
      allNotes.push(new Note(note.id, note.title, note.content));
    });
    console.log("QuickUp - Loaded Last Save");
    [...allNotes].reverse().forEach((note) => {
      generateNoteUI(note);
    });

    activeNote = allNotes[0];
    if (activeNote) {
      updateButtonStyles(noteButtons[0]);
    }
  }
  const savedTheme = localStorage.getItem("currentTheme");
  if (savedTheme) {
    currTheme = JSON.parse(savedTheme);
  } else {
    currTheme = themes["theme1"];
  }
  applyTheme(); // apply the saved theme
}

//Function for autosave
function autoSave() {
  saveNotesTimeout;
  if (saveNotesTimeout) {
    clearTimeout(saveNotesTimeout);
  }
  saveNotesTimeout = setTimeout(() => {
    saveNotes();
  }, 250);
  renderEmpty(allNotes);
}

//Event listeners for downloading, changing title, and creating a note
download.addEventListener("click", downloadAsTXT);
downloadPDFBtn.addEventListener("click", () => {
  downloadAsPDF();
});

newNote.addEventListener("click", createNote);
titleInput.addEventListener("input", changeTitle);
spellcheck.addEventListener("click", () => {
  let check = editableDiv.getAttribute("spellcheck");
  // console.log(check);
  if (check) {
    editableDiv.setAttribute("spellcheck", "false");
  } else {
    editableDiv.setAttribute("spellcheck", "true");
  }
});

//Handles note deletion
deleteBtn.addEventListener("click", () => {
  if (activeNote) {
    const confirmation = confirm(
      "Are you sure you want to delete '" + title + "'?",
    );
    if (confirmation) {
      let wantRemoved = document.getElementById(activeNote.id);
      if (wantRemoved && wantRemoved.parentNode) {
        wantRemoved.parentNode.removeChild(wantRemoved);
        let index = allNotes.findIndex(
          (note) => note.id.toString() === activeNote.id.toString(),
        );
        if (index !== -1) {
          allNotes.splice(index, 1);
        }
        if (allNotes.length > 0) {
          activeNote = allNotes[allNotes.length - 1];
          let button = document.getElementById(activeNote.id).firstChild;
          updateButtonStyles(button);
        } else {
          activeNote = null;
        }
      }
      autoSave();
    }
  }
});

//Updates editableDiv content
editableDiv.addEventListener("input", () => {
  if (activeNote) {
    const newContent = editableDiv.innerHTML;
    activeNote.updateContent(newContent);
    autoSave();
  }
});

//Function that generates UI for added note
function generateNoteUI(newNote) {
  //console.log('Note Created with ID:' + newNote.id);
  let list = document.querySelector(".note-list");
  let note = document.createElement("div");
  note.classList.add("note");
  note.setAttribute("id", newNote.id);
  note.setAttribute("draggable", "true");

  //adding some styling to new button
  let noteBtn = document.createElement("button");
  noteBtn.classList.add("note-btn");
  if (newNote.title == "") {
    noteBtn.classList.add("italics");
    noteBtn.innerText = "Untitled Note";
  } else {
    noteBtn.innerText = newNote.title;
  }

  note.appendChild(noteBtn);
  // Insert at the beginning of the list
  if (list.firstChild) {
    list.insertBefore(note, list.firstChild);
  } else {
    list.appendChild(note);
  }

  titleInput.value = newNote.title;
  editableDiv.innerHTML = newNote.content;

  noteButtons = document.querySelectorAll(".note-btn");

  if (allNotes.length > 9) {
    noteButtons.forEach((note) => {
      note.parentNode.classList.add("right-border");
    });
  }

  setActiveNote();
}

//Function for creating a note
function createNote() {
  let noteID = Date.now();
  let newNote = new Note(noteID);

  // Add to the beginning of the array
  allNotes.unshift(newNote);

  generateNoteUI(newNote);
  activeNote = newNote;
  // Update styles for the first button (newest note)
  updateButtonStyles(noteButtons[0]);

  //console.log("ACTIVE NOTE:" + activeNote.id);
  autoSave();
}

//Function to select and store the active note
function setActiveNote() {
  noteButtons.forEach(function (button) {
    let buttonID = getNoteIDFromButton(button);
    button.addEventListener("click", (event) => {
      activeNote = allNotes.find(
        (note) => note.id.toString() === buttonID.toString(),
      );
      //console.log('Active note:' + activeNote.id);
      if (activeNote) {
        updateButtonStyles(button);
      }
    });
  });
}

// Populate the theme list in the DOM
function populateThemeList() {
  const themeList = document.querySelector(".theme-list");
  themeList.innerHTML = "";
  Object.keys(themes).forEach((themeKey) => {
    const theme = themes[themeKey];
    const themeDiv = document.createElement("div");
    themeDiv.id = themeKey;
    // match structure: <div id="themeX"><button>Theme Name</button></div>
    const btn = document.createElement("button");
    btn.textContent = theme.theme_name || themeKey;
    themeDiv.appendChild(btn);
    themeList.appendChild(themeDiv);
  });
}

// Attach event listeners for theme selection
function chooseTheme() {
  const themeList = document.querySelector(".theme-list");
  Array.from(themeList.children).forEach((themeDiv) => {
    themeDiv.addEventListener("click", () => {
      const themeKey = themeDiv.id;
      currTheme = themes[themeKey];
      applyTheme();
    });
  });
}

//Function that applies the selected theme to the interface
function applyTheme() {
  //console.log('CURRENT THEME NAME ' + currTheme['theme_name']);

  logo.style.setProperty("--color", currTheme.primary);
  header.style.setProperty("--color", currTheme.primary);
  sidebar.style.setProperty("--color", currTheme.secondary);
  toolbar.style.setProperty("--color", currTheme.primary);
  searchContainer.style.setProperty("--color", currTheme.secondary);

  searchInput.style.setProperty("--color", currTheme.content);
  editableDiv.style.setProperty("--color", currTheme.content);

  newNote.style.setProperty("--color", currTheme.alternate);

  if (activeNote) {
    let currButton = document.getElementById(activeNote.id).firstChild;
    updateButtonStyles(currButton);
  }

  autoSave();
}

//Function to update note UIs depending on theme, active note, etc
function updateButtonStyles(activeButton) {
  //changing UI for each note in list
  noteButtons.forEach((btn) => {
    btn.classList.remove("active");
    btn.style.color = "black";
    if (allNotes.length > 9) {
      btn.parentNode.classList.add("right-border");
    } else {
      btn.parentNode.classList.remove("right-border");
    }

    btn.parentNode.style.backgroundColor = currTheme["notes"];
    btn.parentNode.style.setProperty("--hover-bg-color", currTheme["notes"]);
    btn.parentNode.style.setProperty("--hover-color", currTheme["alternate"]);
  });

  //changing active note and current text displayed
  activeButton.classList.add("active");
  activeButton.style.color = currTheme["alternate"];
  editableDiv.innerHTML = activeNote.content;
  titleInput.value = activeNote.title;
}

//Function that handles when title of a note is changed
function changeTitle() {
  title = titleInput.value.trim();
  if (activeNote) {
    activeNote.updateTitle(title);
    let htmlNote = document.getElementById(activeNote.id);
    let button = htmlNote.querySelector(".note-btn");

    //title should be italicized if input is empty
    if (title) {
      button.innerText = title;
      button.classList.remove("italics");
    } else {
      button.innerText = "Untitled Note";
      button.classList.add("italics");
    }
    autoSave();
  }
}

//Function to render the UI for when there are no notes present
function renderEmpty(allNotes) {
  let tools = document.querySelector(".toolbar").childNodes;

  if (allNotes.length === 0) {
    //change the displays of text features when no notes are present
    titleInput.classList.add("none");
    download.classList.add("none");
    deleteBtn.classList.add("none");

    dropdown.style.setProperty("--position", "-325%");

    tools.forEach((element) => {
      if (element.nodeType === 1) {
        element.classList.add("none");
      }
    });

    //adding a message
    placeholderDiv.classList.remove("none");
    placeholderDiv.classList.add("placeholder");
    placeholderDiv.style.setProperty("--bg-color", currTheme["content"]);
    placeholderDiv.style.setProperty("--color", currTheme["primary"]);
    placeholderDiv.innerHTML = `
            <p class="intro" >Welcome to <span class="app-name">QuickUp</span>!</p>
            <p>Click the '+' button above to create your first note!</p>
            <p>Press the info button to get a full list of controls.</p>
        `;
    editableDiv.replaceWith(placeholderDiv);
  } else {
    dropdown.style.setProperty("--position", "-200%");
    titleInput.classList.remove("none");
    download.classList.remove("none");
    deleteBtn.classList.remove("none");
    tools.forEach((element) => {
      if (element.nodeType === 1) {
        element.classList.remove("none");
      }
    });
    placeholderDiv.replaceWith(editableDiv);
    placeholderDiv.classList.add("none");
  }
}

//Function called when app is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadNotes();
  renderEmpty(allNotes);
  populateThemeList();
  chooseTheme();
  handleSearch();

  //Logic for drag-and-drop
  const noteList = document.querySelector(".note-list");
  noteList.addEventListener("dragstart", dragStart);
  noteList.addEventListener("dragover", dragOver);
  noteList.addEventListener("drop", (event) => {
    // Call the drop function passing the event and the allNotes array
    allNotes = drop(event, allNotes);
    // console.log(allNotes)
    saveNotes();
  });
  //Imported from buttons.js, handles many events
  handleAllClicks();
});
