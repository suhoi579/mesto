// Находим форму в DOM
// Воспользуйтесь методом querySelector()
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupElements = document.querySelector('.popup_elements');
const popupShow = document.querySelector('.popup_show');
const profileForm = popupProfile.querySelector('.popup__form');
const elementForm = popupElements.querySelector('.popup__form');

// Находим поля формы в DOM
const buttonPopupOpen = document.querySelector('.profile__edit-button');
const buttonAddOpen = document.querySelector('.profile__add-button');
const buttonPopupClose = document.querySelector('.popup__close-button');

const jobInput = document.querySelector('.popup__input_profile_job');
const nameInput = document.querySelector('.popup__input_profile_name');

const linkInput = document.querySelector('.popup__input_elements_link');
const elementInput = document.querySelector('.popup__input_elements_name');

const popupTitleShow = document.querySelector('.popup__show-title');
const popupImageShow = document.querySelector('.popup__show-image');


const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const elementsContainer = document.querySelector('.cards'); /* '.elements' */

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitFormProfile (evt) {
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

profileForm.addEventListener('submit', submitFormProfile);

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
buttonPopupOpen.addEventListener('click', () => {
    openPopupProfile();
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

// submit add element
function submitFormElement (evt) {
    evt.preventDefault();
    renderCard(elementInput.value, linkInput.value); 
    closePopup();
};

elementForm.addEventListener('submit', submitFormElement);

// Добавляем картинку и сохраняем
buttonAddOpen.addEventListener('click', () => {
    openPopupElements();
});

// Template 
function addElement(name, link) {
    const elementTemplate = document.querySelector('.elements').content; /* '.elements-template' */
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
        popupShow.classList.add('popup_opened');
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