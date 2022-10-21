function checkCashRegister(price, cash, cid) {

    let however = [];
    let afterSee = {};
  
    let changeC = (cash - price).toFixed(2) * 100

    let cidFlat = cid.flat()

    const indexPenny   = cidFlat.indexOf("PENNY")
    const indexNickel  = cidFlat.indexOf("NICKEL")
    const indexDime    = cidFlat.indexOf("DIME")
    const indexQuarter = cidFlat.indexOf("QUARTER")
    const indexDollar            = cidFlat.indexOf("ONE")
    const indexFiveDollars       = cidFlat.indexOf("FIVE")
    const indexTenDollars        = cidFlat.indexOf("TEN")
    const indexTwentyDollars     = cidFlat.indexOf("TWENTY")
    const indexOneHundredDollars = cidFlat.indexOf("ONE HUNDRED")

    let pennyC   = (cidFlat[indexPenny + 1] * 100).toFixed(2)
    let nickelC  = (cidFlat[indexNickel + 1] * 100).toFixed(2)
    let quarterC = (cidFlat[indexQuarter + 1] * 100).toFixed(2)
    let dimeC    = (cidFlat[indexDime + 1] * 100).toFixed(2)
    let dollarC            = (cidFlat[indexDollar + 1] * 100).toFixed(2)
    let fiveDollarsC       = (cidFlat[indexFiveDollars + 1] * 100).toFixed(2)
    let tenDollarsC        = (cidFlat[indexTenDollars + 1] * 100).toFixed(2)
    let twentyDollarsC     = (cidFlat[indexTwentyDollars + 1] * 100).toFixed(2)
    let oneHundredDollarsC = (cidFlat[indexOneHundredDollars + 1] * 100).toFixed(2)
  
  function getDecimalChange(changeC) {
        
    for (let i = changeC; i > 0;){

      function updateChange(index, amount) {
        if (however.length > 0) {
          if (however.some(el => el.indexOf(index) >= 0)) {
           however.map(
              arr => {
                if (arr.indexOf(index) >= 0) {
                  arr[arr.indexOf(index) + 1] += amount
                  i -= amount
                }
              })
          } else {
              however.push([index, amount])
              i -= amount
          }
        } else {
              however.push([index, amount])
              i -= amount
            }
      }

      if (i >= 10000 && indexOneHundredDollars >= 0 && oneHundredDollarsC >= 10000) {
        for (let j = oneHundredDollarsC; i >= 10000 && j >= 10000; j -= 10000) {
          updateChange("ONE HUNDRED", 10000)
          oneHundredDollarsC -= 10000
        }
      }

      if (i >= 2000 && indexTwentyDollars >= 0 && twentyDollarsC >= 2000) {
        for (let j = twentyDollarsC; i >= 2000 && j >= 2000; j -= 2000) {
          updateChange("TWENTY", 2000)
          twentyDollarsC -= 2000
        }
      }

      if (i >= 1000 && indexTenDollars >= 0 && tenDollarsC >= 1000) {
        for (let j = tenDollarsC; i >= 1000 && j >= 1000; j -= 1000) {
          updateChange("TEN", 1000)
          tenDollarsC -= 1000
        }
      }

      if (i >= 500 && indexFiveDollars >= 0 && fiveDollarsC >= 500) {
        for (let j = fiveDollarsC; i >= 500 && j >= 500; j -= 500) {
          updateChange("FIVE", 500)
          fiveDollarsC -= 500
        }
      }

      if (i >= 100 && indexDollar >= 0 && dollarC >= 100) {
        for (let j = dollarC; i >= 100 && j >= 100; j -= 100) {
          updateChange("ONE", 100)
          dollarC -= 100
        }
      }

      if (i >= 25 && indexQuarter >= 0 && quarterC >= 25) {
        for (let k = quarterC; i >= 25 && k >= 25; k -= 25) {
          updateChange("QUARTER", 25)
          quarterC -= 25
        }
      }

      if (i >= 10 && indexDime >= 0 && dimeC >= 10) {
        for (let k = dimeC; i >= 10 && k >= 10; k-= 10) {
          updateChange("DIME", 10)
          dimeC -= 10
        }
      }

      if (i >= 5 && indexNickel >= 0 && nickelC >= 5) {
        for (let k = nickelC; i >= 5 && k >= 5; k-= 5) {
          updateChange("NICKEL", 5)
          nickelC -= 5
        }
      }

      if (i >= 1 && indexPenny >= 0 && pennyC >= 1) {
        for (let k = pennyC; i >= 1 && k >= 1; k-= 1) {
          updateChange("PENNY", 1)
          pennyC -= 1
        }
      }

      if (i > 0) {
        afterSee.status = "INSUFFICIENT_FUNDS"
        break
      }
    }
    
  }

  getDecimalChange(changeC)


  let changes = []
  changes.push(pennyC, nickelC, quarterC, dimeC, dollarC, fiveDollarsC, tenDollarsC, twentyDollarsC, oneHundredDollarsC)
  let total = 0
  changes.map( el => {if (typeof el === "number") { total += el }})
 /* let totalChange = however.map(ele => {
    ele.map(ele2 => {
      if (typeof ele2 === "number"){
        ele2 = ele2 / 100
      }
    })
  })*/

  if (afterSee.status == "INSUFFICIENT_FUNDS") {
    afterSee.change = []
  } else if (total == 0) {
    afterSee.status = "CLOSED"
    afterSee.change = cid
  } else {
    afterSee.status = "OPEN"
    afterSee.change = however    
  }


    return totalChange;
  }
  
  /* console.log(checkCashRegister(17.32, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))

  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])) */

  console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))
