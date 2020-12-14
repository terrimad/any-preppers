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
    const item = this.storage.getItem(`anypreppers.io:${ key }`) || null;
    return JSON.parse(item);
  };

  remove = (key) => this.storage.removeItem(`anypreppers.io:${ key }`);

  set = (key, item) => {
    if (typeof item !== undefined) {
      if (typeof item === 'object' || typeof item === 'string') {
        this.storage.setItem(`anypreppers.io:${ key }`, JSON.stringify(item));
      } else {
        this.storage.setItem(`anypreppers.io:${ key }`, item);
      }
    }
  };

  clear = () => this.storage.clear();
}