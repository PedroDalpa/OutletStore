import User from '../models/User';

export default {
  render(user: User) {
    return {
      id: user.id,
      email: user.email,
      accessLevel: user.access_level
    };
  },
  renderMany(users: User[]) {
    return users.map(user => this.render(user));
  }
};
