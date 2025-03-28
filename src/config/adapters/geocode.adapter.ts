import { envs } from '../../config'

export const geocodeAdapter = {

    getCoordinatedByIdPlace: async (idPlace: string): Promise<{lat:number | undefined, lng:number | undefined}> => {
        try{
            const resp = await fetch(`${envs.GOOGLE_API_URL}/geocode/json?place_id=${idPlace}&key=${envs.GOOGLE_API_KEY}`)
            const data = await resp.json()
            const { lat, lng } = data.results[0].geometry.location
            return { lat, lng }

        }catch(err){
            return { lat: undefined, lng: undefined}
        }
    }

}