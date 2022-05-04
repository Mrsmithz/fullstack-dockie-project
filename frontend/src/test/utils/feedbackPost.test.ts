import {
    checkComment
} from '../../utils/feedbackPost';


describe('Testing comment post', () => {
    test('should comment post (pass case)', () => {
        const isValid = checkComment("Comment");
        expect(isValid).toBe('');
    })
    
    test('should return Please fill input (blank comment)', () => {
        const isValid = checkComment("");
        expect(isValid).toBe('Please fill input');
    })

    test('should return Please fill input (blank comment)', () => {
        const isValid = checkComment(" ");
        expect(isValid).toBe('Please fill input');
    })
    
})
