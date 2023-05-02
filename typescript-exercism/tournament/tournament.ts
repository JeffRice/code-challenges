interface Tally {
  [key: string]: { [key: string]: 0};
}
export class Tournament {
  // eslint-disable-next-line no-unused-vars
  public tally(input: string): string {
   let tallyObj: Tally = {}
   let newlineSplit = input.split('\n')
   if(input===''){      return 'Team                           | MP |  W |  D |  L |  P'}
   if(newlineSplit.length){

     for(const n of newlineSplit){
       let splitInput = n.split(';')
       if(splitInput.length){
       let team1 = splitInput[0];
       let team2 = splitInput[1];
       let outcome = splitInput[2];
        if(!tallyObj[team1]){  tallyObj[team1] = { MP:0, W:0, D:0, L:0, P:0}        }
        if(!tallyObj[team2]){  tallyObj[team2] = { MP:0, W:0, D:0, L:0, P:0}        }
        if(outcome === 'win'){
        tallyObj[team1]['W']++
        tallyObj[team1]['MP']++
        tallyObj[team1]['P']+=3
        tallyObj[team2]['L']++
        tallyObj[team2]['MP']++
      }
        if(outcome === 'loss'){
        tallyObj[team1]['L']++
        tallyObj[team1]['MP']++
        tallyObj[team2]['W']++
        tallyObj[team2]['MP']++
        tallyObj[team2]['P']+=3
      }
        if(outcome === 'draw'){
        tallyObj[team1]['D']++
        tallyObj[team1]['MP']++
        tallyObj[team1]['P']++
        tallyObj[team2]['D']++
        tallyObj[team2]['MP']++
        tallyObj[team2]['P']++
      }
        
      }
      }
      
    }

    let leaderArray = []
    let leaderboard = ''
    for(const team in tallyObj){
      leaderArray.push({ tally:tallyObj[team], 'team': team})
    }
    leaderArray = leaderArray.sort((a, b) => {
  const nameA = a.team.toUpperCase(); // ignore upper and lowercase
  const nameB = b.team.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
});

    leaderArray = leaderArray.sort((a, b) => b.tally.P - a.tally.P);
    
        for(const team of leaderArray){
             let spaces = 31 - team.team.length
             let space = ' '
          if(team.tally.P > 9){
 leaderboard+= `${team.team+space.repeat(spaces)}|  ${team.tally.MP} |  ${team.tally.W} |  ${team.tally.D} |  ${team.tally.L} | ${team.tally.P}\n`
          }
          else{
 leaderboard+= `${team.team+space.repeat(spaces)}|  ${team.tally.MP} |  ${team.tally.W} |  ${team.tally.D} |  ${team.tally.L} |  ${team.tally.P}\n`
          }

        }
    leaderboard = leaderboard.substring(0, leaderboard.length-1)
    return 'Team                           | MP |  W |  D |  L |  P\n' + leaderboard
  }
}
