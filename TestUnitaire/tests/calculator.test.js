const { addition, soustraction, multiplication, affiche} = require('../calculator.js')

const obj ={
    vrai: true,
    faux:false
}

describe("tests du calculator", () => {

    test('monobj vrai', () => {
    expect(obj.vrai).toBeTruthy()
    })

    test('monobj faux', () => {
        expect(obj.faux).toBeFalsy()
        })

    test('addition de 2 nombres', ()=>{
        expect (addition(5,7)).toStrictEqual(12)
    })

    test('soustraction de 2 nombres', ()=>{
        expect (soustraction(10,2)).toStrictEqual(8)
    })

    test('multiplication de 2 nombres', ()=>{
        expect (multiplication(3,11)).toStrictEqual(33)
    })

    test('contient papaya', ()=>{
        // expect (affiche()).toContain('pap')
        expect (affiche()).toMatch(/(pap|aya)/)
    })

    test('plus grand que 10', ()=>{
        expect(addition(10,2)).toBeGreaterThan(10)
        // toBeGreaterThanOrEqual, toBeLessThanOrEqual, toBeLessThan 
    })

    test('addition de décimaux',()=>{
        const resultat = 0.1 + 0.2
        expect(resultat).toBeCloseTo(0.3)
    })
})