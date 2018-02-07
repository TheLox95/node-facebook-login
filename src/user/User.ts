export default class User{
    
    constructor(private _nickName: string,
        private _email: string,
        private _firstName: string,
        private _secondName: string,
        private _phone: string,
        private _profileImg: string,
        private _status: string,
        private _zipCode?: string,
        private _password?: string,        
        private _id?: string){}


        getId(){
            return this._id
        }
        getNickname(){
            return this._nickName
        }
        getPassword(){
            return this._password
        }
        getEmail(){
            return this._email
        }
        getFirstName(){
            return this._firstName
        }
        getSecondName(){
            return this._secondName
        }
        getPhone(){
            return this._phone
        }
        getProfileImg(){
            return this._profileImg
        }
        setProfileImg(profileImg: string){
            this._profileImg = profileImg;
        }

        getStatus(){
            return this._status
        }
        getZipCode(){
            return this._zipCode
        }

    
}