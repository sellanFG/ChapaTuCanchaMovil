import { IsString, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export class AuthDto {
    @IsString()
    @IsEmailOrPhoneNumber({ message: 'Invalid email or phone number' })
    username: string;

    @IsString()
    password: string;
}

function IsEmailOrPhoneNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "IsEmailOrPhoneNumber",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    //regex para validar email
                    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
                    //regex para validar numero de telefono
                    const phoneRegex = /^\d{9}$/

                    if (emailRegex.test(value) || phoneRegex.test(value)) {
                        return true
                    }
                    return false
                }
            }
        })
    }
}