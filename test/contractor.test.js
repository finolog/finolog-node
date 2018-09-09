import { assert } from 'chai';
import 'dotenv/config';
import { Contractor, Biz } from '../src/index';

const contractor = new Contractor(process.env.api_token);
const biz = new Biz(process.env.api_token);

describe('Contractor', () => {

    let bizId = null;
    let data = {};

    before(done => {
        biz.all().then(biz => {
            assert.property(biz[0], 'id');
            bizId = biz[0].id;
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });

   it('add', done => {
       contractor.add({
           biz_id: bizId,
           name: 'test contractor'
       }).then(contractor => {
           assert.equal('test contractor', contractor.name);
           data = contractor;
           done();
       }).catch(error => {
           done(new Error(error));
       })
   });

   it('get', done => {
       contractor.get({biz_id: bizId, id: data.id}).then(contractor => {
           assert.property(contractor, 'id');
           assert.equal(contractor.id, data.id);
           data = contractor;
           done();
       }).catch(error => {
          done(new Error(error));
       });
   });

   it('all', done => {
       contractor.all({biz_id: bizId}).then(contractors => {
           assert.isArray(contractors, 'contractors must be array');
           done();
       }).catch(error => {
           done(new Error(error));
       });
   });

   it('update', done => {
       contractor.update({biz_id: bizId, id: data.id, name: 'new test contractor'}).then(contractor => {
           assert.equal('new test contractor', contractor.name);
           data = contractor;
           done();
       }).catch(error => {
          done(new Error(error));
       });
   });

   it('delete', done => {
       contractor.delete({biz_id: bizId, id: data.id}).then(contractor => {
           assert.property(contractor, 'deleted_at', 'there is no \'deleted_at\' field');
           assert.isNotNull(contractor.deleted_at, 'deleted_at don\'t null');
           done();
       }).catch(error => {
          done(new Error(error));
       });
   });
});
