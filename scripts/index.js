const popups = document.querySelectorAll('.popup');

/* popups */
const popupProfile = document.querySelector('.popup_profile');
const popupElements = document.querySelector('.popup_elements');
const popupShow = document.querySelector('.popup_show');

/* forms */
const profileForm = popupProfile.querySelector('.popup__form');
const elementForm = popupElements.querySelector('.popup__form');

const forms = document.forms;
const сardAddForm = forms.elementsForm;
const profileEditForm = forms.profileForm;

/* buttons */
const buttonPopupOpen = document.querySelector('.profile__edit-button');
const buttonAddOpen = document.querySelector('.profile__add-button');
const buttonPopupClose = document.querySelector('.popup__close-button');
const popupButton = document.querySelectorAll('.popup__button');

/* input */
const jobInput = document.querySelector('.popup__input_profile_job');
const nameInput = document.querySelector('.popup__input_profile_name');
const linkInput = document.querySelector('.popup__input_elements_link');
const elementInput = document.querySelector('.popup__input_elements_name');

/* show */
const popupTitleShow = document.querySelector('.popup__show-title');
const popupImageShow = document.querySelector('.popup__show-image');

/* profile */
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const elementsContainer = document.querySelector('.cards'); /* '.elements' */

const elementTemplate = document.querySelector('.elements').content; /* '.elements-template' */

// Обработчик «отправки» формы
function submitFormProfile (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
};

// функция открытия popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

// Функция закрытия popup
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

// Функция закрытия popup на оферлей
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        };
    });
});

// Функция закрытия popup на Escape
function closePopupEsc(evt) {
    if(evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    };
};

//Редактируем поля и сохраняем новые значения
buttonPopupOpen.addEventListener('click', () => {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

// добавление карточки
function submitFormElement (evt) {
    evt.preventDefault();
    renderCard(elementInput.value, linkInput.value); 
    closePopup(popupElements);

    popupButton.forEach((button) => {
        button.classList.add('popup__button_inactive');
        button.setAttribute('disabled', true);
    });
};

// Добавляем картинку и сохраняем
buttonAddOpen.addEventListener('click', () => {
    openPopup(popupElements);
    сardAddForm.reset();
});

// Template 
function addElement(name, link) {
    const elementsElement = elementTemplate.querySelector('.elements__element').cloneNode(true);

    const buttonTrash = elementsElement.querySelector('.elements__trash');
    const buttonLike = elementsElement.querySelector('.elements__button');
    const elementsImage = elementsElement.querySelector('.elements__image');

    elementsElement.querySelector('.elements__name').textContent = name;
    elementsImage.src = link;
    elementsImage.alt = name;
    
    buttonTrash.addEventListener('click',() => {
        elementsElement.remove();
    });

    buttonLike.addEventListener('click', (evt) => {
        evt.target.classList.toggle('elements__button_active');
    });

    elementsImage.addEventListener('click', () => {
        openPopup(popupShow);
        popupTitleShow.textContent = name;
        popupImageShow.src = link;
        popupImageShow.alt = name;
    });

    return elementsElement;
};


function renderCard(name, link) {
    const cardElement = addElement(name, link);
    elementsContainer.prepend(cardElement);
};


// Отрисовка изначального массива карочек
initialCards.forEach((item) => {
    renderCard(item.name, item.link);
});

profileForm.addEventListener('submit', submitFormProfile);

elementForm.addEventListener('submit', submitFormElement);