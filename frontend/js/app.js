import {parseRequestURL} from './helpers/utils.js';

import Header from './views/partials/header.js';

import About from './views/pages/about.js';
import Error404 from './views/pages/error404.js';
import testQuestions from './views/pages/test/testQuestions.js';
import results from './views/pages/test/results.js';
import enter from './views/pages/test/enter.js';
import userResult from './views/pages/test/userResult.js';

const Routes = {
    '/': enter,
    '/about': About,
    '/test': testQuestions,
    '/results': results,
    '/userResult': userResult
};

function router() {
    const headerContainer = document.getElementsByClassName('header-container')[0],
        contentContainer = document.getElementsByClassName('content-container')[0],
        header = new Header();

    header.render().then(html => headerContainer.innerHTML = html);

    const request = parseRequestURL(),
        parsedURL = `/${request.resource || ''}`,
        page = parsedURL !== '/about' && parsedURL !== '/test' ? new Routes[parsedURL]() :
            !window.sessionStorage.getItem('result') && window.sessionStorage.getItem('userInfo') ? new Routes[parsedURL]() : new Error404();

    page.render().then(html => {
        contentContainer.innerHTML = html;
        page.afterRender();
    });
}

module.hot ? module.hot.accept(router()) : window.addEventListener('load', router);
window.addEventListener('hashchange', router);