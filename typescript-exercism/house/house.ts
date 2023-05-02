const lyrics = 'This is the house that Jack built.\n\nThis is the malt\nthat lay in the house that Jack built.\n\nThis is the rat\nthat ate the malt\nthat lay in the house that Jack built.\n\nThis is the cat\nthat killed the rat\nthat ate the malt\nthat lay in the house that Jack built.\n\nThis is the dog\nthat worried the cat\nthat killed the rat\nthat ate the malt\nthat lay in the house that Jack built.\n\nThis is the cow with the crumpled horn\nthat tossed the dog\nthat worried the cat\nthat killed the rat\nthat ate the malt\nthat lay in the house that Jack built.\n\nThis is the maiden all forlorn\nthat milked the cow with the crumpled horn\nthat tossed the dog\nthat worried the cat\nthat killed the rat\nthat ate the malt\nthat lay in the house that Jack built.\n\nThis is the man all tattered and torn\nthat kissed the maiden all forlorn\nthat milked the cow with the crumpled horn\nthat tossed the dog\nthat worried the cat\nthat killed the rat\nthat ate the malt\nthat lay in the house that Jack built.\n\nThis is the priest all shaven and shorn\nthat married the man all tattered and torn\nthat kissed the maiden all forlorn\nthat milked the cow with the crumpled horn\nthat tossed the dog\nthat worried the cat\nthat killed the rat\nthat ate the malt\nthat lay in the house that Jack built.\n\nThis is the rooster that crowed in the morn\nthat woke the priest all shaven and shorn\nthat married the man all tattered and torn\nthat kissed the maiden all forlorn\nthat milked the cow with the crumpled horn\nthat tossed the dog\nthat worried the cat\nthat killed the rat\nthat ate the malt\nthat lay in the house that Jack built.\n\nThis is the farmer sowing his corn\nthat kept the rooster that crowed in the morn\nthat woke the priest all shaven and shorn\nthat married the man all tattered and torn\nthat kissed the maiden all forlorn\nthat milked the cow with the crumpled horn\nthat tossed the dog\nthat worried the cat\nthat killed the rat\nthat ate the malt\nthat lay in the house that Jack built.\n\nThis is the horse and the hound and the horn\nthat belonged to the farmer sowing his corn\nthat kept the rooster that crowed in the morn\nthat woke the priest all shaven and shorn\nthat married the man all tattered and torn\nthat kissed the maiden all forlorn\nthat milked the cow with the crumpled horn\nthat tossed the dog\nthat worried the cat\nthat killed the rat\nthat ate the malt\nthat lay in the house that Jack built.\n'

export function verse(verseSelection: number):  string[]  {
  let allVerses = []
  let currentVerse = []
  let splitLyr = lyrics.split('\n')
  for(const line of splitLyr){
    if(line === ''){
      allVerses.push(currentVerse)
      currentVerse = []
    }
    else{  currentVerse.push(line)   }
  }
  return allVerses[verseSelection-1]
}

export function verses(start: number, end: number): string[] {
  let allVerses = []
  for(let i=start; i <= end; i++){  allVerses.push(...verse(i), '')  }
  allVerses.pop() //trailing newline
  return allVerses
}