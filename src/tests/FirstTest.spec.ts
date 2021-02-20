import { User } from '../models/User';

test('it should be ok', () => {
  const user = new User();

  user.name = 'Pedro';

  expect(user.name).toEqual('Pedro');
});
