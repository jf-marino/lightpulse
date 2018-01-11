const defaultOptions = {
    method: 'GET',
    cache: 'default'
};

const ajax = (req) => new Observable((obs) => {
    fetch(req).then(res => {
        obs.next(res);
        obs.complete();
    }).catch(err => obs.error(err));
});

export const http = {
    get(url, options = {}) {
        const req = new Request(url, { ...defaultOptions, ...options, ...{ method: 'GET' } });
        return ajax(req);
    },
    post(url, body, options = {}) {
        const req = new Request(
            url,
            { ...defaultOptions, ...options, ...{ method: 'POST', body } });
        return ajax(req);
    },
    put(url, body, options = {}) {
        const req = new Request(
            url,
            { ...defaultOptions, ...options, ...{ method: 'PUT', body } });
        return ajax(req);
    },
    patch(url, body, options = {}) {
        const req = new Request(
            url,
            { ...defaultOptions, ...options, ...{ method: 'PATCH', body } });
        return ajax(req);
    },
    delete(url, options = {}) {
        const req = new Request(
            url,
            { ...defaultOptions, ...options, ...{ method: 'DELETE' } });
        return ajax(req);
    }
};
