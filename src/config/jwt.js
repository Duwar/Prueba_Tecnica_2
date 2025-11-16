// 1. importaciones necesarias
import multer from "multer";
import path from "path"; // modulo de node
import fs from "fs"; // modulo de node
import { fileURLToPath } from "url"; // modulo de node

// Desarrollo de las funcionalidades 
const _filename = fileURLToPath(import.meta.url); //_filename = backend/src/config/multer
const _dirname = path.dirname(_filename); //_dirname = backend/src/config

// 1. Crear una carpeta donde se guarden los archivos subidos
const UPLOADS_FOLDER = path.join(_dirname, "../uploads");

// si no existe mi carpeta UPLOADS, creela
if(!fs.existsSync(UPLOADS_FOLDER)){
    fs.mkdirSync(UPLOADS_FOLDER)
}

//2. Especificar como vamos a guardas los archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        //donde vamos a guardar el archivo
        cb(null, UPLOADS_FOLDER);
    },
    filename:(req, file, cb)=>{
        const ext = path.extname(file.originalname);//extension -> .jpg, .pdf
        const base = path.basename(file.originalname, ext).replace(/\s+/g,"_"); // nombre 
        cb(null, `${base}-${Date.now()}${ext}`);//nombre del archivo
    }
});



//3. Que tipo de archivos vamos a recbir
const fileFilter = (req, file, cb) =>{
    const allowed = ["image/gif","image/png","image/jpeg","image/webp","image/svg+xml"];

    if(allowed.includes(file.mimetype)){
        cb(null, true) //- si el archivo es permitido lo guarde, en la carpeta UPLOADS
    }else{
        cb(new Error("Archivo no permitido"), false);
    }
    
}




//4. definir limites - tamaño de earchivo
const limits = {
    fileSize: 5*1024*1024 // 5Kb
}

//5. Exportar esas caracteristicas
//el unico obligatorio es storega
export const upload = multer({storage, fileFilter, limits});
