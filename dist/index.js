(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios')) :
    typeof define === 'function' && define.amd ? define(['exports', 'axios'], factory) :
    (factory((global['src/index'] = global['src/index'] || {}, global['src/index'].js = {}),global.axios));
}(this, (function (exports,axios) { 'use strict';

    axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

    class Api {
        constructor(apiToken) {
            this.apiToken = apiToken;
            this.api = axios.create({
                baseURL: 'https://api.finolog.ru/v1',
                headers: {'Api-Token': this.apiToken}
            });
        }

        validate(data, rules) {
            for (let key in rules) {
                if (rules.hasOwnProperty(key)) {
                    if (data.hasOwnProperty(key)) {
                        rules[key].split('|').forEach(rule => Api.rules(rule, key, data[key]));
                    } else if (/required/.test(rules[key])) {
                        throw SyntaxError(`the field '${key}' must be a required`);
                    }
                }
            }
        }

        static rules(rule, key, value) {
            const test = rule.split(':');

            switch (test[0]) {
                case 'number': {
                    if (typeof value !== 'number') {
                        throw SyntaxError(`the field ${key} must be a number`);
                    }
                    break;
                }
                case 'unsigned': {
                    if (value < 0) {
                        throw SyntaxError(`the field '${key}' must be unsigned`);
                    }
                    break;
                }
                case 'string': {
                    if (typeof value !== 'string') {
                        throw SyntaxError(`the field '${key}' must be string`);
                    }
                    break;
                }
                case 'email': {
                    if (!/.+@.+/.test(value)) {
                        throw SyntaxError(`the field '${key}' must be email`);
                    }
                    break;
                }
                case 'max': {
                    if (value.length > Number(test[1])) {
                        throw SyntaxError(`the field '${key}' must be no more ${test[1]}`);
                    }
                    break;
                }
                case 'min': {
                    if (value.length < Number(test[1])) {
                        throw SyntaxError(`the field '${key}' must be at least ${test[1]}`);
                    }
                    break;
                }
                case 'between': {
                    // example |between:9:12|
                    if (value.length < Number(test[1]) || value.length > Number(test[2])) {
                        throw SyntaxError(`the field ${key} must be less than ${test[1]} and not more than ${test[2]}`);
                    }
                }
            }
        }

        static except(obj, ...params) {
            params.forEach(param => {
                delete obj[param];
            });

            return obj;
        }
    }

    class User extends Api {
      constructor(apiToken) {
        super(apiToken);
      }

      get() {
        return this.api.get('/user').then(response => response.data)
      }

      update(payload = {}) {
        return this.api.put('/user', payload).then(response => response.data)
      }
    }

    class Currency extends Api {
        constructor(apiToken) {
            super(apiToken);
        }

        all() {
            return this.api.get('/currency').then(response => response.data);
        }
    }

    class Biz extends Api {
      constructor(apiToken) {
        super(apiToken);
      }

      get(payload = {}) {
        return this.api.get(`/biz/${payload.id}`).then(response => response.data);
      }

      all() {
        return this.api.get('/biz').then(response => response.data);
      }

      update(payload = {}) {
        return this.api.put(`/biz/${payload.id}`, Api.except(payload, 'id')).then(response => response.data);
      }

      add(payload = {}) {
        return this.api.post('/biz', payload).then(response => response.data);
      }

      delete(payload = {}) {
        return this.api.delete(`/biz/${payload.id}`).then(response => response.data);
      }
    }

    class Company extends Api {
        constructor(apiToken, biz_id = null) {
            super(apiToken);
            this.biz_id = biz_id;
        }

        get(payload = {}) {
            return this.api.get(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/company/${payload.id}`).then(response => response.data);
        }

        all(payload = {}) {
            return this.api.get(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/company`).then(response => response.data);
        }

        update(payload = {}) {
            return this.api
                .put(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/company/${payload.id}`, Api.except(payload, 'biz_id', 'id'))
                .then(response => response.data);
        }

        add(payload = {}) {
            return this.api
                .post(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/company`, Api.except(payload, 'biz_id'))
                .then(response => response.data);
        }

        delete(payload = {}) {
            return this.api.delete(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/company/${payload.id}`).then(response => response.data);
        }
    }

    class Account extends Api {
        constructor(apiToken, biz_id = null) {
            super(apiToken);
            this.biz_id = biz_id;
        }

        get(payload = {}) {
            return this.api
                .get(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/account/${payload.id}`)
                .then(response => response.data);
        }

        all(payload = {}) {
            return this.api
                .get(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/account`)
                .then(response => response.data);
        }

        update(payload = {}) {
            return this.api
                .put(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/account/${payload.id}`, Api.except(payload, 'biz_id', 'id'))
                .then(response => response.data);
        }

        add(payload = {}) {
            return this.api
                .post(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/account`, Api.except(payload, 'biz_id'))
                .then(response => response.data);
        }

        delete(payload = {}) {
            return this.api
                .delete(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/account/${payload.id}`)
                .then(response => response.data);
        }
    }

    class Transaction extends Api {
        constructor(apiToken, biz_id = null) {
            super(apiToken);
            this.biz_id = biz_id;
        }

        get(payload = {}) {
            return this.api
                .get(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/transaction/${payload.id}`)
                .then(response => response.data);
        }

        all(payload = {}) {
            return this.api
                .get(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/transaction`, Api.except(payload, 'biz_id'))
                .then(response => response.data);
        }

        update(payload = {}) {
            return this.api
                .put(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/transaction/${payload.id}`, Api.except(payload, 'biz_id', 'id'))
                .then(response => response.data);
        }

        add(payload = {}) {
            return this.api
                .post(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/transaction`, Api.except(payload, 'biz_id'))
                .then(response => response.data);
        }

        delete(payload = {}) {
            return this.api
                .delete(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/transaction/${payload.id}`)
                .then(response => response.data);
        }

        split(payload = {}) {
            return this.api
                .post(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/transaction/${payload.id}/split`, Api.except(payload, 'biz_id', 'id'))
                .then(response => response.data);
        }

        cancel(payload = {}) {
            return this.api
                .delete(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/transaction/${payload.id}/split`, Api.except(payload, 'biz_id', 'id'))
                .then(response => response.data);
        }
    }

    class Category extends Api {
        constructor(apiToken, biz_id = null) {
            super(apiToken);
            this.biz_id = biz_id;
        }

        get(payload = {}) {
            return this.api
                .get(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/category/${payload.id}`)
                .then(response => response.data);
        }

        all(payload = {}) {
            return this.api.get(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/category`).then(response => response.data);
        }

        update(payload = {}) {
            return this.api
                .put(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/category/${payload.id}`, Api.except(payload, 'biz_id', 'id'))
                .then(response => response.data);
        }

        add(payload = {}) {
            return this.api
                .post(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/category`, Api.except(payload, 'biz_id'))
                .then(response => response.data);
        }

        delete(payload = {}) {
            return this.api.delete(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/category/${payload.id}`).then(response => response.data);
        }
    }

    class Project extends Api {
        constructor(apiToken, biz_id = null) {
            super(apiToken);
            this.biz_id = biz_id;
        }

        get(payload = {}) {
            return this.api
                .get(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/project/${payload.id}`)
                .then(response => response.data);
        }

        all(payload = {}) {
            return this.api.get(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/project`).then(response => response.data);
        }

        update(payload = {}) {
            return this.api
                .put(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/project/${payload.id}`, Api.except(payload, 'biz_id', 'id'))
                .then(response => response.data);
        }

        add(payload = {}) {
            return this.api
                .post(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/project`, Api.except(payload, 'biz_id'))
                .then(response => response.data);
        }

        delete(payload = {}) {
            return this.api.delete(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/project/${payload.id}`).then(response => response.data);
        }
    }

    class Contractor extends Api {
      constructor(apiToken, biz_id = null) {
        super(apiToken);
        this.biz_id = biz_id;
      }

      get(payload = {}) {
        return this.api
          .get(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/contractor/${payload.id}`)
          .then(response => response.data);
      }

      all(payload = {}) {
        return this.api.get(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/contractor`).then(response => response.data);
      }

      update(payload = {}) {
        return this.api
          .put(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/contractor/${payload.id}`, Api.except(payload, 'biz_id', 'id'))
          .then(response => response.data);
      }

      add(payload = {}) {
        return this.api
          .post(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/contractor`, Api.except(payload, 'biz_id'))
          .then(response => response.data);
      }

      delete(payload = {}) {
        return this.api.delete(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/contractor/${payload.id}`).then(response => response.data);
      }
    }

    class Requisite extends Api {
        constructor(apiToken, biz_id = null) {
            super(apiToken);
            this.biz_id = biz_id;
        }

        get(payload = {}) {
           return this.api.get(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/requisite/${payload.id}`).then(response => response.data);
        }

        all(payload = {}) {
            return this.api.get(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/requisite`, Api.except(payload, 'biz_id')).then(response => response.data);
        }

        update(payload = {}) {
            return this.api
                .put(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/requisite/${payload.id}`, Api.except(payload, 'biz_id', 'id'))
                .then(response => response.data);
        }

        add(payload = {}) {
            return this.api
                .post(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/requisite`, Api.except(payload, 'biz_id'))
                .then(response => response.data);
        }

        delete(payload = {}) {
            return this.api.delete(`/biz/${payload.biz_id ? payload.biz_id : this.biz_id}/requisite/${payload.id}`).then(response => response.data);
        }
    }

    class Client extends Api {
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

    exports.default = Client;
    exports.Client = Client;
    exports.User = User;
    exports.Currency = Currency;
    exports.Biz = Biz;
    exports.Company = Company;
    exports.Account = Account;
    exports.Transaction = Transaction;
    exports.Category = Category;
    exports.Project = Project;
    exports.Contractor = Contractor;
    exports.Requisite = Requisite;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
