import "jest"
import { start, stop } from './app'
import * as request from 'request'

describe("Index Tests", () => {
  beforeEach(done=>{
    start().then(done).catch(done)
  })

  afterEach(()=>{
    stop()
  })

  test("api/v1/parse", (done) => {
    const testString = "JOHN0000MICHAEL0009994567"
    request.post({
      body:testString,
      uri:"http://localhost/api/v1/parse"
    }, (err,res)=>{
      if( err ){
        done(err)
      }

      expect(res.body).toBeDefined()
      const body = JSON.parse( res.body )
      expect(body).toBeDefined()

      expect(body.firstName).toBeDefined()
      expect(body.lastName).toBeDefined()
      expect(body.clientId).toBeDefined()

      expect(body.firstName).toEqual("JOHN0000")
      expect(body.lastName).toEqual("MICHAEL000")
      expect(body.clientId).toEqual("9994567")

      done()
    })
  })

  test("api/v2/parse", (done) => {
    const testString = "JOHN0000MICHAEL0009994567"
    request.post({
      body:testString,
      uri:"http://localhost/api/v2/parse"
    }, (err,res)=>{
      if( err ){
        done(err)
      }

      expect(res.body).toBeDefined()
      const body = JSON.parse( res.body )
      expect(body).toBeDefined()

      expect(body.firstName).toBeDefined()
      expect(body.lastName).toBeDefined()
      expect(body.clientId).toBeDefined()

      expect(body.firstName).toEqual("JOHN")
      expect(body.lastName).toEqual("MICHAEL")
      expect(body.clientId).toEqual("999-4567")

      done()
    })
  })
})