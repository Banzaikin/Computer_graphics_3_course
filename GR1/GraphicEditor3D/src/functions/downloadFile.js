/** Скачать файл */
const downloadFile = async (text, name) => {
  const blob = new Blob([text]);

  // Проверить, есть ли функция открытия диалогового окна
  const supportsFileSystemAccess =
    "showSaveFilePicker" in window &&
    (() => {
      try {
        return window.self === window.top;
      } catch {
        return false;
      }
    })();
  // Если есть диалоговое окно, то открыть его
  if (supportsFileSystemAccess) {
    const getNewFileHandle = async () => {
      const opts = {
        types: [
          {
            description: "Text file",
            accept: { "text/plain": [".txt"] },
          },
        ],
      };
      return await window.showSaveFilePicker(opts);
    };
    let a = await getNewFileHandle();
    const writable = await a.createWritable();
    await writable.write(blob);
    await writable.close();
  }
  // Если нет, то скачать файл с заранее заданным именем
  else {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("href", "data:text/plain,");
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    
  }
};

export default downloadFile;
