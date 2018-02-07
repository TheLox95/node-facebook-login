"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(_nickName, _email, _firstName, _secondName, _phone, _profileImg, _status, _zipCode, _password, _id) {
        this._nickName = _nickName;
        this._email = _email;
        this._firstName = _firstName;
        this._secondName = _secondName;
        this._phone = _phone;
        this._profileImg = _profileImg;
        this._status = _status;
        this._zipCode = _zipCode;
        this._password = _password;
        this._id = _id;
    }
    getId() {
        return this._id;
    }
    getNickname() {
        return this._nickName;
    }
    getPassword() {
        return this._password;
    }
    getEmail() {
        return this._email;
    }
    getFirstName() {
        return this._firstName;
    }
    getSecondName() {
        return this._secondName;
    }
    getPhone() {
        return this._phone;
    }
    getProfileImg() {
        return this._profileImg;
    }
    setProfileImg(profileImg) {
        this._profileImg = profileImg;
    }
    getStatus() {
        return this._status;
    }
    getZipCode() {
        return this._zipCode;
    }
}
exports.default = User;
