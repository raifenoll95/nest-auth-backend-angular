import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'marks' })
export class Marks {

    _id?: string;

    @Prop({ required: true })
    idUser: string;

    @Prop({ required: true })
    idObjective: string;

    @Prop({ required: true })
    reps: number;

    @Prop()
    weight: number;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    sensations: string;
}

export const MarksSchema = SchemaFactory.createForClass(Marks);