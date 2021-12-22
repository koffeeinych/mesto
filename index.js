const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

function openPopup() {
    popup.classList.add('popup_opened');
}

popupEditButton.addEventListener('click', openPopup);


function closePopup() {
    popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', closePopup);


const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__field-name');
const jobInput = document.querySelector('.popup__field-job');
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-description');

function formInput() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup();
}

popupEditButton.addEventListener('click', formInput);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
