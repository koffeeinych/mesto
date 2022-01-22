const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddButton = document.querySelector('.profile__add-button')
const popupAddCard = document.querySelector('.popup_type_add-card')
const popupCloseAdd = popupAddCard.querySelector('.popup__close')
const popupImage = document.querySelector('.popup_fig-image')
const popupCloseImg = popupImage.querySelector('.popup__close')

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

popupEditButton.addEventListener('click', () => togglePopup(popupEdit))
popupCloseButton.addEventListener('click', () => togglePopup(popupEdit))

popupAddButton.addEventListener('click', () => togglePopup(popupAddCard))
popupCloseAdd.addEventListener('click', () => togglePopup(popupAddCard))

popupCloseImg.addEventListener('click', () => togglePopup(popupImage))


const formEdit = document.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');
const nameInput = document.getElementById('field-name');
const jobInput = document.getElementById('field-job');
const cardNameInput = document.getElementById('element-name')
const cardLinkInput = document.getElementById('element-link')
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-description');

function getFormInput() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

popupEditButton.addEventListener('click', getFormInput);

function handlerFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(popupEdit);
}

formEdit.addEventListener('submit', handlerFormSubmit);


const elements = document.querySelector('.elements')
const elementTemplate = document.querySelector('.element__template').content.querySelector('.element')


function createCard(cardData) {
  const cardElement = elementTemplate.cloneNode(true)
  const elementImage = cardElement.querySelector('.element__image')
  const elementName = cardElement.querySelector('.element__title')
  const deleteButton = cardElement.querySelector('.element__delete-button')
  const likeButton = cardElement.querySelector('.element__like-button')  

  const popupImg = popupImage.querySelector('.popup__img')
  const popupCaption = popupImage.querySelector('.popup__caption')
      
  elementName.textContent = cardData.name
  elementImage.src = cardData.link
  elementImage.alt = cardData.link

  elementImage.addEventListener('click', () => {

    togglePopup(popupImage)
    popupImg.src = cardData.link
    popupImg.alt = cardData.name
    popupCaption.textContent = cardData.name
  })
  
  function handlerDeleteButton() {
    cardElement.remove()
  }
  deleteButton.addEventListener('click', handlerDeleteButton)

  function handlerLikeButton() {
    likeButton.classList.toggle('element__like-button_active')
  }

  likeButton.addEventListener('click', handlerLikeButton)

  elements.prepend(cardElement)
  }

initialCards.forEach(createCard)

formAddCard.addEventListener('submit', (event) => {
  event.preventDefault()

  createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  })
  togglePopup(popupAddCard);
})
