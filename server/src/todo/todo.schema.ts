import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";
import {User} from "../user/user.schema";
import * as mongoose from "mongoose";
import {Tag} from "../tag/tag.schema";


export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
    @Prop()
    title: string;

    @Prop()
    describe: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo)