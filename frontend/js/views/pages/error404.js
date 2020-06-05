import Component from '../../views/component.js';

class Error404 extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`                
                <h1 class="page-title">404 Error - Page Not Found</h1>           
                <video poster="https://i.gifer.com/fetch/w300-preview/e0/e0792e1e4c2972b6f94ef82012fcec50.gif" 
                class="full-media gif" loop="" autoplay="" playsinline="">
                    <source src="https://i.gifer.com/8vm2.mp4" type="video/mp4">
                </video>   
            `);
        });
    }
}

export default Error404;