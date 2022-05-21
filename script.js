function main() {
  const canvas = document.querySelector("#canvas");
  const colorPicker = document.querySelector("#color");
  const sizePicker = document.querySelector("#size");
  const info = {
    mousedown: false,
    color: "black",
    size: 16,
    max: 128
  };

  sizePicker.max = info.max;

  colorPicker.value = info.color;
  sizePicker.value = info.size;
  canvas.innerHTML = mountGrid(info.size);

  canvas.addEventListener("mouseup", () => info.mousedown = false);
  canvas.addEventListener("mousedown", e => (info.mousedown = true, colorfy(e.target, info.color)));
  canvas.addEventListener("mouseover", e => info.mousedown && colorfy(e.target, info.color));

  colorPicker.addEventListener("change", e => info.color = e.target.value);
  sizePicker.addEventListener("change", e => {
    let value = parseInt(e.target.value);
    value = ((value < 1) && 1) || ((value > info.max) && info.max) || value;
    e.target.value = value;
    if (value == info.size) return;

    info.size = value;
    canvas.innerHTML = mountGrid(info.size);
  });
}

function mountGrid(size) {
  const html = [];

  for (let c = 0; c < size; c++) {
    html.push("<div>");
    for (let k = 0; k < size; k++)
      html.push("<div></div>");
    html.push("</div>");
  }

  return html.join("");
}

function colorfy(target, color) {
  target.style.backgroundColor = color;
}

main();

