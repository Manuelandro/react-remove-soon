import adyenEncrypt from '../../src/modules/adyen'

const generationTime = new Date().toISOString() // Note:
// Generate this
// serverside!

test('Adyen client encrypt', () => {
    expect(
        adyenEncrypt(
            '5555 4444 3333 1111',
            '737',
            'John Doe',
            '06',
            '2016',
            generationTime,
        ),
    ).toBeTruthy()
})
