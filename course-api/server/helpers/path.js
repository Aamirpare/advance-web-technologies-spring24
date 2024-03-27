import {fileURLToPath} from 'url';
import path from 'path';

export default function getPublicPath(){
    //go back from helper to public
    const staticFilesFolder  = "../../public";
    return path.join(path.dirname(fileURLToPath(import.meta.url)), staticFilesFolder);
}

