import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GameManagerService {
    constructor() {}

    public getValidatedNumber(numberToValidate: string | null, min: number, max: number) {
        const errorMessage = `enter a valid number from ${min} to ${max}`;

        let validatedNumber: number;

        if (numberToValidate && Number.isInteger(+numberToValidate)) {
            validatedNumber = +numberToValidate;
        } else {
            throw new Error(errorMessage);
        }

        if (validatedNumber < min || validatedNumber > max) {
            throw new Error(errorMessage);
        }

        return validatedNumber;
    }
}
