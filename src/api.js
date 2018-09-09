import axios from 'axios';

class Api {
    constructor(apiToken) {
        this.apiToken = apiToken;
        this.api = axios.create({
            baseURL: 'https://api.finolog.ru/v1',
            headers: {'Api-Token': this.apiToken}
        })
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

export default Api;
