const ERRORS = {
    passwordsMismatch: 'Пароли не совпадают'
};

function submitForm(event) {
    event.preventDefault();
}

function showError(input, errorContainer, errorText, { inputErrorClass, errorVisibleClass }) {
    input.classList.add(inputErrorClass);
    errorContainer.classList.add(errorVisibleClass);
    errorContainer.textContent = errorText;
}

function hideError(input, errorContainer, { inputErrorClass, errorVisibleClass }) {
    input.classList.remove(inputErrorClass);
    errorContainer.classList.remove(errorVisibleClass);
    errorContainer.textContent = 'Вы пропустиле это поле';
}

function toggleButton(form, { buttonSelector, inactiveButtonClass }) {
    const button = form.querySelector(buttonSelector);
    const isFormValid = form.checkValidity();

    if (isFormValid) {
        button.classList.remove(inactiveButtonClass);
        button.removeAttribute('disabled');
    } else {
        button.classList.add(inactiveButtonClass);
        button.setAttribute('disabled', 'true');
    }
}
const ObjectToogleButton = {
    buttonSelector: '.button__submit',
    inactiveButtonClass: '.button__submit_disabled'
};

function validateInput(form, input, classes) {
    const errorContainer = form.querySelector(`#error-${input.id}`);

    let isValid = input.validity.valid;
    let errorText = input.validationMessage;

    if (input.id === 'passwordRepeat') {
        isValid = checkPasswords(form, input);
        errorText = ERRORS['passwordsMismatch'];
    }

    if (isValid) {
        hideError(input, errorContainer, classes);
    } else {
        showError(input, errorContainer, errorText, classes);
    }

    toggleButton(form, classes);
}

function enableValidation({ formSelector, inputSelector, ...rest }) {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach(form => {
        form.addEventListener('submit', submitForm);

        const inputs = form.querySelectorAll(inputSelector);

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(form, input, rest);
            });
        });

        toggleButton(form, rest);
    });
}


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    errorSelector: '.error-message',
    buttonSelector: '.popup__submit',
    inputErrorClass: 'popup__field_error',
    errorVisibleClass: 'error-message_visible',
    inactiveButtonClass: 'popup__submit_disabled'
});