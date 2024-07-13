import { Local } from './en'
//eslint-disable max-len
export const ru: Local = {
  auth: {
    button: {
      backToSignIn: 'Назад к Войти',
      backToSignUp: 'Вернуться к странице регистрации',
      createNewPassword: 'Создать новый пароль',
      resendLink: 'Отправить ссылку повторно',
      resendVerificationLink: 'Повторно отправить ссылку для подтверждения',
      saveChanges: 'Сохранить изменения',
      sendLink: 'Отправить ссылку',
      sendLinkAgain: 'Отправить ссылку еще раз',
      signInButton: 'Войти',
      signUpButton: 'Зарегистрироваться',
    },
    congratulationPage: {
      congratulationText: 'Ваш адрес электронной почты подтверждён',
      h1: 'Поздравляем!',
      meta_description: '',
      title: 'Поздравляем!',
    },
    createNewPassword: {
      h1: 'Создать новый пароль',
      meta_description: 'Создать новый пароль',
      title: 'Создать новый пароль',
    },
    error: {
      descriptionPostValueMax: 'Описание поста не может быть больше 500 символов',
      descriptionPostValueMin: 'Описание поста не может быть меньше 10 символов',
      descriptionValueMax: 'Максимальное количество символов 500 знаков',
      emailIsRequiredError: 'Электронная почта обязательна',
      incorrectUsernameOrPasswordError: 'Неверное имя пользователя или пароль',
      incorrectValue:
        'Вы ввели неверный пароль или адрес электронной почты. Пожалуйста, попробуйте еще раз',
      invalidEmailAddress: 'Неверный адрес электронной почты',
      invalidEmailOrPass: 'Не правильный логин или пароль',
      invalidUsername: 'Неверное имя пользователя или пароль',
      passwordIsRequiredError: 'Необходим пароль',
      passwordMax: 'Пароль не может быть больше 30 символов',
      passwordMin: 'Пароль не может быть меньше 6 символов',
      passwordRegex:
        'Пароль может содержать a-z, A-Z, 0-9, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
      passwordsDontMatch: 'Пароли не совпадают',
      passwordsMustMatch: 'Пароли не совпадают',
      titlePostValueMax: 'Название поста не может быть больше 10 символов',
      titlePostValueMin: 'Название поста не может быть меньше 8 символов',
      uNameRegisteredError: 'Пользователь с этим логином уже зарегистрирован',
      userIsAdult:
        'Пользователь младше 13 лет не может создать профиль. Политика конфиденциальности',
      userNameIsRequiredError: 'Имя пользователя необходимо ввести',
      userNameMax: 'Имя пользователя не может быть больше 30 символов',
      userNameMin: 'Имя пользователя не может быть меньше 6 символов',
      userNotExist: 'Такого пользователя не существует',
    },
    forgotPasswordPage: {
      enterYourEmailText: 'Введите адрес электронной почты, и мы вышлем вам дальнейшие инструкции',
      h1: 'Забыли пароль?',
      linkHasBeenSentText:
        'Ссылка отправлена по электронной почте. Если вы не получили ссылку для отправки по электронной почте еще раз',
      meta_description:
        'Не можете войти? Введите свой адрес электронной почты и мы вышлем вам вам дальнейшие инструкции для возврата в вашу учетную запись',
      title: 'Забыли пароль',
    },
    form: {
      addPublicationDescription: 'Описание поста',
      confirmPassword: 'Повторите пароль',
      email: 'Почта',
      firstname: 'Имя',
      lastname: 'Фамилия',
      newPassword: 'Новый пароль',
      password: 'Пароль',
      passwordConfirmation: 'Подтверждение пароля',
      passwordRule: 'Ваш пароль должен быть от 6 до 20 символов',
      postTitle: 'Название поста',
      username: 'Имя пользователя',
    },
    mergerPage: {
      h1: 'Объединение учетных записей',
      mergeButton: {
        no: 'Нет',
        yes: 'Да, объединить',
      },
      meta_description: '',
      title: 'Объединение учетных записей',
    },
    modal: {
      modalLogOutText: {
        getEmail(email: string) {
          return 'Вы действительно хотите выйти со своего аккаунта ' + email + '?'
        },
      },
      modalTitle: 'Письмо отправлено',
      modalVerificationText: {
        getEmail(email: string) {
          return (
            'Мы отправили ссылку для подтверждения вашего электронного письма по адресу ' + email
          )
        },
      },
      noButton: 'Нет',
      notification: 'Выход',
      yesButton: 'Да',
    },
    privacyPolicyPage: {
      h1: 'Политика конфиденциальности',
      meta_description: 'TEXT',
      title: 'Политика конфиденциальности',
    },
    signInPage: {
      forgotPassword: 'Забыли пароль',
      h1: 'Войти',
      meta_description:
        'С возвращением в INSTALIFE! Войдите, чтобы увидеть снимки и записи, сделанные вашими друзьями, родственниками и интересными вам людьми по всему миру',
      question: 'У тебя еще нет аккаунта?',
      title: 'Войти',
    },
    signUpPage: {
      h1: 'Зарегистрироваться',
      meta_description:
        'Присоединяйтесь к INSTALIFE! Зарегистрируйтесь, чтобы просматривать фото, видео, истории и сообщения от своих друзей, родственников, а также интересных людей со всего мира',
      privacyTerms:
        "Я согласен с <a href='/sign-up/terms-of-service'>условиями обслуживания</a> и <a href='/sign-up/privacy-policy'>политикой конфиденциальности</a>",
      privacyTermsPolicyLink: 'политикой конфиденциальности',
      privacyTermsServiceLink: 'условиями обслуживания',
      privacyTermsText: 'Я согласен с <1>link</1> и <2>link</2>',
      question: 'У тебя уже есть аккаунт?',
      title: 'Зарегистрироваться',
    },
    termsOfServicePage: {
      h1: 'Условия обслуживания',
      meta_description: 'TEXT',
      title: 'Условия обслуживания',
    },
    verificationPage: {
      h1: '',
      linkExpiredTitle: 'Срок действия ссылки для подтверждения электронной почты истек',
      linkInvalidTitle: 'Неверная ссылка для подтверждения электронной почты',
      meta_description: '',
      title: '',
      verificationText:
        'Похоже, срок действия ссылки для подтверждения истек. Не волнуйтесь, мы можем отправить ссылку еще раз',
    },
  },
  button: {
    addAProfilePhoto: 'Добавить фото',
    answer: 'Ответить',
    backToPayment: 'Вернуться к оплате',
    backToProfileSettings: 'Вернуться к настройкам профиля',
    banInTheSystem: 'Булочка в системе :)',
    copyLink: 'Копировать ссылку',
    delete: 'Удалить',
    deletePost: 'Удалить пост',
    discard: 'Сбросить',
    editPost: 'Редактировать пост',
    follow: 'Подписаться',
    hide: 'Скрыть',
    linkSuccess: 'Cсылка успешно скопирована',
    moreInformation: 'Дополнительная информация',
    next: 'Дальше',
    no: 'Нет',
    ok: 'Хорошо',
    openDraft: 'Открыть черновик',
    original: 'Оригинал',
    prev: 'Назад',
    profileSettings: 'Настройки профиля',
    publish: 'Опубликовать',
    removeUser: 'Удалить пользователя',
    save: 'Сохранить',
    saveChanges: 'Сохранить',
    saveDraft: 'Сохранить черновик',
    selectFromComputer: 'Выбрать файл',
    sendMessage: 'Отправить сообщение',
    showMore: 'Показать больше',
    terminateAllOtherSession: 'Завершите все остальные сеансы',
    unfollow: 'Отписаться',
    yes: 'Да',
  },
  messenger: {
    imgFormat: 'Только .jpg, .jpeg, .png  форматы поддерживаются',
    imgLarger360: 'Изображение должно быть больше 360х360',
    imgLess10mb: 'Максимальный размер изображения 10мб',
  },
  modal: {
    addPhotoModalTitle: 'Добавить фото',
    advertisingPlacement: 'Размещение рекламы',
    anotherReason: 'Другая причина',
    areYouSureToBan: 'Вы уверены, что хотите забанить этого пользователя?',
    areYouSureToDelete: 'Вы действительно хотите удалить пользователя ?',
    badBehavior: 'Плохое поведение',
    banUser: 'Заблокировать пользователя',
    closeModalTextOne: 'Вы действительно хотите закрыть создание публикации? ',
    closeModalTextTwo: 'Если вы закроете, все будет удалено',
    closeModalTitle: 'Закрыть',
    deletePostText: 'Вы уверены, что хотите удалить этот пост?',
    deletePostTitle: 'Удалить пост ?',
    deleteUser: 'Удалить пользователя',
    deleteUserAvatar: 'Удалить фотографию',
    deleteUserAvatarText: 'Вы действительно хотите удалить фотографию?',
    editPost: 'Редактировать пост',
    errorTransactionModalDescription:
      'Транзакция завершилась неудачей, пожалуйста, повторите попытку',
    errorTransactionModalTitle: 'Ошибка',
    followersModalTitle: 'Подписчики',
    followersModalUnfollowTitle: 'Отписаться',
    followingModalDeleteDescription: 'Вы действительно хотите удалить подписчика “URLProfiele”?',
    followingModalDeleteTitle: 'Удалить Подписчика',
    followingModalTitle: 'Подписчик',
    followingModalUnfollowDescription:
      'Вы действительно хотите отписаться от этого пользователя “URLProfiele”?',
    postDescriptionValueMax: 'Максимальное количество символов 500 знаков',
    publicationTitle: 'Публикация',
    reasonForBan: 'Причина блокировки',
    search: 'Поиск',
    successTransactionModalDescription: 'Оплата прошла успешно!',
    successTransactionModalTitle: 'Успех',
  },
  myProfile: {
    error: {
      imgFormat: 'Только .jpg, .jpeg, .png  форматы поддерживаются',
      imgLarger332: 'Изображение должно быть больше 332х332',
      imgLess10mb: 'Максимальный размер изображения 10мб',
      imgLess20mb: 'Максимальный размер изображения 20мб',
      imgMoreThen10: 'Максимум 10 картинок',
    },
    followers: 'Подписчики',
    following: 'Подписки',
    pageTitle: 'Мой профиль',
    profileSettings: 'Настройки профиля',
    publications: 'Публикации',
  },
  post: {
    addComment: 'Добавить комментарий...',
    answer: 'Ответ',
    cropping: 'Изменить размер',
    filters: 'Применить фильтр',
    followSuccess: 'Успешно',
    hideAllAnswers: 'Скрыть ответы',
    hideAllComments: 'Скрыть все комментарии',
    like: 'Нравится',
    noAnswers: 'Тут пока нет ответов',
    noComments: 'Тут пока нет комментариев',
    publication: 'Опубликовать',
    showAllAnswers: 'Показать ответы',
    totalUsers: 'Зарегистрированные пользователи',
    unfollowSuccess: 'Успешно',
    viewAllcomments: 'Просмотреть все комментарии',
  },
  profileSettings: {
    pageTitle: 'Настройки профиля',
    tab: {
      accountManagement: {
        accountManagementTitle: 'Управление учетной записью',
        accountType: 'Тип учетной записи:',
        accountTypeBusiness: 'Бизнес',
        accountTypeBusinessPrice: {
          perDay: '$10 за 1 день',
          perMonth: '$100 в месяц',
          perWeek: '$50 за 7 дней',
        },
        accountTypePersonal: 'Личный',
        autoRenewal: 'Автоматическое продление',
        changeYourSubscription: 'Измените свою подписку:',
        currentSubscription: 'Текущая подписка:',
        expireAt: 'Дата окончания',
        nextPayment: 'Дата следующего платежа',
        paymentChoice: 'Или',
        transactionFailed: 'Transaction failed, please try again',
        transactionSuccess: 'Payment was successful!',
        yourSubscriptionCosts: 'Стоимость вашей подписки:',
      },
      devices: {
        activeSessions: 'Активные сеансы',
        devicesTitle: 'Устройство',
        lastVisit: 'Последняя активность',
        thisDevices: 'Текущее устройство',
      },
      generalInformation: {
        error: {
          aboutMeDescription:
            'Графа обо мне должна содержать 0-9, A-Z, a-z, А-Я, а-я и специальные символы',
          aboutMeValueMax: 'Максимальное количество символов 200 знаков',
          calender: 'Пользователь младше 13 лет не может создать профиль',
          calenderMin: 'Дата рождения обязательна',
          descriptionValueMax: 'Максимальное количество символов 500 знаков',
          firstNameDescription: 'Имя должно содержать A-Z, a-z, А-Я, а-я',
          firstNameMax: 'Имя пользователя не может быть больше 50 символов',
          firstNameMin: 'Введите имя',
          invalidUsername: 'Имя и фамилия должны содержать только буквы',
          lastNameDescription: 'Фамилия должна содержать A-Z, a-z, А-Я, а-я',
          lastNameMax: 'Фамилия пользователя не может быть больше 50 символов',
          lastNameMin: 'Введите фамилию',
          userNameDescription: 'Имя пользователя должно содержать a-z, A-Z, 0-9, _, -',
          userNameMax: 'Имя пользователя не может быть больше 30 символов',
          userNameMin: 'Имя пользователя не может быть меньше 6 символов',
        },
        form: {
          aboutMe: 'Обо мне',
          city: 'Город',
          dateOfBirthday: 'Дата рождения',
          email: 'Почта',
          enterName: 'Введите название города',
          firstname: 'Имя',
          lastname: 'Фамилия',
          username: 'Имя пользователя',
        },
        generalInformationTitle: 'Основная информация',
      },
      myPayments: {
        dateOfPayment: 'Дата платежа',
        endDateOfSubscription: 'Дата окончания подписки',
        myPaymentsTitle: 'Мои платежи',
        paymentType: 'Тип платежа',
        price: 'Стоимость',
        subscriptionType: 'Тип подписки',
      },
    },
  },
  search: {
    looksEmpty: 'Уупс! Здесь пусто :(',
    noRecent: 'Недавних запросов нет',
    recent: 'Недавние запросы',
  },
  sidebar: {
    create: 'Создать',
    favourites: 'Закладки',
    home: 'Домой',
    logOut: 'Выйти',
    messenger: 'Мессенджер',
    myProfile: 'Мой профиль',
    paymentsList: 'Платежи',
    postsList: 'Посты',
    publish: 'Опубликовать',
    search: 'Поиск',
    statistics: 'Статистика',
    usersList: 'Пользователи',
  },
  time: {
    hours: 'ч',
    minutes: 'мин назад',
    postMinutes: 'Минут назад',
  },
  toast: {
    deletePost: 'Пост был удалён',
    noDeletePost: 'Ошибка: Пост не был удалён',
    profileError: 'Ошибка! Сервер недоступен',
    profileSaveChanges: 'Ваши настройки сохранены!',
  },
}
