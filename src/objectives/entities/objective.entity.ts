import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'objectives' })
export class Objectives {

    _id?: string;

    @Prop({ required: true })
    idUser: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    reps: number;

    @Prop({ required: true })
    weight: number;
}

export const ObjectivesSchema = SchemaFactory.createForClass(Objectives);