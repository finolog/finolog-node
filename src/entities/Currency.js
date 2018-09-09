import Api from '../api';

export default class Currency extends Api {
    constructor(apiToken) {
        super(apiToken);
    }

    all() {
        return this.api.get('/currency').then(response => response.data);
    }
}
