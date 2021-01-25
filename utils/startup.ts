import Settings from '../api/classes/Settings';
import User from '../api/classes/User';
import crypt from '../api/services/crypt';

export default async () => {
  const [firstSetup] = await Settings.find({
    key: 'firstSetup',
  });

  if (!firstSetup || !firstSetup.value) {
    const salt = crypt.generateSalt();
    const password = crypt.hash('verter', salt);

    await Promise.all([
      User.insert({
        name: 'Admin',
        username: 'admin',
        password,
        salt,
      }),
    ]);

    await Settings.insert({
      key: 'firstSetup',
      value: true,
    });
  }
};
