import Api from '../api';
import User from './User';
import Currency from './Currency';
import Biz from './Biz';
import Company from './Company';
import Account from './Account';
import Transaction from './Transaction';
import Category from './Category';
import Project from './Project';
import Contractor from './Contractor';
import Requisite from './Requisite';

export default class Finolog extends Api {
    constructor(apiToken, biz_id = null) {
        super(apiToken);
        this.user = new User(this.apiToken);
        this.biz = new Biz(this.apiToken);
        this.currency = new Currency(this.apiToken);
        this.company = new Company(this.apiToken, biz_id);
        this.account = new Account(this.apiToken, biz_id);
        this.transaction = new Transaction(this.apiToken, biz_id);
        this.category = new Category(this.apiToken, biz_id);
        this.project = new Project(this.apiToken, biz_id);
        this.contractor = new Contractor(this.apiToken, biz_id);
        this.requisite = new Requisite(this.apiToken, biz_id);
    }

    request(method, url, payload = {}) {
        return this.api[method](url, payload).then(response => response.data);
    }
}
