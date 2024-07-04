import * as bcrypt from 'bcrypt';

const SALT_OR_ROUNDS = 10;

class HashString {
  async getHashStrng(HashString: string) {
    await bcrypt.genSalt(SALT_OR_ROUNDS, (err, salt) => {
      if (err) throw new Error(err.message);
      console.log(salt);
    });

    const hash = await bcrypt.hash(HashString, SALT_OR_ROUNDS);
    return hash.toString();
  }
}

const HASHED_STRING = new HashString();
Object.freeze(HASHED_STRING);
export default HASHED_STRING;
