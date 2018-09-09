import { assert } from 'chai';
import 'dotenv/config';
import { Account, Biz, Company } from '../src/index';

const account = new Account(process.env.api_token);
const biz = new Biz(process.env.api_token);
const company = new Company(process.env.api_token);

describe('Account', () => {
   let bizId = {};
   let companyId = {};
   let data = {};

   before(done => {
       biz.all().then(biz => {
           assert.isArray(biz);
           bizId = biz[0].id;
           company.all({biz_id: bizId}).then(company => {
               assert.isArray(company);
               companyId = company[0].id;
               done();
           }).catch(error => {
               done(new Error(error));
           });
       }).catch(error => {
           done(new Error(error));
       });
   });

   it('add', done => {
      account.add({
          biz_id: bizId,
          company_id: companyId,
          currency_id: 1,
          name: 'test account',
          initial_balance: 1000
      }).then(account => {
          assert.equal(account.name, 'test account');
          assert.equal(account.currency_id, 1);
          assert.equal(account.initial_balance, 1000);
          data = account;
          done();
      }).catch(error => {
         done(new Error(error));
      });
   });

   it('get', done => {
      account.get({biz_id: bizId, id: data.id}).then(account => {
          assert.property(account, 'id');
          data = account;
          done();
      }).catch(error => {
          done(new Error(error));
      });
   });

   it('all', done => {
      account.all({biz_id: bizId}).then(account => {
          assert.isArray(account);
          done();
      }).catch(error => {
         done(new Error(error));
      });
   });

   it('update', done => {
       account.update({biz_id: bizId, id: data.id, name: 'new test account'}).then(account => {
           assert.equal(account.name, 'new test account');
           data = account;
           done();
       }).catch(error => {
          done(new Error(error));
       });
   });

   it('delete', done => {
      account.delete({biz_id: bizId, id: data.id}).then(response => {
          assert.isOk(response.success);
          done();
      }).catch(error => {
         done(new Error(error));
      });
   });
});
