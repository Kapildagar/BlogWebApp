import Router from 'express'
import Auth from '../middleware/Auth.middleware.js';
import { Create_Blog, get_All_Blog } from '../controller/Blog.controller.js';
import { upload } from '../middleware/muter.middlerware.js';
const blog =Router();



blog.route('/create_blog').post(Auth,upload.single('blog_img'),Create_Blog)
blog.route('/all_blog').get(get_All_Blog);

export default blog


