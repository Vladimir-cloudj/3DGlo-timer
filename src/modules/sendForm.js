const sendForm = ({ formId, someElem = [] }) => {
  const form = document.getElementById(formId);

  if (!form) {
    console.warn(`Форма с id="${formId}" не найдена`);
    return;
  }

  const statusBlock = document.createElement("div");
  statusBlock.className = "form-status";
  const loadText = "Загрузка...";
  const errorText = "Ошибка отправки";
  const successText = "Данные успешно отправлены!";

  // ===== ВАЛИДАЦИЯ =====
  const validateField = (input) => {
    const name = input.name;
    const value = input.value;

    if (name === "user_phone") {
      return /^[0-9+\-()\s]*$/.test(value);
    } else if (name === "user_name") {
      return /^[а-яА-ЯёЁ\s]*$/.test(value);
    } else if (name === "user_message") {
      return /^[а-яА-ЯёЁ0-9\s.,!?;:'"()-]*$/.test(value);
    }

    return true;
  };

  const validateForm = (formElements) => {
    let isValid = true;

    formElements.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
        input.style.borderColor = "red";
        input.title = "Недопустимые символы";
      } else {
        input.style.borderColor = "";
        input.title = "";
      }
    });

    return isValid;
  };

  // ===== ФИЛЬТРАЦИЯ ВВОДА =====
  const filterInput = (input) => {
    const name = input.name;

    input.addEventListener("input", function () {
      let filteredValue = this.value;

      if (name === "user_phone") {
        filteredValue = this.value.replace(/[^0-9+\-()\s]/g, "");
      } else if (name === "user_name") {
        filteredValue = this.value.replace(/[^а-яА-ЯёЁ\s]/g, "");
      } else if (name === "user_message") {
        filteredValue = this.value.replace(/[^а-яА-ЯёЁ0-9\s.,!?;:'"()-]/g, "");
      }

      if (filteredValue !== this.value) {
        this.value = filteredValue;
      }
    });
  };

  // ===== ОТПРАВКА ДАННЫХ =====
  const sendData = (data) => {
    return fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    });
  };

  // ===== ОТПРАВКА ФОРМЫ =====
  const submitForm = () => {
    const formElements = form.querySelectorAll("input, textarea, select");
    const formData = new FormData(form);
    const formBody = {};

    statusBlock.textContent = loadText;
    statusBlock.style.color = "blue";
    form.append(statusBlock);

    formData.forEach((value, key) => {
      formBody[key] = value;
    });

    someElem.forEach((elem) => {
      const element = document.getElementById(elem.id);
      if (element) {
        if (elem.type === "block") {
          formBody[elem.id] = element.textContent;
        } else if (elem.type === "input") {
          formBody[elem.id] = element.value;
        }
      }
    });

    if (validateForm(formElements)) {
      sendData(formBody)
        .then((data) => {
          console.log("✅ Успешно отправлено:", data);
          statusBlock.textContent = successText;
          statusBlock.style.color = "green";

          formElements.forEach((input) => {
            if (input.type !== "submit") {
              input.value = "";
            }
          });

          setTimeout(() => {
            statusBlock.remove();
          }, 3000);
        })
        .catch((error) => {
          console.error("Ошибка:", error);
          statusBlock.textContent = errorText;
          statusBlock.style.color = "red";

          setTimeout(() => {
            statusBlock.remove();
          }, 3000);
        });
    } else {
      statusBlock.textContent = "Ошибка валидации! Проверьте поля.";
      statusBlock.style.color = "red";

      setTimeout(() => {
        statusBlock.remove();
      }, 3000);
    }
  };

  // ===== ИНИЦИАЛИЗАЦИЯ =====
  try {
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach(filterInput);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      submitForm();
    });

    console.log(`Форма "${formId}" инициализирована`);
  } catch (error) {
    console.error("Ошибка инициализации формы:", error.message);
  }
};

export default sendForm;
