import { assert } from 'chai';
import 'dotenv/config';
import { Transaction, Biz, Account } from '../src/index';

const transaction = new Transaction(process.env.api_token);
const biz = new Biz(process.env.api_token);
const account = new Account(process.env.api_token);

describe('Transaction', () => {

    let bizId = null;
    let accountId = null;
    let data = {};
    let split = [];
    const values = [1000, 500];

    before(done => {
        biz.all().then(biz => {
            assert.isArray(biz);
            bizId = biz[0].id;
            account.all({ biz_id: bizId }).then(account => {
                assert.isArray(account);
                accountId = account[0].id;
                done();
            }).catch(error => {
                done(new Error(error));
            });
        }).catch(error => {
            done(new Error(error));
        });
    });

   it('add an expense operation', done => {
      transaction.add({ biz_id: bizId, from_id: accountId, date: '2018-01-01', value: values[0] }).then(transaction => {
          assert.equal(transaction.value, -values[0]);
          data = transaction;
          done();
      }).catch(error => {
         done(new Error(error));
      });
   });

    it('add a receipt operation', done => {
        transaction.add({ biz_id: bizId, to_id: accountId, date: '2018-01-01', value: values[0] }).then(transaction => {
            assert.equal(transaction.value, values[0]);
            data = transaction;
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });

   it('get', done => {
       transaction.get({ biz_id: bizId, id: data.id }).then(transaction => {
           assert.property(transaction, 'id');
           assert.equal(transaction.id, data.id);
           data = transaction;
           done();
       }).catch(error => {
          done(new Error(error));
       });
   });


   it('all', done => {
      transaction.all({ biz_id: bizId }).then(transactions => {
          assert.isArray(transactions);
          done();
      }).catch(error => {
         done(new Error(error));
      });
   });

   it('update', done => {
       transaction.update({ biz_id: bizId, id: data.id, value: values[1] }).then(transaction => {
           assert.equal(transaction.value, values[1]);
           data = transaction;
           done();
       }).catch(error => {
           done(new Error(error));
       });
   });

   it('split', done => {
      transaction.split({
          biz_id: bizId,
          id: data.id,
          items: [
              { value: data.value - 200 },
              { value: 200 }
          ]
      }).then(transactions => {
          assert.isArray(transactions);
          split = transactions;
          done();
      }).catch(error => {
          done(new Error(error));
      })
   });

   it('cancel', done => {
       transaction.cancel({ biz_id: bizId, id: split[0].split_id }).then(transaction => {
           assert.equal(transaction.transaction.id, split[0].split_id);
           assert.property(transaction, 'deleted_ids');
           assert.isArray(transaction.deleted_ids, 'deleted_ids');
           assert.deepEqual(transaction.deleted_ids, [split[1].id, split[0].id]);
           done();
       }).catch(error => {
           done(new Error(error));
       });
   });

    it('delete', done => {
        transaction.delete({ biz_id: bizId, id: data.id }).then(response => {
            assert.isOk(response.success);
            done();
        }).catch(error => {
            done(new Error(error));
        });
    });
});
