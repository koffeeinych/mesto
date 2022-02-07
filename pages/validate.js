const validateConfig ={
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    errorSelector: '.error-message',
    buttonSelector: '.popup__submit',
    inputErrorClass: 'popup__field_error',
    errorVisibleClass: 'error-message_visible',
    inactiveButtonClass: 'popup__submit_disabled'
}

function submitForm(event, submitButton) {
    event.preventDefault();
    disableButton(submitButton);
}

function showError(input, errorContainer, errorText, { inputErrorClass, errorVisibleClass }) {
    input.classList.add(inputErrorClass);
    errorContainer.classList.add(errorVisibleClass);
    errorContainer.textContent = errorText;
}

function hideError(input, errorContainer, { inputErrorClass, errorVisibleClass }) {
    input.classList.remove(inputErrorClass);
    errorContainer.classList.remove(errorVisibleClass);
    errorContainer.textContent = '';
}

function disableButton(buttonElement) {
    buttonElement.classList.add(validateConfig.inactiveButtonClass);
    buttonElement.disabled = true;
}


function enableButton(buttonElement) {
    buttonElement.classList.remove(validateConfig.inactiveButtonClass);
    buttonElement.disabled = false;
}

function validateInput(form, input, classes) {
    const errorContainer = form.querySelector(`#error-${input.id}`);

    let isValid = input.validity.valid;
    let errorText = input.validationMessage;

    if (isValid) {
        hideError(input, errorContainer, classes);
    } else {
        showError(input, errorContainer, errorText, classes);
    }
}

function enableValidation({ formSelector, inputSelector, buttonSelector, ...rest }) {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach(form => {
        const submitButton = form.querySelector(buttonSelector);
        form.addEventListener('submit', (e) => submitForm(e, submitButton));
        if (!form.checkValidity()) disableButton(submitButton);

        const inputs = form.querySelectorAll(inputSelector);

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(form, input, rest);
                if (!form.checkValidity()) {
                    disableButton(submitButton);
                } else {
                    enableButton(submitButton);
                }
            });
        });
    });
}
enableValidation(validateConfig);