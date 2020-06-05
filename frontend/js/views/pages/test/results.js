import Component from '../../../views/component.js';
import Requests from '../../../models/Requests.js';

class results extends Component {
    constructor() {
        super();

        this.model = new Requests();
    }

    render() {
        return new Promise(resolve => {
            resolve(`     
                <div class="result_all_block">
                    <h1 class="page-title">Best results</h1>
                    <div class="result_header">
                        <p>Name</p><p>Result</p>
                    </div>
                </div>  
            `);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const resultHeader = document.getElementsByClassName('result_all_block')[0];

        this.model.getAllResults().then(response => {
            response.sort((a, b) => (b.result - a.result)).forEach((item, i) => {
                if (i > 4) return;
                resultHeader.insertAdjacentHTML('beforeEnd', this.getUserHTML(item, ++i));
            });
        });
    }

    getUserHTML(user, number) {
        return `
            <div class="statistics">
                <span>${number}. ${user.userFirstName} ${user.userSecondName}</span>    
                ${user.result * 10}%                   
            </div>
        `;
    }
}

export default results;