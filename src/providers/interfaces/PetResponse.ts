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
  image_url: string
}