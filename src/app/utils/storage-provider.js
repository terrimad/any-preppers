export default class {
  session = new Storage('session');
  local = new Storage('local');
}

class Storage {
  constructor (type) {
    if (type === 'session') {
      this.storage = sessionStorage;
    } else {
      this.storage = localStorage;
    }
  }

  get = (key) => {
    const item = this.storage.getItem(key) || null;
    return JSON.parse(item);
  };

  remove = (key) => this.storage.removeItem(key);

  add = (key, item) => {
    if (typeof item !== undefined) {
      this.storage.setItem(key, item);
    }
  };

  clear = () => this.storage.clear();
}