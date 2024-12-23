/** Прочитать содержимое файла */
const readFile = (func) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.oninput = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        func(reader.result, file.name);
      };
    }
  };
  input.click();
};

export default readFile;
