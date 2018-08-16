export interface PetResponse {
  id: number,
  name: string,
  type: { description: string, id: number },
  gender: { description: string, id: number },
  size: { description: string, id: number },
  color: { description: string, id: number },
  status: { description: string, id: number },
  spots: boolean,
  spotsTxt: string,
  description: string,
  state: string,
  postString: string,
  image_url: string,
  ong_email: string,
  ong_name: string,
  lat: number,
  lon: number,
  distanceToMe: number
}

export function PetJSON(name,type,gender,size,color,spots,description,image_url,status,ong_email,lat,lon) {
  this.name = name;
  this.type = type;
  this.gender = gender;
  this.size = size;
  this.color = color;
  this.spots = spots;
  this.description = description;
  this.image_url = image_url;
  this.status = status;
  this.ong_email = ong_email;
  this.lat = lat;
  this.lon = lon;
}