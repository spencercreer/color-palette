$(document).ready(function () {
  // on page load generate a random hexadecimal color code and rgb code
  let randomHexColor = Math.floor(Math.random() * 0xEEEEEE + 0x111111).toString(16).toLowerCase()
  let randomRgbArray = generateRgbCode(randomHexColor)

  // get saved colors from local storage and 
  if(localStorage.getItem("Colors")){
    var palette = JSON.parse(localStorage.getItem('Colors'))
    console.log(palette)
    for(i=0; i<palette.length; i++){
      console.log(palette[i])
      let colorCode = palette[i]
      let hexColorCode = '#' + colorCode
      let rgbColorCode = generateRgbCode(colorCode)
      let r = rgbColorCode[0]
      let g = rgbColorCode[1]
      let b = rgbColorCode[2]
      let textColor
      if (parseInt(r) + parseInt(g) + parseInt(b) < 160) {
        // if background color is dark, make text color light gray
        textColor = "#DCDCDC"
      } else {
        // else, text color black
        textColor = "black"
      }
      $('#color-list').prepend(
        `<div class="alert mb-0" role="alert" style="background-color:${hexColorCode}; color:${textColor}; border-radius: 0px;">
            ${hexColorCode}<br>rgb(${r}, ${g}, ${b})
          </div>`
      )
    }
  } else {
    var palette = []
  }
  // set input values to randomly generated color code
  $('#red-input').val(randomRgbArray[0])
  $('#green-input').val(randomRgbArray[1])
  $('#blue-input').val(randomRgbArray[2])
  $('#hex-input').val(randomHexColor.substr(0, 6))
  // set body background color and text color
  setStyling('#' + randomHexColor, randomRgbArray)

  // RGB input keyup event
  $('.rgb-code-input').keyup(function (e) {
    if ((e.key >= 0 && e.key <= 9) || e.keyCode === 8 || e.keyCode === 46) {
      // if key code is numeric, backspace, or delete
      let r = $('#red-input').val()
      let g = $('#green-input').val()
      let b = $('#blue-input').val()
      if (r === '' || g === '' || b === '' || r > 255 || g > 255 || b > 255) {
        // RGB input is empty or greater than 255
        console.log('at least one rgb is invalid')
      } else {
        // all valid RGB inputs, generate hexadecimal code
        let rgbColorCode = [r, g, b]
        let hexColorCode = generateHexCode(r, g, b)
        $('#hex-input').val(hexColorCode.substr(1, 6))
        // set body background color and text color
        setStyling(hexColorCode, rgbColorCode)
      }
    }
  })

  // hex input keyup event
  $('.hex-code-input').keyup(function (e) {
    console.log(e.keyCode)
    if ((e.key >= 0 && e.key <= 9) || (e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 8 || e.keyCode === 46) {
      // if key code is numeric, alphabetic, backspace, or delete
      let hex = $('#hex-input').val().toLowerCase()
      if(hex.length === 6) {
        // full hexadecimal color code entered, conver hexadecimal string to number type
        hexNumber = parseInt('0x' + hex)
        if(hexNumber >= 0 && hexNumber <= 0xFFFFFF) {
          // hexadecimal number is between 0 and rgb(255, 255, 255), convert to rgb and display to inputs
          let rgbColorCode = generateRgbCode(hex)
          $('#red-input').val(rgbColorCode[0])
          $('#green-input').val(rgbColorCode[1])
          $('#blue-input').val(rgbColorCode[2])
          // set body background color and text color
          setStyling('#' + hex, rgbColorCode)
        }
      }
    }
  })

  function setStyling(hexColorCode, rgbColorCode) {
    // determine complimentary color and set text color
    let complimentaryColor = generateHexCode(255 - parseInt(rgbColorCode[0]), 255 - parseInt(rgbColorCode[1]), 255 - parseInt(rgbColorCode[2]))
    let textColor
    if (parseInt(rgbColorCode[0]) + parseInt(rgbColorCode[1]) + parseInt(rgbColorCode[2]) < 160) {
      // if background color is dark, make text color light gray
      textColor = "#DCDCDC"
    } else {
      // else, text color black
      textColor = "black"
    }
    // set jumbotron text color and background color 
    $('.jumbotron').css("color", complimentaryColor)
    $('.jumbotron').css("background-color", hexColorCode)
  }

  // Save '+' button click
  $('#save-color').click(function (e) {
    e.preventDefault()
    // declare and set variables
    let textColor
    let r = $('#red-input').val()
    let g = $('#green-input').val()
    let b = $('#blue-input').val()
    let colorCode = $('#hex-input').val()
    let hexColorCode = '#' + colorCode
    if (parseInt(r) + parseInt(g) + parseInt(b) < 160) {
      // if background color is dark, make text color light gray
      textColor = "#DCDCDC"
    } else {
      // else, text color black
      textColor = "black"
    }
    palette.push(colorCode)
    localStorage.setItem("Colors", JSON.stringify(palette))
    // prepend an alert with user entered background color
    $('#color-list').prepend(
      `<div class="alert mb-0" role="alert" style="background-color:${hexColorCode}; color:${textColor}; border-radius: 0px;">
          ${hexColorCode}<br>rgb(${r}, ${g}, ${b})
        </div>`
    )
  })

  // convert r, g, b values to hexadecimal
  function generateHexCode(r, g, b) {
    let colorArray = [r, g, b]
    let hexArray = []
    for (let i = 0; i < colorArray.length; i++) {
      let quotient = Math.trunc(parseInt(colorArray[i]) / 16)
      let remainder = parseInt(colorArray[i]) % 16
      let hueArray = [quotient, remainder]
      for (let j = 0; j < hueArray.length; j++) {
        hexArray.push(parseInt(hueArray[j]).toString(16))
      }
    }
    hexArray.unshift('#')
    let hexColorCode = hexArray.join('')
    return hexColorCode
  }

  // convert hexadecimal value to r, g, b
  function generateRgbCode(hex) {
    let rHex = hex.substr(0, 2)
    let gHex = hex.substr(2, 2)
    let bHex = hex.substr(4, 2)
    let hexArray = [rHex, gHex, bHex]
    let rgbArray = []
    for (let i = 0; i < hexArray.length; i++) {
      let hex = hexArray[i]
      let sum = 0
      let k = 1
      for (let j = 0; j < hex.length; j++) {
        if (hex[j] === "A" || hex[j] === "a") {
          sum += 10 * 16 ** k
        } else if (hex[j] === "B" || hex[j] === "b") {
          sum += 11 * 16 ** k
        } else if (hex[j] === "C" || hex[j] === "c") {
          sum += 12 * 16 ** k
        } else if (hex[j] === "D" || hex[j] === "d") {
          sum += 13 * 16 ** k
        } else if (hex[j] === "E" || hex[j] === "e") {
          sum += 14 * 16 ** k
        } else if (hex[j] === "F" || hex[j] === "f") {
          sum += 15 * 16 ** k
        } else {
          sum += parseInt(hex[j]) * 16 ** k
        }
        k--
      }
      rgbArray.push(sum)
    }
    return rgbArray
  }
})