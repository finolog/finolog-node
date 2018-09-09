import { assert } from 'chai';
import { Company, Biz } from '../src/index';
import 'dotenv/config';

const company = new Company(process.env.api_token);
const biz = new Biz(process.env.api_token);

describe('Company', () => {

    let bizId = null;
    let data = {};

    before(done => {
        biz.all().then(biz => {
            bizId = biz[0].id;
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });

    it('add', done => {
       company.add({biz_id: bizId, name: 'test company'}).then(company => {
           assert.equal(company.name, 'test company');
           data = company;
           done();
       }).catch(error => {
          done(new Error(error));
       });
    });

    it('get', done => {
      company.get({biz_id: bizId, id: data.id}).then(company => {
          assert.property(company, 'id');
          assert.equal(company.id, data.id);
          data = company;
          done();
      }).catch(error => {
          done(new Error(error));
      });
    });

    it('all', done => {
        company.all({biz_id: bizId}).then(company => {
            assert.isArray(company);
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });

    it('update', done => {
        company.update({biz_id: bizId, id: data.id, name: 'new test company'}).then(company => {
            assert.equal(company.name, 'new test company');
            data = company;
            done();
        }).catch(error => {
           done(new Error(error));
        });
    });

    it('delete', done => {
       company.delete({biz_id: bizId, id: data.id}).then(response => {
           assert.isOk(response.success);
           done();
       }).catch(error => {
          done(new Error(error));
       });
    });


});
