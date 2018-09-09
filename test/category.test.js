import { assert } from 'chai';
import 'dotenv/config';
import { Category, Biz } from '../src/index';

const category = new Category(process.env.api_token);
const biz = new Biz(process.env.api_token);

describe('Category', () => {
    let bizId = {};
    let data = {};
    const names = ['test category', 'new test category'];

    before(done => {
        biz.all().then(biz => {
            bizId = biz[0].id;
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });

    it('add', done => {
        category.add({biz_id: bizId, name: names[0], type: 'in'}).then(category => {
            assert.equal(category.name, names[0]);
            data = category;
            done();
        }).catch(error => {
           done(new Error(error));
        });
    });

    it('get', done => {
        category.get({biz_id: bizId, id: data.id}).then(category => {
            assert.property(category, 'id');
            assert.equal(category.id, data.id);
            data = category;
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });

    it('all', done => {
       category.all({biz_id: bizId}).then(category => {
           assert.isArray(category);
           done();
       }).catch(error => {
          done(new Error(error));
       });
    });

    it('update', done => {
       category.update({biz_id: bizId, id: data.id, name: names[1]}).then(category => {
           assert.equal(category.name, names[1]);
           data = category;
           done();
       }).catch(error => {
           done(new Error(error));
       });
    });

    it('delete', done => {
       category.delete({biz_id: bizId, id: data.id}).then(category => {
           assert.property(category, 'deleted_at');
           assert.isNotNull(category.deleted_at);
           done();
       }).catch(error => {
           done(new Error(error));
       });
    });
});
