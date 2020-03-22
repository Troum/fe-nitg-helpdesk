const english = {
    title: 'Welcome to North IT Group Helpdesk',
    subTitle: 'Please use your customer PIN provided by us or your registration e-mail to create or view a technical support question.',
    login: 'Your PIN-code or e-mail address',
    password: 'Your password',
    requestLogin: 'Forget login',
    proceedLogin: 'Login',
    loading: 'Please, wait...',
    admin: {
        title: 'Welcome, Admin',
        login: 'Your e-mail as login',
        password: 'Your password',
        proceedLogin: 'Login',
    },
    navButtons: {
        inbox: 'Inbox',
        back: 'Back to form',
        logout: 'Logout',
        login: 'Login again',
        table: 'Back to tickets'
    },
    ticket: {
        title: 'Form a question',
        subTitle: 'With our system you can get answers to many questions',
        type: 'Question type',
        types: [
            {
                text: 'Support',
                value: 1
            },
            {
                text: 'Request',
                value: 2
            },
            {
                text: 'Order',
                value: 3
            }
        ],
        priority: 'Priority',
        priorities: [
            {
                text: 'Low',
                value: 1
            },
            {
                text: 'Middle',
                value: 2
            },
            {
                text: 'High',
                value: 3
            },
            {
                text: 'Emergency',
                value: 4
            }
        ],
        responsible: 'Choose who to direct your question to',
        subject: 'Subject of your question',
        description: 'Actually, your question?',
        reset: 'Clear fields',
        submit: 'Send a question',
        add: 'New question',
        logout: 'Complete'

    },
    table: {
        headers: {
            date: 'Date',
            client: 'Client',
            responsible: 'Responsible',
            id: 'ID',
            type: 'Response type',
            time: 'Time to solve',
            status: 'Current status',
            bill: 'Bill'
        },
        buttons: {
            filter: 'Filters',
            newTicket: 'New question'
        },
        total: 'Total',
        start: 'Start working',
        continue: 'Continue'
    },
    filter: {
        header: 'Filters',
        dateFrom: 'Date from',
        dateTo: 'Date to',
        type: {
            title: 'Type',
            choose: 'Choose type',
            dropdown: [ 'Support','Request','Order']
        },
        responsible: {
            title: 'Direct to',
            dropdown: 'Choose responsible'
        },
        time: 'Time to solve',
        client: {
            title: 'Added by client',
            dropdown: 'Choose client'
        },
        status: 'Current status',
        id: 'ID',
        bill: 'Bill',
        buttons: {
            reset: 'Reset filters',
            submit: 'Use filters'
        }
    },
    emails: {
        table: {
            id: 'Question\'s ID',
            email: 'E-mail address',
            messages: 'Messages',
            button: 'Answer',
            total: 'Total'
        },

    },
    working: {
        title: 'Question\'s ID: ',
        subject: 'Message subject',
        defaultSubject: 'Working with question ',
        status: {
            title: 'Question status',
            dropdown: 'Change status'
        },
        message: 'Message',
        submit: 'Send message',
        notice: 'Remember: when you send message - status of question will change',
        statuses: ['Income', 'In progress', 'Done']
    },
    answer: {
        title: 'Answer to message',
        subject: 'Message subject',
        message: 'Message',
        submit: 'Send message'
    },
    auth_message: 'You are is unauthenticated now. Please, login or refresh your token'
};
export default english;
