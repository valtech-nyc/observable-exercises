import { expect, should } from 'chai';
import { isEmailValid, isPasswordValid } from './validation.js';

describe('Validation', () => {
    it('should validate a valid email', () => {
        expect(isEmailValid('test@test.com')).to.equal(true);
    });

    it('should validate an invalid email', () => {
        expect(isEmailValid('test@t..est.com')).to.equal(false);
    });

    it('should validate a valid password', () => {
        expect(isPasswordValid('qwe1123@rr')).to.equal(true);
    });

    it('should validate a invalid password', () => {
        expect(isPasswordValid('t23')).to.equal(false);
    });
});
