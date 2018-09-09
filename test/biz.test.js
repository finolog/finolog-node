import { assert } from 'chai';
import { Biz } from '../src/index';
import 'dotenv/config';


const biz = new Biz(process.env.api_token);

describe('Biz', () => {

    let data = {};

    it('add', done => {
        biz.add({name: 'test biz', base_currency_id: 1}).then(biz => {
            assert.equal('test biz', biz.name);
            data = biz;
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });

    it('get', done => {
        biz.get({ id: data.id }).then(biz => {
            assert.property(biz, 'id');
            assert.equal(biz.id, data.id);
            data = biz;
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });

    it('all', done => {
        biz.all().then(biz => {
            assert.isArray(biz, 'biz must be array');
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });


    it('update', done => {
        biz.update({id: data.id, name: 'new test biz'}).then(biz => {
            assert.equal('new test biz', biz.name);
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });


    it('delete', done => {
        biz.delete({ id: data.id }).then(response => {
            assert.isOk(response.success);
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });
});
