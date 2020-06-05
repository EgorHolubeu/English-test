import Component from '../../../views/component.js';
import Requests from '../../../models/Requests.js';

class enter extends Component {
    constructor() {
        super();

        this.model = new Requests();
    }

    render() {
        return new Promise(resolve => {
            resolve(`
            <div class="test_block">
                <p class="enter_info_text">
                    Enter information about yourself
                </p>
                <label for="first_name" class="label">First name:</label>
                <input type="text" name="first_name" class="user_first_name" placeholder="First name">
                <label for="second_name" class="label">Second name:</label>
                <input type="text" name="second_name" class="user_second_name" placeholder="Second name">
                <label for="email" class="label">Email:</label>
                <input type="text" name="email" class="email" placeholder="@email">
                <button class="send_info button" disabled>Sign in</button>
                <p class="text_err invisible">
                    The user with such email already exists or your email is wrong!
                    Example: egorgolubev9999@gmail.com/
                    egorgolubev9999@mail.ru/
                    egorgolubev9999@yandex.ru
                </p>
            </div>       
            `);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const userFirstName = document.getElementsByClassName('user_first_name')[0],
            userSecondName = document.getElementsByClassName('user_second_name')[0],
            userEmail = document.getElementsByClassName('email')[0],
            signIn = document.getElementsByClassName('send_info')[0],
            textErr = document.getElementsByClassName('text_err')[0],
            linkAbout = document.getElementsByClassName('header__link ')[0],
            linkTest = document.getElementsByClassName('header__link ')[1];

        linkAbout.classList.add('disabled');
        linkTest.classList.add('disabled');

        userFirstName.addEventListener('keyup', () => {
            signIn.disabled = !userFirstName.value.trim();
        });

        userSecondName.addEventListener('keyup', () => {
            signIn.disabled = !userSecondName.value.trim();
        });

        userEmail.addEventListener('keyup', () => {
            signIn.disabled = !userEmail.value.trim();
        });

        signIn.addEventListener('click', event => {
            event.preventDefault();
            this.model.setUser(userFirstName.value, userSecondName.value, userEmail.value).then(response => {
                    window.sessionStorage.setItem('userInfo', JSON.stringify(response));
                    response.userEmail ? location.href = '#/about' : showErr();
                    linkAbout.classList.remove('disabled');

                    function showErr() {
                        userEmail.classList.add('show_error');
                        userEmail.value = '';
                        userFirstName.value = '';
                        userSecondName.value = '';
                        textErr.classList.remove('invisible');
                    }
                }
            );
        });
    }
}

export default enter;