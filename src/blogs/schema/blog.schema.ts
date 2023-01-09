import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type BlogDocument = Blog & Document;
@Schema()
export class Blog {
    @Prop()
    Title: string;

    @Prop()
    BlogDate: Date;

    @Prop()
    Content: string;
}
export const BlogSchema = SchemaFactory.createForClass(Blog);