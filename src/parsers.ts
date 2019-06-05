export interface data{
  firstName : string
  lastName  : string
  clientId  : string
} 

export function parser1( data:string ):data{
  const firstMatch = data.match(/^.+0000/)
  const midMatch = data.match(/^.+0000.+000/)
  const lastMatch = data.match(/000[0-9]+$/)
  
  const firstName = firstMatch && firstMatch.length && firstMatch[0] || ''
  const lastName = midMatch && midMatch.length && midMatch[0].slice(firstName.length,midMatch[0].length) || ''
  const clientId = lastMatch && lastMatch.length && lastMatch[0].slice(3,lastMatch[0].length) || ''

  return {
    firstName:firstName,
    lastName:lastName,
    clientId:clientId
  }
}

export function parser2( data:string ):data{
  const firstMatch = data.match(/^.+0000/)
  const midMatch = data.match(/^.+0000.+000/)
  const lastMatch = data.match(/000[0-9]+$/)
  
  const firstName = firstMatch && firstMatch.length && firstMatch[0].slice(0,firstMatch[0].length-4) || ''
  const lastName = midMatch && midMatch.length && midMatch[0].slice(firstName.length+4,midMatch[0].length-3) || ''
  const clientId = lastMatch && lastMatch.length && lastMatch[0].slice(3,lastMatch[0].length) || ''

  return {
    firstName:firstName,
    lastName:lastName,
    clientId:clientId.length > 3 ? clientId.slice(0,3)+'-'+clientId.slice(3,clientId.length) : clientId
  }
}