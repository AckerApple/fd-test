import * as http from 'http'
import * as connect from 'connect'
import {
  parser1
  ,parser2
} from './parsers'


export function notFound(
  req:http.IncomingMessage,
  res:http.ServerResponse
){
  res.statusCode = 404
  res.end("404")
}

export function methodsOnly( methods:string[] ){
  return function(
    req:http.IncomingMessage,//:http.RequestListener,
    res:http.ServerResponse,
    next:connect.NextFunction
  ){
    if( !req.method || methods.indexOf(req.method)<0 ){
      return notFound(req,res)
    }
    next()
  }
}

export interface midwareIncomingMessage extends http.IncomingMessage{
  rawBody?:string
}

export function rawBody(
  req:midwareIncomingMessage,
  res:http.ServerResponse,
  next:connect.NextFunction
){
  req.rawBody = ''
  req.setEncoding('utf8')

  req.on('data', (chunk:string)=>
    req.rawBody += chunk
  )

  req.on('end', next);
}

export function parse1(
  req:midwareIncomingMessage,
  res:http.ServerResponse
){
  const rtn = parser1( <string>req.rawBody )
  res.statusCode = 200
  res.end( JSON.stringify(rtn) )
}

export function parse2(
  req:midwareIncomingMessage,
  res:http.ServerResponse
){
  const rtn = parser2( <string>req.rawBody )
  res.statusCode = 200
  res.end( JSON.stringify(rtn) )
}