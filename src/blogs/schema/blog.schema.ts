import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type BlogDocument = Blog & Document;
@Schema()
export class Blog {
    @Prop()
    Category: string;
    
    @Prop()
    Feature: boolean;
    
    @Prop()
    Image: string;

    @Prop()
    Title: string;
    
    @Prop()
    Subtitle: string;

    @Prop()
    BlogDate: Date;

    @Prop()
    Content: string;

}
export const BlogSchema = SchemaFactory.createForClass(Blog);