class Shared {
  constructor() {
    this.backgroundPage = false;
  }
  
  setBackgroundPage(backgroundPage) {
    this.backgroundPage = backgroundPage;
  }

  isBackgroundPage() {
    return !!this.backgroundPage;
  }
}

const shared = new Shared();
export default shared;