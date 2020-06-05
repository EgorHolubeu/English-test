const express = require('express'),
    fs = require('file-system'),
    shortId = require('shortid'),
    router = express.Router(),
    config = require('config'),
    mailer = require('../nodemailer.js');

router.post('/api/user', (req, res) => {
    const usersInfo = getUsersFromDB(),
        newUserInfo = req.body,
        newUser = usersInfo.find(item => (item.userEmail === newUserInfo.userEmail));
    console.log(/@gmail.com|@mail.ru|@yandex.ru/.test(newUserInfo.userEmail));
    if (newUser) {
        res.send({});
    } else if(!/@gmail.com|@mail.ru|@yandex.ru/.test(newUserInfo.userEmail)) {
        res.send({});
    } else {
        newUserInfo.id = shortId();
        usersInfo.push(req.body);
        setUsersToDB(usersInfo);
        res.send(req.body);
    }
});

router.get('/api/test/:number', (req, res) => {
    const questionsAndAnswers = getQuestionsFromDB(),
        question = questionsAndAnswers.find((item, i) => i == req.params.number);

    res.send(question.question);
});

router.get('/api/results', (req, res) => {
    const allResults = getAnswersFromDB(),
        users = getUsersFromDB();

    res.send(users.map((item, i) => {
        if (item.id === allResults[i].userId) {
            return {
                'result': allResults[i].result,
                'userFirstName': item.userFirstName,
                'userSecondName': item.userSecondName,
            };
        }
    }));
});

router.put('/api/answers/:id', (req, res) => {
    const answerBlock = req.body,
        userId = req.params.id,
        answersDB = getAnswersFromDB();
    answersDB.push({
        userId,
        answerBlock
    });
    setAnswersToDB(answersDB);

    res.sendStatus(201);
});
router.post('/api/sendemail/:result/:email', (req,res) => {
    mailer(req.params.result,req.params.email);
    res.sendStatus(204);
});
router.post('/api/answers/:id', (req, res) => {
    let counter = 0;
    const userId = req.params.id,
        user = getUsersFromDB().find((item, i) => (item.id === userId)),
        answersDB = getAnswersFromDB(),
        answerBlock = answersDB.find(item => (item.userId === userId)).answerBlock,
        rightAnswers = getQuestionsFromDB().map(item => (item.answer));

    rightAnswers.forEach((item, i) => item === answerBlock[i] ? counter++ : counter);
    answersDB.find(item => {
        if (item.userId === userId) {
            item.result = counter
        }
    });

    setAnswersToDB(answersDB);
    res.send(`${counter * 10} %`);
});

function getUsersFromDB() {
    return JSON.parse(fs.readFileSync(config.get('databases.users'), 'utf8'));
}

function getAnswersFromDB() {
    return JSON.parse(fs.readFileSync(config.get('databases.answers'), 'utf8'));
}

function setAnswersToDB(answersResult) {
    fs.writeFileSync(config.get('databases.answers'), JSON.stringify(answersResult));
}

function getQuestionsFromDB() {
    return JSON.parse(fs.readFileSync(config.get('databases.questions'), 'utf8'));
}

function setUsersToDB(usersInfo) {
    fs.writeFileSync(config.get('databases.users'), JSON.stringify(usersInfo));
}

module.exports = router;