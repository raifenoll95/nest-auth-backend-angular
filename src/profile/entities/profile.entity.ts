import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'profiles' })
export class Profile {

    _id?: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    age: number;

    @Prop()
    gender: string;

    @Prop()
    height: number;

    @Prop()
    weight: number;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop()
    specialty: string;

    @Prop()
    photo: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);