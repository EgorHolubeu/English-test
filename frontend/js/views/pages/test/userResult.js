import Component from '../../../views/component.js';
import Requests from '../../../models/Requests.js';

class userResult extends Component {
    constructor() {
        super();

        this.model = new Requests();
    }

    render() {
        return new Promise(resolve => {
            resolve(`     
                 
                    <div class="result_block">
                        <h1 class="page-title-result">Your result!!!</h1>    
                        <div class="result_block_number">
                        <p class="result_number"></p> 
                        <button class="confirm_result button">Confirm</button>
                        <audio  autoplay="autoplay">
                            <source src="../../../../sounds/00556%20(mp3cut.net).mp3" type="audio/mp3">
                        </audio>
                        </div>
                    </div>          
            `);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const numberResult = document.getElementsByClassName('result_number')[0],
            btnConfirm = document.getElementsByClassName('confirm_result')[0];
        let answerBlock = window.sessionStorage.getItem('answer').split(',');
        answerBlock.pop();
        window.sessionStorage.setItem('arrAnswer', JSON.stringify(answerBlock));
        if (!window.sessionStorage.getItem('result')) {
            this.model.setUserAnswers(answerBlock, JSON.parse(window.sessionStorage.getItem('userInfo'))['id']).then(() => {
                    return this.model.getUserResult(JSON.parse(window.sessionStorage.getItem('userInfo'))['id']).then(response => {
                        window.sessionStorage.setItem('result', response);
                        numberResult.innerText = `The result of test is ${response}`;
                    });
                }
            );
        } else {
            numberResult.innerText = `The result of test is ${window.sessionStorage.getItem('result')}`;
        }

        btnConfirm.addEventListener('click', () => {
            location.href = '/#/results';
            this.model.sendMessage(parseInt(window.sessionStorage.getItem('result')), JSON.parse(window.sessionStorage.getItem('userInfo')).userEmail).then();
        });
    }
}

export default userResult;