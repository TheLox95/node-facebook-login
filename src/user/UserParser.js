"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
class UserParser {
    fromFacebookResponse(res) {
        return new User_1.default(res.name.split(" ")[0], res.email, res.name.split(" ")[0], res.name.split(" ")[1], res.phone, 
        // TODO: fix profile image            
        res.second_name, "USER", undefined, undefined, res.id);
    }
    fromFormBody(body) {
        return new User_1.default(body.userName, body.email, body.first_name, body.second_name, body.phone, 
        // TODO: fix profile image
        body.second_name, "USER", body.zip_code, body.password);
    }
    fromSqlResult(sqlResult) {
        const rowResult = sqlResult[0];
        return new User_1.default(rowResult.username, rowResult.email, rowResult.first_name, rowResult.second_name, rowResult.phone, rowResult.img_profile, rowResult.user, rowResult.zip_code, rowResult.password, rowResult.user_id);
    }
}
exports.default = UserParser;
