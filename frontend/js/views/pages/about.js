import Component from '../../views/component.js';

class About extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <div class="about"> 
                    <h1 class="page-title">Welcome ${JSON.parse(window.sessionStorage.getItem('userInfo')).userFirstName} ${JSON.parse(window.sessionStorage.getItem('userInfo')).userSecondName}!</h1>                   
                    <p class="about__info">This application will help you to know your English level!</p>
                    <a class="about__btn-start button" href="#/test" title="Click here to get started!">Start test</a>
                </div>
            `);
        });
    }
}

export default About;