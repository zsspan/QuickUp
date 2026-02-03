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
    primary: "#393053",
    secondary: "#443C68",
    content: "#948cac",
    alternate: "#18122B",
    notes: "#746b8f",
  },
  theme3: {
    theme_name: "Blissful Enamour",
    primary: "#F7418F",
    secondary: "#FF8E8F",
    content: "#FFFDCB",
    alternate: "#971456",
    notes: "#f8d5c9",
  },
  theme4: {
    theme_name: "Gated Tundra",
    primary: "#506375",
    secondary: "#7B8FA1",
    content: "#e6d8c7",
    alternate: "#8e6e42",
    notes: "#CFB997",
  },
  theme5: {
    theme_name: "Historic Text",
    primary: "#776B5D",
    secondary: "#B0A695",
    content: "#F3EEEA",
    alternate: "#3E3232",
    notes: "#EBE3D5",
  },
  theme6: {
    theme_name: "Many Festivities",
    primary: "#00DFA2",
    secondary: "#FF0060",
    content: "#ffe499",
    alternate: "#337357",
    notes: "#F7D060",
  },
  theme7: {
    theme_name: "Tectonic Shift",
    primary: "#7D0A0A",
    secondary: "#BF3131",
    content: "#EAD196",
    alternate: "#662138",
    notes: "#FB8B24",
  },
  theme8: {
    theme_name: "Natural Dawn",
    primary: "#265073",
    secondary: "#43766C",
    content: "#9AD0C2",
    alternate: "#092635",
    notes: "#2D9596",
  },
  theme9: {
    theme_name: "Axial Nebula",
    primary: "#5D12D2",
    secondary: "#AC87C5",
    content: "#E0AED0",
    alternate: "#322653",
    notes: "#D988B9",
  },
};
