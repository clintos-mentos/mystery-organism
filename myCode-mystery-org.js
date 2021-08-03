// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};
console.log(returnRandBase() +"\n")

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  //console.log('returns array of randomly selected DNA bases: ' + newStrand.length)
  return newStrand;  
};
console.log(mockUpStrand() + "\n")

// 3. create a function that has 2 params
const pAequorFactor = (specimenNum,dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      randomIndex = Math.floor(Math.random()* this.dna.length)
      // randomly choose a base and set to something else
      let newBase = returnRandBase();  //['A','T','C','G']
      while (this.dna[randomIndex]===newBase) {
        newBase = returnRandBase(); //select another newBase
      }
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(anotherOrg) {
      const similarities = this.dna.reduce((accum,currVal,idx,arr) => {
        if (arr[idx] === anotherOrg[idx]) {
          return accum + 1;
        } else {
          return accum;
        }
      }, 0)

      const averageCommon = (similarities/this.dna.length) * 100;
      // fix it to 2 decimals
      const averageCommonFixed = averageCommon.toFixed(2);
      console.timeLog(`specimen #1 and specimen #2 have ${averageCommonFixed}% DNA in common`)
    },
    willLikelySurvive() {
      const survive = this.dna.reduce((accum,val,idx,arr)=>{
        if (arr[idx] === 'C' || arr[idx] === 'G') {
          return accum + 1;
        } else {
          return accum;
        }
      },0)
      let survivalRate = survive/this.dna.length;
      if (survivalRate >= 0.6) {
        return true;
      } else {
        return false;
      }
    }
  }
}
// testing factory function by calling arg 1 and mockUpStrand
console.log(pAequorFactor(1,mockUpStrand()));

// create 30 instances of pAequor 

const thirtyInstances = [];
let counter = 1;

while (thirtyInstances.length < 30) {
  let addedOrg = pAequorFactor(counter,mockUpStrand());
  
  if (addedOrg.willLikelySurvive()){
    thirtyInstances.push(addedOrg);
  } 
  counter +=1;
}

console.log(thirtyInstances)

//END








