//list of variables retrieved through queryselect
export const titleInput = document.querySelector(".title-input");
export const editableDiv = document.querySelector(".newtext");

export const placeholderDiv = document.createElement("div");
export const deleteBtn = document.getElementById("delete");
export const downloadPDFBtn = document.getElementById("download-pdf");
export const download = document.getElementById("download");
export const spellcheck = document.getElementById("spellcheck-btn");

export const searchInput = document.querySelector(".form-control");
export const newNote = document.querySelector(".new-note");

export const logo = document.querySelector(".title");
export const header = document.querySelector(".header");
export const toolbar = document.querySelector(".toolbar");
export const sidebar = document.querySelector(".sidebar");
export const searchContainer = document.querySelector(".search-container");

export const dropdown = document.querySelector(".theme-dropdown");
export const themes = {
  theme1: {
    theme_name: "Ocean's Breeze",
    primary: "#19A7CE",
    secondary: "#8ac3db",
    content: "#FFFFFF",
    alternate: "#0a2f3e",
    notes: "#c9d2d3",
  },
  theme2: {
    theme_name: "Midnight Aura",
    primary: "#594979",
    secondary: "#504b69",
    content: "#cdcbd5",
    alternate: "#18122B",
    notes: "#807896",
  },
  theme3: {
    theme_name: "Mountain Bliss",
    primary: "#F7418F",
    secondary: "#FF8E8F",
    content: "#fdfcd9",
    alternate: "#971456",
    notes: "#f8d5c9",
  },
  theme4: {
    theme_name: "Gated Tundra",
    primary: "#506375",
    secondary: "#7B8FA1",
    content: "#e6d8c7",
    alternate: "#795c35",
    notes: "#bea683",
  },
  theme5: {
    theme_name: "Historic Text",
    primary: "#776B5D",
    secondary: "#B0A695",
    content: "#F3EEEA",
    alternate: "#3E3232",
    notes: "#eadfcb",
  },
  theme6: {
    theme_name: "Into the Forest",
    primary: "#386f47",
    secondary: "#755939",
    content: "#faf0e0",
    alternate: "#01150c",
    notes: "#96ae92",
  },
  theme7: {
    theme_name: "Tectonic Shift",
    primary: "#d80a0a",
    secondary: "#662138",
    content: "#faecc4",
    alternate: "#40081b",
    notes: "#de9469",
  },
  theme8: {
    theme_name: "Natural Dawn",
    primary: "#325775",
    secondary: "#5fa295",
    content: "#e4fbff",
    alternate: "#092635",
    notes: "#48c4c6",
  },
  theme9: {
    theme_name: "Axial Nebula",
    primary: "#7433dc",
    secondary: "#986fb3",
    content: "#dccbe5",
    alternate: "#322653",
    notes: "#D988B9",
  },
};
