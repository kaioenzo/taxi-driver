export abstract class MapsService {
  abstract getRideInfo(origin: string, destination: string): Promise<any>;
}
