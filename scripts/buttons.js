import { currTheme } from "./popup.js";
export function handleAllClicks() {
  const info = document.getElementById("info");

  const bold = document.getElementById("bold-btn");
  const underline = document.getElementById("underline-btn");
  const italics = document.getElementById("italic-btn");
  const highlight = document.getElementById("highlight-btn");
  const left_align = document.getElementById("left-align-btn");
  const center_align = document.getElementById("center-align-btn");
  const right_align = document.getElementById("right-align-btn");
  const justify_align = document.getElementById("justify-align-btn");
  const erase = document.getElementById("erase-btn");
  const list = document.getElementById("list-btn");

  left_align.addEventListener("click", function () {
    setTextAlignment("Left");
  });

  center_align.addEventListener("click", function () {
    setTextAlignment("Center");
  });

  right_align.addEventListener("click", function () {
    setTextAlignment("Right");
  });

  justify_align.addEventListener("click", function () {
    setTextAlignment("Full");
  });

  bold.addEventListener("click", function () {
    document.execCommand("bold");
  });

  underline.addEventListener("click", function () {
    document.execCommand("underline");
  });

  italics.addEventListener("click", function () {
    document.execCommand("italic");
  });

  highlight.addEventListener("click", function () {
    document.execCommand("hiliteColor", false, currTheme.secondary);
  });

  erase.addEventListener("click", function () {
    document.execCommand("hiliteColor", false, "transparent");
  });

  list.addEventListener("click", function () {
    document.execCommand("insertUnorderedList", false, null);
  });

  info.addEventListener("click", function () {
    window.open("QuickUp_ Version 1.pdf", "_blank");
  });
}

function setTextAlignment(alignment) {
  document.execCommand("justify" + alignment);
}
