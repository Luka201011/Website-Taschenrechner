document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".result");
  let current = "0", previous = "", operator = "", resetNext = false;

  function update() {
    display.textContent = current.slice(0, 15);
  }

  function calculate() {
    const a = parseFloat(previous), b = parseFloat(current);
    if (isNaN(a) || isNaN(b)) return;
    switch (operator) {
      case "+": current = a + b; break;
      case "−": current = a - b; break;
      case "×": current = a * b; break;
      case "÷": current = b === 0 ? "Fehler" : a / b; break;
    }
    current = current.toString();
    operator = previous = "";
    update();
  }

  document.querySelectorAll(".button").forEach(btn => {
    const val = btn.textContent.trim();
    btn.addEventListener("click", () => {
      if (!isNaN(val) || val === ".") {
        if (resetNext) current = "", resetNext = false;
        if (val === "." && current.includes(".")) return;
        current = current === "0" && val !== "." ? val : current + val;
      } else if (val === "DEL") current = "0", previous = "", operator = "";
      else if (val === "+/-") current = current.startsWith("-") ? current.slice(1) : "-" + current;
      else if (val === "=") calculate();
      else { if (operator) calculate(); previous = current; operator = val; resetNext = true; }
      update();
    });
  });

  update();
});