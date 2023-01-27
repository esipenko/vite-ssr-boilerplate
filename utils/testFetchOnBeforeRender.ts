import fetch from "cross-fetch";
import { DisneyCharacterDto } from "../types/dto/disneyCharacter";

export default async function(pageContext: any) {
    const response = await fetch('https://api.disneyapi.dev/characters')
    let disneyCharacters: DisneyCharacterDto[] =( await response.json()).data;
    disneyCharacters = disneyCharacters.map(({name, url}) => ({name, url}));

    const pageProps = { disneyCharacters }
    return {
      pageContext: {
        pageProps
      }
    }
}