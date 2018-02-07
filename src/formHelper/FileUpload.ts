import User from "../user/User";

export default function handleImageUpload(req: Express.Request, res: Express.Response, user: User): Promise<string>{

    if (!req.files) {
        return Promise.reject("There is no image on the form");
    }

    return new Promise((resolve, rejected) =>{
        let sampleFile = req.files.img_profile;

        const fileName = user.getNickname()+"."+sampleFile.mimetype.split("/")[1];

        if (Array.isArray(sampleFile)) {
            sampleFile = sampleFile[0];
        }

        sampleFile.mv(`./public/images/${fileName}`, function (err) {
            if (err){
                rejected((new Map()).set("img_profile", err));
            }

            resolve(fileName)
        });
    });

}