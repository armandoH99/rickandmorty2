
export interface Character {
    id: number;
    mainName: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    originName: Location;
    locationName: Location;
    image: string;
    episode: Episode[];
    name?: string;
    location?:Location;
    origin?: Location;
  }
  export interface BaseCharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Location;
    location: Location;
    image: string;
    episode: Episode[];
   
  }
  
  interface Location {
    name: string;
    url: string;
  }
  
  export interface Episode {
    id: number;
    name: string;    
    episode: string;    
    url: string;    
  }
  