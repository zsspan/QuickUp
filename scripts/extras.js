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

// download note as PDF using jsPDF
export function downloadAsPDF() {
  console.log("DSDS");
  // ensure jsPDF is available
  if (
    typeof window.jspdf === "undefined" &&
    typeof window.jsPDF === "undefined"
  ) {
    alert("jsPDF library is required to download as PDF.");
    return;
  }
  // support both global jsPDF and window.jspdf.jsPDF
  const jsPDF = window.jsPDF || (window.jspdf && window.jspdf.jsPDF);
  if (!jsPDF) {
    alert("jsPDF library is not loaded.");
    return;
  }
  const doc = new jsPDF();
  const text = editableDiv.innerText || "";
  const title = activeNote.title !== "" ? activeNote.title : "untitled";
  doc.setFontSize(16);
  doc.text(title, 10, 20);
  doc.setFontSize(12);
  const lines = doc.splitTextToSize(text, 180);
  doc.text(lines, 10, 35);
  doc.save("QuickUp - " + title + ".pdf");
}
