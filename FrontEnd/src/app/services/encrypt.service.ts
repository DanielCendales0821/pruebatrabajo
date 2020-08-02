import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Environment } from 'src/environment/environments';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  public keyword: any = [];
  public logindata: any = [];
  public user: User;
  constructor() { }

  public setValue(value: any) {
    let ciphertext: any = [];
    ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), Environment.clientEncryptionStorageValue);
    sessionStorage.setItem(Environment.clientEncryptionStorageValue, ciphertext);
    return ciphertext;
  }

  /*
   * this function get token of local Storage
   */

  public getValue() {
    const variable = sessionStorage.getItem(Environment.clientEncryptionStorageValue);
    if (variable === null) {
      return this.user = new User();
    } else {
      const bytes = CryptoJS.AES.decrypt(variable.toString(), Environment.clientEncryptionStorageValue);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    }
  }

  /*
   * this function get token  of local Storage
   */
  public token() {
    const variable = sessionStorage.getItem(Environment.clientEncryptionStorageValue);
    if (variable === null) {
      return '';
    } else {
      const bytes = CryptoJS.AES.decrypt(variable.toString(), Environment.clientEncryptionStorageValue);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData.token;
    }

  }



}
