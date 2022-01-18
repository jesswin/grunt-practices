async function loadCompileTimeTemplates() {
  let templatePathObj = [
    { path: "./templates/aside.handlebars", name: "aside", data: asideData },
    {
      path: "./templates/header.handlebars",
      name: "header",
      data: headerData,
      partial: "menu",
      partialData: "{{menuItem}}",
    },
    { path: "./templates/footer.handlebars", name: "footer", data: footerData },
  ];

  let xhttp = new XMLHttpRequest();
  let template;
  let compiledTemplate;

  for (let i = 0; i < templatePathObj.length; i++) {
    xhttp.onload = () => {
      console.log(xhttp.responseText);
      template = xhttp.responseText;
      compiledTemplate = Handlebars.compile(template);
      console.log(compiledTemplate);
      document.getElementById(templatePathObj[i].name).innerHTML =
        compiledTemplate(templatePathObj[i].data);
    };
    if (templatePathObj[i].partial) {
      Handlebars.registerPartial(
        templatePathObj[i].partial,
        templatePathObj[i].partialData
      );
    }
    await xhttp.open("GET", templatePathObj[i].path, true);
    xhttp.send();
  }
}
