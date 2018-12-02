export default interface IAssetFile {
    id: string,
    type: AssetType,
    path: string
}

export enum AssetType{
    audio =  'Audio',
    image = 'Image'  
}