const russian = {
    title: 'Вас приветствует North IT Group Helpdesk',
    subTitle: 'Пожалуйста, используйте Ваш PIN-код клиента, предоставленный нами, или же Ваш e-mail, ' +
        'указанный при регистрации - для создания или просмотра билета в службу технической поддержки.',
    login: 'Ваш PIN-код или e-mail',
    password: 'Ваш пароль',
    requestLogin: 'Забыл логин',
    proceedLogin: 'Войти',
    loading: 'Подождите...',
    admin: {
        title: 'Здравствуйте, Администратор',
        login: 'Ваш e-mail в качестве логина',
        password: 'Ваш пароль',
        proceedLogin: 'Войти',
    },
    navButtons: {
        inbox: 'Почта',
        back: 'Вернуться к форме',
        logout: 'Выйти',
        login: 'Войти заново',
        table: 'Вернуться к вопросам'
    },
    ticket: {
        title: 'Сформируйте вопрос',
        subTitle: 'С помощью нашей системы Вы сможете получить ответы на многие вопросы',
        type: 'Тип запроса',
        types: [
            {
                text: "Поддержка",
                value: 1
            },
            {
                text: "Запрос",
                value: 2
            },
            {
                text: "Поручение",
                value: 3
            }
        ],
        priority: 'Приоритет',
        priorities: [
            {
                "text": "Низкий",
                "value": 1
            },
            {
                "text": "Средний",
                "value": 2
            },
            {
                "text": "Высокий",
                "value": 3
            },
            {
                "text": "Неотложный",
                "value": 4
            }
        ],
        responsible: 'Выберите, кому направить Ваш вопрос',
        subject: 'Тема Вашего вопроса',
        description: 'Собственно, Ваш вопрос?',
        reset: 'Очистить поля',
        submit: 'Отправить вопрос',
        add: 'Новый вопрос',
        logout: 'Завершить'

    },
    table: {
        headers: {
            date: 'Добавлено',
            client: 'От пользователя',
            responsible: 'Назначено',
            id: 'ID',
            type: 'Тип',
            time: 'Время на решение',
            status: 'Статус',
            bill: 'Расчетный чек'
        },
        buttons: {
            filter: 'Фильтры',
            newTicket: 'Новый вопрос'
        },
        total: 'Всего',
        start: 'Начать работу',
        continue: 'Продолжить'
    },
    filter: {
        header: 'Фильтры',
        dateFrom: 'Добавлены от',
        dateTo: 'Добавлены до',
        type: {
            title: 'Тип',
            choose: 'Выберите тип',
            dropdown: [ 'Поддержка','Запрос','Поручение']
        },
        responsible: {
            title: 'Назначено',
            dropdown: 'Выберите ответственного'
        },
        time: 'Время на решение',
        client: {
            title: 'Добавлено пользователем',
            dropdown: 'Выберите пользователя'
        },
        status: 'Статус',
        id: 'ID',
        bill: 'Расчетный чек',
        buttons: {
            reset: 'Сбросить фильтры',
            submit: 'Применить фильтры'
        }
    },
    emails: {
        table: {
            id: 'ID вопроса',
            email: 'Адрес e-mail',
            messages: 'Сообщения',
            button: 'Ответить',
            total: 'Всего'
        },

    },
    working: {
        title: 'ID вопроса: ',
        subject: 'Тема сообщения',
        defaultSubject: 'Работа с вопросом ',
        status: {
            title: 'Статус вопроса',
            dropdown: 'Изменить статус'
        },
        message: 'Сообщение',
        submit: 'Отправить сообщение',
        notice: 'Запомните: когда вы отправите сообщение - статус вопроса изменится',
        statuses: ['Зарегистрирован', 'Принят в работу', 'Решен']
    },
    answer: {
        title: 'Ответ на сообщение',
        subject: 'Тема сообщения',
        message: 'Сообщение',
        submit: 'Отправить'
    },
    auth_message: 'Вы сейчас не аутентифицированы. Войдите заново или же обновите свой токен'
};
export default russian;
