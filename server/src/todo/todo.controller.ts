import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {CreateTodoDto} from "./dto/create-todo.dto";
import {TodoService} from "./todo.service";
import {ObjectId} from "mongoose";

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Get()
    getAll() {
        return this.todoService.getAllTodos()
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.todoService.getTodoById(id)
    }

    @Post()
    createTodo(@Body() dto: CreateTodoDto) {
        console.log(dto)
        return this.todoService.createTodo(dto)
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: ObjectId) {
        return this.todoService.deleteTodo(id)
    }
}
