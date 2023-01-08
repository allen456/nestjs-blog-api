import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';

export type BlogDocument = Blog & Document;
@Schema()
export class Blog {
    @ApiProperty({ type: String })
    @Prop()
    Title: string;

    @ApiProperty({ type: Date })
    @Prop()
    Date: Date;

    @ApiProperty({ type: String })
    @Prop()
    Content: string;
}
export const BlogSchema = SchemaFactory.createForClass(Blog);