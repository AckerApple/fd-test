import "jest"
import { parser1, parser2 } from './parsers'


describe("Parser Tests", () => {
  test("#parse1", () => {
    const testString = "JOHN0000MICHAEL0009994567"
    const res = parser1( testString )
    expect(res).toBeDefined()
    
    expect(res.firstName).toBeDefined()
    expect(res.lastName).toBeDefined()
    expect(res.clientId).toBeDefined()

    expect(res.firstName).toEqual("JOHN0000")
    expect(res.lastName).toEqual("MICHAEL000")
    expect(res.clientId).toEqual("9994567")
  })

  test("#parse2", () => {
    const testString = "JOHN0000MICHAEL0009994567"
    const res = parser2( testString )
    expect(res).toBeDefined()
    
    expect(res.firstName).toBeDefined()
    expect(res.lastName).toBeDefined()
    expect(res.clientId).toBeDefined()

    expect(res.firstName).toEqual("JOHN")
    expect(res.lastName).toEqual("MICHAEL")
    expect(res.clientId).toEqual("999-4567")
  })
})