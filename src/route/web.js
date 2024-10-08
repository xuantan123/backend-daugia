import express from 'express';
import { upload } from '../middleware/multerConfig.js';
import { handleSignUpUser } from '../controllers/user/signupuserController.js';
import { handleLoginUser } from '../controllers/user/signinuserController.js';
import { handleProfileUser, handleEditProfileUser } from '../controllers/user/profileuserControllers.js';
import { handleSignUpAuthor } from '../controllers/author/signupauthorController.js';
import { handleLoginAuthor } from '../controllers/author/signinauthorController.js';
import { handleProfileAuthor, handleEditProfileAuthor } from '../controllers/author/profileauthorController.js';
import { handleEmailUser } from '../controllers/user/EmailUserControllers.js';
import { handlEmailAuthor } from '../controllers/author/EmailAuthorController.js';
import { deleteProduct, editProduct, processProduct, getProduct , getImage , getAllProductsByEmail , getAllImagesByEmail } from '../controllers/author/productController.js';
import { getUserStats , getUserDetails, getAuthorProduct  } from '../controllers/admin/adminController.js';
const router = express.Router();

const initWebRoutes = (app) => {
    router.post('/api/signupuser', handleSignUpUser);
    router.post('/api/loginuser', handleLoginUser);
    router.route('/api/profileuser/:email')
        .post(handleProfileUser)
        .get(handleEmailUser);
    router.post('/api/profileuser', handleProfileUser);
    router.put('/api/profileuser/:id', handleEditProfileUser);

    router.post('/api/signupauthor', handleSignUpAuthor);
    router.post('/api/loginauthor', handleLoginAuthor);
    router.post('/api/profileauthor/:email', handleProfileAuthor);
    router.get('/api/profileauthor/:email', handlEmailAuthor);
    router.post('/api/profileauthor', handleProfileAuthor);
    router.put('/api/profileauthor/:id', handleEditProfileAuthor);

    router.post('/api/products', upload.single('image'), processProduct);
    router.get('/api/images/:filename', getImage);
    router.get('/api/products/:email', getProduct);
    router.put('/api/products/:id', upload.single('image'), editProduct);
    router.delete('/api/products/:id', deleteProduct);
    
    router.get('/api/admin/stats', getUserStats);
    router.get('/api/admin/details', getUserDetails);
    router.get('/api/admin/products', getAuthorProduct);
    
    router.get('/', (req, res) => {
        res.send('Welcome to the API');
    });

    app.use("/", router);
};

export default initWebRoutes;
