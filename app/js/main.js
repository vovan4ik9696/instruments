$(function () {

});

"use strict"

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('sending')
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if(response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove('sending');
      }else {
        alert("Ошибка");
        form.classList.remove('sending');
      }

    } else {
      alert('Заполните обязательные поля')
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('.req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
      formRemoveError(document.querySelector('.contacts__modify'));

      if (input.classList.contains('phone')) {
        if (phoneTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute('type') === "checkbox" && input.checked === false) {
        formAddError(document.querySelector('.contacts__modify'));
        error++;
      } else if (input.value === '') {
        formAddError(input);
        error++;
      }
    }
    return error;
  }

  function formAddError(input) {
    input.classList.add('error');
  }

  function formRemoveError(input) {
    input.classList.remove('error');
  }

  function phoneTest(input) {
    return /^\d[\d\(\)\ -]{4,14}\d$/.test(input.value);
  }

});