
// @ts-ignore
describe("Testing with Jest", () => {
    test("Addition", () => {
        const sum = 2 + 3
        const expectedResult = 5
        expect(sum).toEqual(expectedResult)
    })

    // Jest also allows a test to run multiple
    // times using different values
    test.each([[1, 1, 2], [-1, 1, 0], [3, 2, 5]])(
        'Does %i + %i equals %i', (a, b, expectedResult) => {
            expect(a + b).toBe(expectedResult)
        })
})
