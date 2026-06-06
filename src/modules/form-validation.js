const cleanDuplicates = (str) => str.replace(/\s{2,}/g, " ").replace(/-{2,}/g, "-");
const cleanEdges = (str) => str.replace(/^[\s-]+|[\s-]+$/g, "");
const capitalizeWords = (str) => str.replace(/\b\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

// Утилита PIPE
const pipe = (...fns) => (value) => fns.reduce((v, fn) => fn(v), value);

const processSimple = pipe(cleanDuplicates, cleanEdges);
const processMessage = pipe(cleanDuplicates, cleanEdges, capitalizeWords);

// Валидация через INPUT
const telInputs = document.querySelectorAll('input[type="tel"]');
const emailInputs = document.querySelectorAll('input[type="email"]');
const messageInputs = document.querySelectorAll(
  'input[placeholder="Ваше сообщение"], textarea[placeholder="Ваше сообщение"]'
);

telInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9()+-\s]/g, "");
  });
});

emailInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^a-zA-Z0-9@-_.!~*'']/g, "");
  });
});

messageInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^а-яА-ЯёЁ-\s]/g, "");
  });
});

// Валидация через BLUR
telInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    input.value = processSimple(input.value);
  });
});

emailInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    input.value = processSimple(input.value);
  });
});

messageInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    input.value = processMessage(input.value);
  });
});


export default function formValidation() {
}