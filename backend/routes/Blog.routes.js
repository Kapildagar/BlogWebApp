import Router from 'express'
import Auth from '../middleware/Auth.middleware.js';
import { All_user_Blog, Create_Blog, Delete_Blog, Update_Blog, getBlogDetails, get_All_Blog } from '../controller/Blog.controller.js';
import { upload } from '../middleware/muter.middlerware.js';
const blog =Router();



blog.route('/create_blog').post(Auth,upload.single('blog_img'),Create_Blog)
blog.route('/all_blog').get(get_All_Blog);
blog.route('/update_blog/:id').post(Auth,upload.single('blog_img'),Update_Blog);
blog.route('/delete_blog/:id').delete(Auth,Delete_Blog);
blog.route('/getUserBlog/:id').get(Auth,All_user_Blog);
blog.route('/getBlog/:id').get(getBlogDetails);

export default blog


