import AppError from '../utils/appError' ;
import axios from 'axios';

const saml = require('samlify');

class SamlAuthController {
  
    constructor() {
        super() ;
       
        this.getMetaDataInfo = this.getMetaDataInfo.bind(this);
    }

    async getMetaDataInfo(req, res, next) {
      
        let idp ;
        const uri_forti_metadata = 'http://fac.eavsrl.it/saml-idp/v7e5xv5te453dv0x/metadata/' ;

        try {
            let response = await axios.get( uri_forti_metadata ) ;
            idp = saml.IdentityProvider({
                metadata: response.data,
                isAssertionEncrypted: true,
                messageSigningOrder: 'encrypt-then-sign',
                wantLogoutRequestSigned: true
                }) ;
                
                if (response.data ) {                    
                    return next(new AppError(403, 'getAllRecipient', 'recipients does not exist'));
                }
                // console.log( idp ) ;
                // const sp = saml.ServiceProvider({
                //   entityID: 'http://localhost:3000/sso/metadata',
                // })
        } catch(err) {
            console.log(err) ;
        }           
        
        return res.status(200).json({
            status : "success",
            // idp: idp,
        })
    }
}
  
export default new SamlAuthController();