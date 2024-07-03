import * as bcrypt from 'bcrypt';

class CompareHash {
  async compareHash(password: string, hash: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hash);
      return isMatch;
    } catch (err) {
      return err;
    }
  }
}

const COMPARE_HASH = new CompareHash();
Object.freeze(COMPARE_HASH);
export default COMPARE_HASH;
