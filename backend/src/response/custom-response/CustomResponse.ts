import { ICustomResponse } from '../custom-response/ICustomResponse';
import CUSTOM_CODE from '../../utils/CustomMessage';

class CustomResponse {
  getCustomResponse(code: number, message: string, data: any) {
    const response: ICustomResponse = {
      code: CUSTOM_CODE.getResponseCode(code),
      message: message,
      data: data,
    };
    return response;
  }
}

const CUSTOM_RESPONSE = new CustomResponse();
Object.freeze(CUSTOM_RESPONSE);
export default CUSTOM_RESPONSE;
