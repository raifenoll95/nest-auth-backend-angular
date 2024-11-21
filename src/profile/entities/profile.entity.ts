import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'profiles' })
export class Profile {

    _id?: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    age: number;  // Cambiar de boolean a number

    @Prop({ required: true })
    gender: string;

    @Prop({ required: true })
    height: number;  // Cambiar de string a number

    @Prop({ required: true })
    weight: number;  // Cambiar de string a number

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    specialty: string;

    @Prop({ required: true })
    photo: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);