import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "eu-central-1_57mvV5N7n",
    ClientId: "snftpb6f6bsdaphl7rv34lnl" 
}

export default new CognitoUserPool(poolData);