class Permissions {
  async contains(permissions = [], origins = []) {
    return (await browser.permissions.contains({ permissions, origins }));
  }

  async request(permissions = [], origins = []) {
    const result = await this.contains(permissions, origins);
    if (result) {
      return result;
    }
    return (await browser.permissions.request({ permissions, origins }));
  }

  async remove(permissions = [], origins = []) {
    await browser.permissions.remove({ permissions, origins });
  }
}

const permissions = new Permissions();
export default permissions;