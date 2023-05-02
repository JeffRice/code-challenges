// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Removes duplicate tracks from a playlist.
 *
 * @param {string[]} playlist
 * @returns {string[]} new playlist with unique entries
 */
export function removeDuplicates(playlist) {
  let deDuped = []
  let allSongs = new Set()
  for(const item of playlist){
    if(!allSongs.has(item)){  deDuped.push(item)  }
    allSongs.add(item)
  }
  return deDuped
}

/**
 * Checks whether a playlist includes a track.
 *
 * @param {string[]} playlist
 * @param {string} track
 * @returns {boolean} whether the track is in the playlist
 */
export function hasTrack(playlist, track) {
  return playlist.includes(track)
}

/**
 * Adds a track to a playlist.
 *
 * @param {string[]} playlist
 * @param {string} track
 * @returns {string[]} new playlist
 */
export function addTrack(playlist, track) {
  let setList = new Set(playlist)
  setList.add(track)
  return [...setList]
}

/**
 * Deletes a track from a playlist.
 *
 * @param {string[]} playlist
 * @param {string} track
 * @returns {string[]} new playlist
 */
export function deleteTrack(playlist, track) {
  let setList = new Set(playlist)
  setList.delete(track)
  return [...setList]
}

/**
 * Lists the unique artists in a playlist.
 *
 * @param {string[]} playlist
 * @returns {string[]} list of artists
 */
export function listArtists(playlist) {
  let artistSet = new Set()
  for(const item of playlist){
    let splitItem = item.split('-')
    artistSet.add(splitItem[1].trim())
  }
      return [...artistSet]
}
