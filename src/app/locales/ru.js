export default {
  translation: {
    noMatch: {
      title: 'Страница не найдена',
      text: 'Но вы можете перейти',
      link: 'на главную страницу',
    },
    nav: {
      brand: 'Hexlet Chat',
    },
    form: {
      login: {
        title: 'Войти',
        inputUserName: 'Ваш ник',
        inputPassword: 'Пароль',
        btn: 'Войти',
      },
      signUp: {
        title: 'Регистрация',
        inputUserName: 'Ваш ник',
        inputPassword: 'Пароль',
        inputConfirmPassword: 'Подтвердите пароль',
        btn: 'Зарегистрироваться',
      },
      channel: {},
      message: {
        input: 'Введите сообщение...',
      },
      feedback: {
        error: {
          wrongValues: 'Неверные имя пользователя или пароль',
          exist: 'Такой пользователь уже существует',
        },
        invalid: {
          required: 'Обязательное поле',
          min: 'Не менее {{min}} символов',
          minMax: 'От {{min}} до {{max}} символов',
          oneOf: 'Пароли должны совпадать',
          notOneOf: 'Канал с таким именем уже существует',
        },
      },
      noAccount: 'Нет акаунта?',
    },
    chat: {
      channels: {
        title: 'Каналы',
      },
      messages: {},
    },
    modal: {
      add: {
        title: 'Добавить канал',
        input: 'Имя канала',
      },
      remove: {
        title: 'Удалить канал',
        text: 'Уверены?',
      },
    },
    btn: {
      remove: 'Удалить',
      rename: 'Переименовать',
      cancel: 'Отменить',
      submit: 'Отправить',
      logOut: 'Выйти',
    },
    img: {
      login: 'Войти',
      noMatch: '"Страница не найдена',
    },
  },
};
