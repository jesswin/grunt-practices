function loadScripts() {
  document.getElementById("header").innerHTML = Shopping["header"](headerData);
  document.getElementById("aside").innerHTML = Shopping["aside"](asideData);
  document.getElementById("footer").innerHTML = Shopping["footer"](footerData);
}
