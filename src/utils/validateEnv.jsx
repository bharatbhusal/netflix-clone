import { cleanEnv, str } from "envalid";

export default cleanEnv(process.env, {
    REACT_APP_API_KEY: str(),
    REACT_APP_BASE_URL:str(),
    REACT_APP_BANNER_URL:str(),
    REACT_APP_IMAGE_URL: str(),
});


