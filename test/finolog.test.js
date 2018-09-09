import { assert } from 'chai';
import 'dotenv/config';
import Finolog, { User, Biz, Currency, Company, Account, Transaction, Category, Project, Contractor, Requisite} from '../src/index';


describe('Finolog', () => {
    describe('Request', () => {
        const payload = { first_name: 'Request first name', last_name: 'Request last name' };
        const finolog = new Finolog(process.env.api_token);

        it('get user', done => {
            finolog.request('get', '/user').then(user => {
                assert.property(user, 'id');
                done();
            }).catch(error => {
                done(new Error(error));
            });
        });

        it('update user', done => {
            finolog.request('put', '/user', payload).then(user => {
                assert.equal(user.first_name, payload.first_name);
                assert.equal(user.last_name, payload.last_name);
                done();
            }).catch(error => {
                done(new Error(error));
            });
        });
    });

    describe('Entities', () => {
        const finolog = new Finolog(process.env.api_token);

       it('User', done => {
          assert.instanceOf(finolog.user, User, 'instance of User');
          done();
       });

       it('Biz', done => {
           assert.instanceOf(finolog.biz, Biz, 'instance of Biz');
           done();
       });

        it('Currency', done => {
            assert.instanceOf(finolog.currency, Currency, 'instance of Currency');
            done();
        });

        it('Company', done => {
            assert.instanceOf(finolog.company, Company, 'instance of Company');
            done();
        });

        it('Account', done => {
            assert.instanceOf(finolog.account, Account, 'instance of Account');
            done();
        });

        it('Transaction', done => {
            assert.instanceOf(finolog.transaction, Transaction, 'instance of Transaction');
            done();
        });

        it('Category', done => {
            assert.instanceOf(finolog.category, Category, 'instance of Category');
            done();
        });

        it('Project', done => {
            assert.instanceOf(finolog.project, Project, 'instance of Project');
            done();
        });

        it('Contractor', done => {
            assert.instanceOf(finolog.contractor, Contractor, 'instance of Contractor');
            done();
        });

        it('Requisite', done => {
            assert.instanceOf(finolog.requisite, Requisite, 'instance of Requisite');
            done();
        });
    });

    describe('Finolog with bizId in constructor', () => {
        let finolog;

        before(done => {
            const biz = new Biz(process.env.api_token);
            biz.all().then(biz => {
                assert.isArray(biz);
                finolog = new Finolog(process.env.api_token, biz[0].id);
                done();
            }).catch(error => {
                done(new Error(error));
            });
        });

        describe('Company', () => {
            it('all', done => {
                finolog.company.all().then(company => {
                    assert.isArray(company);
                    done();
                }).catch(error => {
                    done(new Error(error))
                });
            });
        });

        describe('Account', () => {
            it('all', done => {
                finolog.account.all().then(accounts => {
                    assert.isArray(accounts);
                    done();
                }).catch(error => {
                    done(new Error(error));
                });
            });
        });

        describe('Transaction', () => {
            it('all', done => {
                finolog.transaction.all().then(transactions => {
                    assert.isArray(transactions);
                    done();
                }).catch(error => {
                    done(new Error(error));
                });
            });
        });

        describe('Category', () => {
            it('all', done => {
                finolog.category.all().then(category => {
                    assert.isArray(category);
                    done();
                }).catch(error => {
                    done(new Error(error));
                });
            });
        });

        describe('Project', () => {
            it('all', done => {
                finolog.project.all().then(project => {
                    assert.isArray(project);
                    done();
                }).catch(error => {
                    done(new Error(error))
                });
            });
        });

        describe('Contractor', () => {
            it('all', done => {
                finolog.contractor.all().then(contractors => {
                    assert.isArray(contractors);
                    done();
                }).catch(error => {
                    done(new Error(error))
                });
            });
        });

        describe('Requisite', () => {
            it('all', done => {
                finolog.requisite.all().then(requisites => {
                    assert.isArray(requisites);
                    done();
                }).catch(error => {
                    done(new Error(error))
                });
            });
        });
    });
});
