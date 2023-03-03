const myMath = require('../myMath.js')

describe('tests de myMath', () => {
test('somme existe', () => {
    expect(myMath.somme).toBeDefined()
})
})
