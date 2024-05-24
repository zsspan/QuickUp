let draggedItem = null;

export function dragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/html", draggedItem.innerHTML);
}

export function dragOver(event) {
  event.preventDefault();
}

export function drop(event, allNotes) {
  event.preventDefault();
  event.preventDefault();
  const dropTarget = event.target.closest(".note");
  const draggedIndex = Array.from(dropTarget.parentNode.children).indexOf(
    draggedItem
  );

  if (draggedItem !== dropTarget) {
    // Reorder the notes in the DOM
    const dropIndex = Array.from(dropTarget.parentNode.children).indexOf(
      dropTarget
    );

    if (draggedIndex < dropIndex) {
      dropTarget.parentNode.insertBefore(draggedItem, dropTarget.nextSibling);
    } else {
      dropTarget.parentNode.insertBefore(draggedItem, dropTarget);
    }
  }

  const noteList = Array.from(document.querySelectorAll(".note")); // Convert NodeList to array

  //relocates dragged note to right spot in allnotes array
  const index = noteList.indexOf(draggedItem); // Find index of dragged item
  const id = draggedItem.id;

  const draggedNote = allNotes.find((note) => note.id === Number(id));

  const prevIndex = allNotes.indexOf(draggedNote);
  allNotes.splice(prevIndex, 1);
  allNotes.splice(index, 0, draggedNote);

  draggedItem = null;
  return allNotes;
}
