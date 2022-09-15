// Находим форму в DOM
// Воспользуйтесь методом querySelector()
const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__container');

// Находим поля формы в DOM
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = popup.querySelector('.popup__close-button');
const saveButton = formElement.querySelector('.popup__button');

const jobInput = document.querySelector('.popup__input_profile_job') // Воспользуйтесь инструментом .querySelector()
const nameInput = document.querySelector('.popup__input_profile_name') // Воспользуйтесь инструментом .querySelector()

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
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
formElement.addEventListener('submit', formSubmitHandler);

// Функция открытия
function openPopup() {
    popup.classList.add('popup_opened');
};

// Функция закрытия 
function closePopup() {
    popup.classList.remove('popup_opened');
};

//Закрываем popup
closePopupButton.addEventListener('click', () => {
    closePopup();
});

//Редактируем поля и сохраняем новые значения
openPopupButton.addEventListener('click', () => {
    openPopup();
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});