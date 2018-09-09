import Api from '../api';

export default class Biz extends Api {
  constructor(apiToken) {
    super(apiToken);
  }

  get(payload = {}) {
    return this.api.get(`/biz/${payload.id}`).then(response => response.data);
  }

  all() {
    return this.api.get('/biz').then(response => response.data);
  }

  update(payload = {}) {
    return this.api.put(`/biz/${payload.id}`, Api.except(payload, 'id')).then(response => response.data);
  }

  add(payload = {}) {
    return this.api.post('/biz', payload).then(response => response.data);
  }

  delete(payload = {}) {
    return this.api.delete(`/biz/${payload.id}`).then(response => response.data);
  }
}
