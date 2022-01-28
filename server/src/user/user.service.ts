import {Injectable} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {User, UserDocument} from "./user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {UpdateUserDto} from "./dto/update-user.dto";
import {FileDescription, FileService, FileType} from "../file/file.service";
import {PostDocument, Post} from "../post/post.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(Post.name) private postModel: Model<PostDocument>,
                private fileService: FileService) {}

    async deleteUserPosts(user) {
        const posts = await this.postModel.find({author: user._id});
        posts.forEach((post) => {
            this.fileService.removeFile(post.images);
        });
        return this.postModel.deleteMany({author: user._id});
    }

    async getUsers(): Promise<User[]> {
        return this.userModel.find();
    }

    async getUserById(id): Promise<User> {
        return this.userModel.findById(id);
    }

    async getUserByName(username) {
        return this.userModel.find({username: username});
    }

    async createUser(dto: CreateUserDto, image): Promise<User> {
        const user = await this.userModel.create({...dto});
        user.avatarUrl = this.fileService.saveFiles(FileType.IMAGE, FileDescription.AVATAR, image, user.username).join();
        await user.save();
        return user;
    }

    async deleteUser(id: ObjectId): Promise<ObjectId> {
        const user = await this.userModel.findByIdAndDelete(id);
        let deletePostsResult;
        this.deleteUserPosts(user).then((result) => {deletePostsResult = result}).catch((e) => {return e.message});
        this.fileService.removeFile([user.avatarUrl]);
        return user._id;
    }

    async updateUser(id: ObjectId, dto: UpdateUserDto): Promise<User>{
        return this.userModel.findByIdAndUpdate(id, dto);
    }
}
