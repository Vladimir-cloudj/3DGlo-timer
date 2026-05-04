const calculator = () => {
  const calcInputs = document.querySelectorAll(
    '.calc input[type="number"], .calc input[type="text"]',
  );

  calcInputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "");
    });

    input.addEventListener("paste", function (e) {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData("text");
      this.value += text.replace(/\D/g, "");
    });
  });
};

export default calculator;
