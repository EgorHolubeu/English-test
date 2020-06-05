class Requests {
    setUser(userFirstName, userSecondName, userEmail) {
        const userInfo = {userFirstName, userSecondName, userEmail};
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('POST', 'http://localhost:3000/api/user');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send(JSON.stringify(userInfo));
        });
    }

    getQuestion(number) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', `http://localhost:3000/api/test/${number}`);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve(xhr.response);

            xhr.send();
        });
    }

    setUserAnswers(answers, id) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', `http://localhost:3000/api/answers/${id}`);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();

            xhr.send(JSON.stringify(answers));
        });
    }

    getUserResult(id) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('POST', `http://localhost:3000/api/answers/${id}`);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve(xhr.response);
            xhr.send();
        });
    }

    sendMessage(result, email) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('POST', `http://localhost:3000/api/sendemail/${result}/${email}`);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve(xhr.response);

            xhr.send();
        });
    }

    getAllResults() {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', 'http://localhost:3000/api/results');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }
}

export default Requests;