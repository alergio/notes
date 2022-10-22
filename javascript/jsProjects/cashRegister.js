function checkCashRegister(price, cash, cid) {

    // however va a guardar el cambio y aftersee es el objeto a retornar
    let however  = [];
    let afterSee = {};
  
    // changeC es el cambio total * 100 porque a js le cuesta trabajar con decimales
    // cidFlat es porque los valores estan en un array anidado y para poder trabajar mas facil
    let changeC = (cash - price).toFixed(2) * 100
    let cidFlat = cid.flat()

    // indexs en variables para un codigo mas visual
    const indexPenny   = cidFlat.indexOf("PENNY")
    const indexNickel  = cidFlat.indexOf("NICKEL")
    const indexDime    = cidFlat.indexOf("DIME")
    const indexQuarter = cidFlat.indexOf("QUARTER")
    const indexDollar            = cidFlat.indexOf("ONE")
    const indexFiveDollars       = cidFlat.indexOf("FIVE")
    const indexTenDollars        = cidFlat.indexOf("TEN")
    const indexTwentyDollars     = cidFlat.indexOf("TWENTY")
    const indexOneHundredDollars = cidFlat.indexOf("ONE HUNDRED")

    // el conteo de todas las monedas que tenemos en la caja y que se actualizan segun cambios
    let pennyC   = (cidFlat[indexPenny + 1] * 100).toFixed(2)
    let nickelC  = (cidFlat[indexNickel + 1] * 100).toFixed(2)
    let quarterC = (cidFlat[indexQuarter + 1] * 100).toFixed(2)
    let dimeC    = (cidFlat[indexDime + 1] * 100).toFixed(2)
    let dollarC            = (cidFlat[indexDollar + 1] * 100).toFixed(2)
    let fiveDollarsC       = (cidFlat[indexFiveDollars + 1] * 100).toFixed(2)
    let tenDollarsC        = (cidFlat[indexTenDollars + 1] * 100).toFixed(2)
    let twentyDollarsC     = (cidFlat[indexTwentyDollars + 1] * 100).toFixed(2)
    let oneHundredDollarsC = (cidFlat[indexOneHundredDollars + 1] * 100).toFixed(2)
  
  // funcion que hace el trabajo
  function getChange(changeC) {
        
    for (let i = changeC; i > 0;){

      // funcion para no repetir codigo, aca volvemos a estructurar el array del cambio para que sea anidado
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

  getChange(changeC)


  let changes = []
  let total = 0
  changes.push(pennyC, nickelC, quarterC, dimeC, dollarC, fiveDollarsC, tenDollarsC, twentyDollarsC, oneHundredDollarsC)
  changes.map(el => {if (typeof el === "number") { total += el }})

  however = however.map(arr => arr.map(item => typeof item === 'number' ? item /= 100 : item))

  if (afterSee.status == "INSUFFICIENT_FUNDS") {
    afterSee.change = []
  } else if (total == 0) {
    afterSee.status = "CLOSED"
    afterSee.change = cid
  } else {
    afterSee.status = "OPEN"
    afterSee.change = however    
  }


  return afterSee;
}
