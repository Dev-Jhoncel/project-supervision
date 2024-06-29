class CustomCode {
  getResponseCode(code: number) {
    switch (code) {
      case 200:
        return 'SUCCESS';
      case 201:
        return 'CREATED';
      case 404:
        return 'NO_DATA_FOUND';
      case 400:
        return 'INVALID_CREDENTIALS';
      case 500:
        return 'INTERNAL_SERVER_ERROR';
      default:
        return 'NOT_DEFINE_CODE';
    }
  }
}

const CUSTOM_CODE = new CustomCode();
Object.freeze(CUSTOM_CODE);
export default CUSTOM_CODE;
