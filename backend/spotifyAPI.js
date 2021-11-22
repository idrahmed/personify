import spotifyInstance from "./axios"

const LIMIT = 50

export const getTopTracks = async (timeRange, limit=LIMIT) => {
    return spotifyInstance.get(`me/top/tracks/?time_range=${timeRange}&limit=${limit}`)  
}

export const getTopArtists = async (timeRange, limit=LIMIT) => {
    return spotifyInstance.get(`me/top/artists/?time_range=${timeRange}&limit=${limit}`) 
}

export const getRecentlyPlayed = async (limit=LIMIT) => {
    return spotifyInstance.get(`me/player/recently-played?limit=${limit}`) 
}

export const getRecommended = async (seedType, seedValues, limit=LIMIT) => {
    return spotifyInstance.get(`recommendations?limit=${limit}&${seedType}=${seedValues}`)
}

export const getDiscoverPopular = async (limit=LIMIT) => {
    return spotifyInstance.get(`recommendations?limit=${limit}&seed_genres=pop`)
}

// creates new playlist. requires user_id as query param and name in body.
export const createPlaylist = async (id, name) => {
    return spotifyInstance.post(`users/${id}/playlists`, {
        name,
        description: 'Playlist created with personify',
        public: false
    })
}

// adds tracks to playlist. Takes in a playlist id and uris of tracks to be added.
export const addTracks = async (playlistId, uris) => {
    return spotifyInstance.post(`playlists/${playlistId}/tracks?uris=${uris}`)
}

// gets cover image of playlist
export const getCoverImage = async (playlistId) => {
    return spotifyInstance.get(`playlists/${playlistId}/images`)
}

