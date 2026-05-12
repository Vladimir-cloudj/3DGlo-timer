const formValidation = () => {

  function cleanDuplicates(str) {
    return str.replace(/\s{2,}/g, " ").replace(/-{2,}/g, "-");
  }

  function cleanEdges(str) {
    return str.replace(/^[\s-]+|[\s-]+$/g, "");
  }

  function capitalizeWords(str) {
    return str.replace(/\b\w+/g, (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
  }

  // Валидация через INPUT

  const telInputs = document.querySelectorAll('input[type="tel"]');
  telInputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9()+\-\s]/g, "");
    });
  });

  const emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^a-zA-Z0-9@\-_.!~*'']/g, "");
    });
  });

  const messageInputs = document.querySelectorAll(
    'input[placeholder="Ваше сообщение"], textarea[placeholder="Ваше сообщение"]',
  );
  messageInputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^а-яА-ЯёЁ\-\s]/g, "");
    });
  });

  // Валидация через BLUR

  telInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      let value = this.value;
      value = cleanDuplicates(value);
      value = cleanEdges(value);
      this.value = value;
    });
  });

  emailInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      let value = this.value;
      value = cleanDuplicates(value);
      value = cleanEdges(value);
      this.value = value;
    });
  });

  messageInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      let value = this.value;
      value = cleanDuplicates(value);
      value = cleanEdges(value);
      value = capitalizeWords(value);
      this.value = value;
    });
  });
};

export default formValidation;
