import Component from '../../views/component.js';

class Header extends Component {
    render() {
        const resource = this.request.resource;

        return new Promise(resolve => {
            resolve(`
                 <header class="header">                    
                     <a class="header__link ${resource === 'about' ? 'active' : ''}" href="/#/about">
                         About
                     </a>
                     <a class="header__link ${resource === 'test' ? 'active' : ''}" href="/#/test">
                         Test
                     </a>
                     <a class="header__link ${resource === 'results' ? 'active' : ''}" href="/#/results">
                         Results
                     </a>                                            
                </header>
            `);
        });
    }
}

export default Header;