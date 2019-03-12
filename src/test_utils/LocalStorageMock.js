// Use with:
// import LocalStorageMock from "../test_utils/LocalStorageMock"
// global.localStorage = new LocalStorageMock;

class LocalStorageMock {
  constructor() {
    this.assembly = {};
  }

  clear() {
    this.assembly = {};
  }

  getItem(key) {
    return this.assembly[key] || null;
  }

  setItem(key, value) {
    this.assembly[key] = value.toString();
  }

  removeItem(key) {
    delete this.assembly[key];
  }
};

export default LocalStorageMock
