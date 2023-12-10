
exports.gethomePage = (request, response, next) => {
    response.sendFile('sign-up.html', { root: 'views' });
}
exports.geterrorPage = (request,response,next) =>{
    response.sendFile('notFound.html',{root:'views'});
}

