import {
  allNotes,
  noteButtons,
  activeNote,
  currTheme,
  title,
} from "./popup.js";
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
} from "./globals.js";

//helper function that returns noteID
export function getNoteIDFromButton(button) {
  const noteElement = button.closest(".note");
  if (noteElement) {
    return noteElement.id;
  }
  return null;
}

//handles search
export function handleSearch() {
  searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.trim().toLowerCase();

    allNotes.forEach((note) => {
      const title = note.title.toLowerCase();
      const content = note.content.toLowerCase();
      const matchesSearch =
        title.includes(searchText) || content.includes(searchText);
      const noteElement = document.getElementById(note.id);
      if (matchesSearch) {
        noteElement.style.display = "block";
      } else {
        noteElement.style.display = "none";
      }
    });
  });
}

//handles downloading file
export function downloadAsTXT() {
  let rawText = new Blob([editableDiv.innerText], { type: "text/plain" });
  let url = URL.createObjectURL(rawText);
  let link = document.createElement("a");
  let filename = "";
  link.href = url;

  //logic for deciding file name
  if (activeNote.title !== "") {
    filename = "QuickUp - " + activeNote.title + ".txt";
  } else {
    filename = "QuickUp-untitled.txt";
  }
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
