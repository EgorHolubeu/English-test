import Component from '../../../views/component.js';
import Requests from '../../../models/Requests.js';

class testQuestions extends Component {
    constructor() {
        super();

        this.model = new Requests();
    }

    render() {
        return new Promise(resolve => {
            resolve(`        
                    <div class="test_block">
                    <h1 class="page-title">Good luck!</h1>   
                        <p class="test_questions">
                        </p>
                        <div class="answer_block">
                            <input type="text" class="text_answer" placeholder="Answer">
                            <a class="next_question_btn button">Next question</a>
                        </div>
                    </div>          
            `);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        let number = window.sessionStorage.getItem('number') ? window.sessionStorage.getItem('number') : 0,
            answers = window.sessionStorage.getItem('answer') ? window.sessionStorage.getItem('answer') : '';
        const nextBtn = document.getElementsByClassName('next_question_btn')[0],
            answersText = document.getElementsByClassName('text_answer')[0];

        this.model.getQuestion(number).then(response => {
            this.setQuestionToHTML(response, window.sessionStorage.getItem('number') ? window.sessionStorage.getItem('number') : ++number);
        });

        nextBtn.addEventListener('click', (event) => {
            event.preventDefault();

            if (parseInt(window.sessionStorage.getItem('number')) === 10) {
                location.href = '/#/userResult';
            } else {
                this.model.getQuestion(number).then(response => {
                        this.setQuestionToHTML(response, ++number);
                        answers += `${answersText.value.trim().toLowerCase()},`;
                        answersText.value = '';
                        window.sessionStorage.setItem('answer', answers);
                        window.sessionStorage.setItem('number', number);
                    }
                );
            }
        });
    }

    setQuestionToHTML(question, number) {
        const questionText = document.getElementsByClassName('test_questions')[0];

        questionText.innerText = `${number}. ${question}`;
    }
}

export default testQuestions;