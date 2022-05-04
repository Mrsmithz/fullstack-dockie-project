import {
    getTitleValidateAlertMessage,
    validateTitle,
    checkImageFile,
    getTagValidateAlertMessage,
    validateTag,
    checkIsPDFFile,
    checkIsSingleFile
} from '../../utils/formValidation';


describe('Testing upload document', () => {
    test('should upload document valid (pass case)', () => {
        const isValid = checkIsPDFFile("application/pdf") && checkIsSingleFile(1);
        expect(isValid).toBe(true);
    })
    
    test('should upload document valid (wrong type file)', () => {
        const isValid = checkIsPDFFile("text/plain") && checkIsSingleFile(1);
        expect(isValid).toBe(false);
    })
    
    test('should upload document valid (multiple file)', () => {
        const isValid = checkIsPDFFile("application/pdf") && checkIsSingleFile(2);
        expect(isValid).toBe(false);
    })
    
    test('should upload document valid (wrong type file and multiple file)', () => {
        const isValid = checkIsPDFFile("text/plain") && checkIsSingleFile(2);
        expect(isValid).toBe(false);
    })
})

describe('Testing validate post title', () => {
    test('should title validate return alert message valid (pass case)', () => {
        const text = getTitleValidateAlertMessage("GenlnwZa007");
        expect(text).toBe('');
    })
    
    test('should title validate return alert message valid (title length shorter than 3 letters case)', () => {
        const text = getTitleValidateAlertMessage("kp");
        expect(text).toBe('Your title is too short!!');
    })
    
    test('should title validate return alert message valid (title length longer than 40 letters case)', () => {
        const text = getTitleValidateAlertMessage("1234567890123456789012345678901234567890a");
        expect(text).toBe('Your title is too long!!');
    })
    
    test('should title validate valid (pass case)', () => {
        const text = validateTitle("GenlnwZa007");
        expect(text).toBe(true);
    })
    
    test('should title validate valid (title length shorter than 3 letters case)', () => {
        const text = validateTitle("kp");
        expect(text).toBe(false);
    })
    
    test('should title validate valid (title length longer than 40 letters case)', () => {
        const text = validateTitle("1234567890123456789012345678901234567890a");
        expect(text).toBe(false);
    })
})

describe('Testing upload preview image', () => {
    test('should preview image check type valid (jpeg type)', () => {
        const isValid = checkImageFile("image/jpeg");
        expect(isValid).toBe(true);
    })
    
    test('should preview image check type valid (png type)', () => {
        const isValid = checkImageFile("image/png");
        expect(isValid).toBe(true);
    })
    
    test('should preview image check type valid (pdf type)', () => {
        const isValid = checkImageFile("application/pdf");
        expect(isValid).toBe(false);
    })
    
    test('should preview image check type valid (txt type)', () => {
        const isValid = checkImageFile("text/plain");
        expect(isValid).toBe(false);
    })
})

describe('Testing validate tag name', () => {
    test('should tag validate return alert message valid (pass case)', () => {
        const text = getTagValidateAlertMessage("Gen");
        expect(text).toBe('');
    })
    
    test('should tag validate return alert message valid (tag length shorter than 2 letters case)', () => {
        const text = getTagValidateAlertMessage("k");
        expect(text).toBe('Your tag name is too short!!');
    })
    
    test('should tag validate return alert message valid (tag length longer than 15 letters case)', () => {
        const text = getTagValidateAlertMessage("1234567890123456");
        expect(text).toBe('Your tag name is too long!!');
    })
    
    test('should tag validate valid (pass case)', () => {
        const text = validateTag("Gen");
        expect(text).toBe(true);
    })
    
    test('should tag validate valid (tag length shorter than 2 letters case)', () => {
        const text = validateTag("k");
        expect(text).toBe(false);
    })
    
    test('should tag validate valid (tag length longer than 15 letters case)', () => {
        const text = validateTag("1234567890123456");
        expect(text).toBe(false);
    })
})
