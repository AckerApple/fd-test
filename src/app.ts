import * as http from 'http'
import * as connect from 'connect'
import * as midware from './midware'

export const app = connect()

//http://localhost/api/v1/parse
app.use("/api/v1/parse",midware.methodsOnly(['POST']))
app.use("/api/v1/parse",midware.rawBody)
app.use("/api/v1/parse",midware.parse1)

app.use("/api/v2/parse",midware.methodsOnly(['POST']))
app.use("/api/v2/parse",midware.rawBody)
app.use("/api/v2/parse",midware.parse2)

app.use(midware.notFound)

const server = http.createServer( app )
export function start():Promise<void>{
  return new Promise((res,rej)=>{  
    server.listen(
      80,
      '0.0.0.0',
      res
    )
  })
}

export function stop(){
  server.close()
}