// Находим форму в DOM
// Воспользуйтесь методом querySelector()
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupElements = document.querySelector('.popup_elements');
const popupShow = document.querySelector('.popup_show');
const profileForm = popupProfile.querySelector('.popup__form');
const elementForm = popupElements.querySelector('.popup__form');

// Находим поля формы в DOM
const openPopupButton = document.querySelector('.profile__edit-button');
const openAddButton = document.querySelector('.profile__add-button');
const closePopupButton = document.querySelector('.popup__close-button');

const jobInput = document.querySelector('.popup__input_profile_job');
const nameInput = document.querySelector('.popup__input_profile_name');

const linkInput = document.querySelector('.popup__input_elements_link');
const elementInput = document.querySelector('.popup__input_elements_name');

const showPopupTitle = document.querySelector('.popup__show-title');
const showPopupImage = document.querySelector('.popup__show-image');


const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const elementsContainer = document.querySelector('.elements');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formProfileSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

profileForm.addEventListener('submit', formProfileSubmit);

// Функция открытия popup_profile
function openPopupProfile() {
    popupProfile.classList.add('popup_opened');
};

// Функция открытия popup_elements
function openPopupElements () {
    popupElements.classList.add('popup_opened');
};

// Функция закрытия popup
function closePopup() {
    popups.forEach((popup) => {
        popup.classList.remove('popup_opened');
    });
};

//Закрываем popup
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
            closePopup();
        };
    });
})


//Редактируем поля и сохраняем новые значения
openPopupButton.addEventListener('click', () => {
    openPopupProfile();
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

// submit add element
function formElementSubmit (evt) {
    evt.preventDefault();
    addElement(elementInput.value, linkInput.value);
    closePopup();
};

elementForm.addEventListener('submit', formElementSubmit);

// Добавляем картинку и сохраняем
openAddButton.addEventListener('click', () => {
    openPopupElements();
    linkInput.value = elementLInk.src;
    elementInput.value = elementName.textContent;
});

// Template 
function addElement(name, link) {
    const elementTemplate = document.querySelector('.elements__template').content;
    const elementsElement = elementTemplate.querySelector('.elements__element').cloneNode(true);

    elementsElement.querySelector('.elements__image').src = link;
    elementsElement.querySelector('.elements__name').textContent = name;
    elementsElement.querySelector('.elements__image').alt = name;

    elementsContainer.prepend(elementsElement);

    const trashButton = elementsElement.querySelector('.elements__trash');
    const likeButton = elementsElement.querySelector('.elements__button');
    const showImage = elementsElement.querySelector('.elements__image');
    
    trashButton.addEventListener('click',() => {
        elementsElement.remove();
    });

    likeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('elements__button_active');
    });

    showImage.addEventListener('click', () => {
        popupShow.classList.add('popup_opened');
        showPopupTitle.textContent = name;
        showPopupImage.src = link;
        showPopupImage.alt = name;
    });
};

// Отрисовка изначального массива карочек
initialCards.forEach((element) => {
    addElement(element.name, element.link);
});