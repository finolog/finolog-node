import Api from '../api';

export default class User extends Api {
  constructor(apiToken) {
    super(apiToken);
  }

  get() {
    return this.api.get('/user').then(response => response.data)
  }

  update(payload = {}) {
    return this.api.put('/user', payload).then(response => response.data)
  }
}
