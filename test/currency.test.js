import { assert } from 'chai';
import { Currency } from '../dist/index';
import 'dotenv/config';

const currency = new Currency(process.env.api_token);

describe('Currency', () => {
   it('all', (done) => {
       currency.all().then(currency => {
           assert.isArray(currency);
           done();
       }).catch(error => {
           done(new Error(error));
       })
   });
});
