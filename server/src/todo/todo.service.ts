import {Todo, TodoDocument} from "./todo.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Injectable} from '@nestjs/common';
import {Model, ObjectId} from "mongoose";
import {CreateTodoDto} from "./dto/create-todo.dto";

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>
    ) {}

    getAllTodos() {
        return this.todoModel.find()
    }

    getTodoById(id: ObjectId) {
        return this.todoModel.findById(id);
    }

    async createTodo(dto: CreateTodoDto) {
        return await this.todoModel.create({...dto});
    }

    deleteTodo(id: ObjectId) {
        console.log(id)
        return this.todoModel.findByIdAndDelete(id)
    }
}
