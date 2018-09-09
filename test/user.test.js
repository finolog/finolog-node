import { assert } from 'chai';
import 'dotenv/config';
import { User } from '../src/index';

const user = new User(process.env.api_token);

describe('User', () => {
    const payload = { first_name: 'test first name', last_name: 'test last name' };

    it('get', (done) => {
        user.get().then(user => {
            assert.property(user, 'id');
            assert.property(user, 'first_name');
            assert.property(user, 'last_name');
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });

    it('update', (done) => {
        user.update(payload).then(user => {
           assert.equal(user.first_name, payload.first_name);
           assert.equal(user.last_name, payload.last_name);
           done();
        }).catch(error => {
            done(new Error(error));
        });
    });
});
