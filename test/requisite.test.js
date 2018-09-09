import { assert } from 'chai';
import { Requisite, Biz, Contractor } from '../src/index';
import 'dotenv/config';

const requisite = new Requisite(process.env.api_token);
const biz = new Biz(process.env.api_token);
const contractor = new Contractor(process.env.api_token);

describe('Requisite', () => {

    let bizId = null;
    let contractorId = null;
    let data = {};

    const names = ['test requisite', 'new test requisite'];

    before(done => {
        biz.all().then(biz => {
            assert.isArray(biz);
            bizId = biz[0].id;
            contractor.all({ biz_id: bizId }).then(contractors => {
                assert.isArray(contractors);
                contractorId = contractors[0].id;
                done();
            }).catch(error => {
               done(new Error(error));
            });
        }).catch(error => {
            done(new Error(error));
        });
    });

    it('add', done => {
        requisite.add({ biz_id: bizId, name: names[0], contractor_id: contractorId }).then(requisite => {
            assert.equal(requisite.name, names[0]);
            data = requisite;
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });

    it('get', done => {
       requisite.get({biz_id: bizId, id: data.id}).then(requisite => {
           assert.property(requisite, 'id');
           assert.equal(requisite.id, data.id);
           data = requisite;
           done();
       }).catch(error => {
           done(new Error(error));
       });
    });

    it('all', done => {
        requisite.all({biz_id: bizId}).then(requisites => {
           assert.isArray(requisites);
           done();
        }).catch(error => {
            done(new Error(error));
        });
    });

    it('update', done => {
        requisite.update({biz_id: bizId, id: data.id, name: names[1]}).then(requisite => {
            assert.equal(requisite.name, names[1]);
            data = requisite;
            done();
        }).catch(error => {
           done(new Error(error));
        });
    });

    it('delete', done => {
        requisite.delete({biz_id: bizId, id: data.id}).then(requisite => {
            assert.property(requisite, 'deleted_at');
            assert.isNotNull(requisite.deleted_at);
            done();
        }).catch(error => {
           done(new Error(error));
        });
    });
});
