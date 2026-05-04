const formValidation = () => {
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
};

export default formValidation;
