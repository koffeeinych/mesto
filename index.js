const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseEdit = document.querySelector('.popup__close');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddButton = document.querySelector('.profile__add-button')
const popupAddCard = document.querySelector('.popup_type_add-card')
const popupCloseAdd = popupAddCard.querySelector('.popup__close')
const popupImage = document.querySelector('.popup_fig-image')
const popupCloseImg = popupImage.querySelector('.popup__close')

const formEdit = document.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');
const nameInput = document.getElementById('field-name');
const jobInput = document.getElementById('field-job');
const cardNameInput = document.getElementById('element-name')
const cardLinkInput = document.getElementById('element-link')
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-description');

const elements = document.querySelector('.elements')
const elementTemplate = document.querySelector('.element__template').content.querySelector('.element')
 

function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeEscPopup)  
  document.addEventListener('mousedown', () => closeOverlayPopup(popup))
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup)
  document.removeEventListener('mousedown', closeOverlayPopup)
}

function closeEscPopup (event) {
  const keyCode = event.keyCode; 
  const openedPopup = document.querySelector('.popup_opened')
	if (keyCode === 27) {		
		event.preventDefault();  
    
	}
  closePopup(openedPopup)
}

function closeOverlayPopup (popup) {  
    closePopup(popup)
    }

popupEditButton.addEventListener('click', () => openPopup(popupEdit))
popupCloseEdit.addEventListener('click', () => closePopup(popupEdit))


popupAddButton.addEventListener('click', () => openPopup(popupAddCard))
popupCloseAdd.addEventListener('click', () => closePopup(popupAddCard))

function getFormInput() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

popupEditButton.addEventListener('click', getFormInput);


function handlerFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit)       
}

formEdit.addEventListener('submit', handlerFormSubmit);

function createCard(cardData) {
  const cardElement = elementTemplate.cloneNode(true)
  const elementImage = cardElement.querySelector('.element__image')
  const elementName = cardElement.querySelector('.element__title')
  const deleteButton = cardElement.querySelector('.element__delete-button')
  const likeButton = cardElement.querySelector('.element__like-button')  

  const popupImg = popupImage.querySelector('.popup__img')
  const popupCaption = popupImage.querySelector('.popup__caption')

  elementImage.addEventListener('click', () => openPopup(popupImage))
  popupCloseImg.addEventListener('click', () => closePopup(popupImage))

          
  elementName.textContent = cardData.name
  elementImage.src = cardData.link
  elementImage.alt = cardData.link  

  elementImage.addEventListener('click', (event) => {
    event.stopPropagation()
    openPopup(popupImage)
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
  closePopup(popupAddCard);
  formAddCard.reset();
  toggleButton(formAddCard, ObjectToogleButton)
})

