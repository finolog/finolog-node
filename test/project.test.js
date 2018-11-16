import { assert } from 'chai';
import { Project, Biz } from '../dist/index';
import 'dotenv/config';

const project = new Project(process.env.api_token);
const biz = new Biz(process.env.api_token);

describe('Project', () => {

    let bizId = null;
    let data = {};
    const names = ['test project', 'new test project'];

    before(done => {
        biz.all().then(biz => {
            assert.isArray(biz);
            bizId = biz[0].id;
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });

    it('add', done => {
        project.add({biz_id: bizId, name: names[0], currency_id: 1}).then(project => {
            assert.equal(project.name, names[0]);
            data = project;
            done();
        }).catch(error => {
           done(new Error(error));
        });
    });

    it('get', done => {
        project.get({biz_id: bizId, id: data.id}).then(project => {
            assert.property(project, 'id');
            assert.equal(project.id, data.id);
            data = project;
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });

    it('all', done => {
        project.all({biz_id: bizId}).then(projects => {
            assert.isArray(projects);
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });

    it('update', done => {
        project.update({biz_id: bizId, id: data.id, name: names[1]}).then(project => {
            assert.equal(project.name, names[1]);
            data = project;
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });

    it('delete', done => {
        project.delete({biz_id: bizId, id: data.id}).then(project => {
            assert.property(project, 'id');
            assert.isNotNull(project.deleted_at);
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });
});
