export interface PetResponse {
  id: number,
  name: string,
  type: { description: string, id: number },
  raca: string,
  pelo: { description: string, id: number }
  gender: { description: string, id: number },
  size: { description: string, id: number },
  colors: PetColor[],
  status: { description: string, id: number },
  description: string,
  image_url: string,
  fotos: string[],
  owner_id: number,
  lat: number,
  lon: number,
  distanceToMe: number,
  created_by: string
}

export interface PetColor {
  id: number,
  description: string
}

export function PetJSON(name,type,gender,raca,size,pelo,colors,description,image_url,fotos,status,lat,lon,created_by,owner_id) {
  let json = {
    name: name,
    type: type,
    gender: gender,
    raca: raca,
    size: size,
    pelo: pelo,
    colors: colors,
    description: description,
    image_url: image_url,
    fotos: fotos,
    status: status,
    lat: lat,
    lon: lon,
    created_by: created_by,
    owner_id: owner_id
  }
  return json
}