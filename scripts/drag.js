let draggedItem = null;

export function dragStart(event) {
    draggedItem = event.target;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', draggedItem.innerHTML);
    
}

export function dragOver(event) {
    event.preventDefault();
}

export function drop(event) {
    event.preventDefault();
    event.preventDefault();
    const dropTarget = event.target.closest('.note');
    const draggedIndex = Array.from(dropTarget.parentNode.children).indexOf(draggedItem);

    if (draggedItem !== dropTarget) {
        // Reorder the notes in the DOM
        const dropIndex = Array.from(dropTarget.parentNode.children).indexOf(dropTarget);

        if (draggedIndex < dropIndex) {
            dropTarget.parentNode.insertBefore(draggedItem, dropTarget.nextSibling);
        } else {
            dropTarget.parentNode.insertBefore(draggedItem, dropTarget);
        }
    }
    draggedItem = null;
}