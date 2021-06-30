$(document).ready(function () {
  // On page load generate a random hexadecimal color code and rgb code
  let randomHexColor = Math.floor(Math.random() * 0xEEEEEE + 0x111111).toString(16).toUpperCase()
  let randomRgbArray = generateRgbCode(randomHexColor)

  //Set input values to randomly generated color code
  $('#red-input').val(randomRgbArray[0])
  $('#green-input').val(randomRgbArray[1])
  $('#blue-input').val(randomRgbArray[2])
  $('#hex-input').val(randomHexColor.substr(0, 6))

  // set body background color and text color
  setStyling('#' + randomHexColor, randomRgbArray)

  $('.rgb-code-input').keyup(function(e){
    console.log(e.keyCode)
    if(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode === 8 || e.keyCode === 46) {
      let r = $('#red-input').val()
      let g = $('#green-input').val()
      let b = $('#blue-input').val()
      if(r === '' || g === '' || b === '' || r > 255 || g > 255 || b > 255) {
        console.log('at least one rgb is invalid')
      } else {
        let rgbColorCode = [r, g, b]
        let hexColorCode = generateHexCode(r, g, b)
        $('#hex-input').val(hexColorCode.substr(1, 6))
        setStyling(hexColorCode, rgbColorCode)
      }
    }
  })

  $('.hex-code-input').keyup(function(e){
    console.log(e.keyCode)
    if(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode === 8 || e.keyCode === 46) {
      let hex = $('#hex-input').val()
      console.log(hex)
      // if(r === '' || g === '' || b === '' || r > 255 || g > 255 || b > 255) {
      //   console.log('at least one rgb is invalid')
      // } else {
      //   let rgbColorCode = [r, g, b]
      //   let hexColorCode = generateHexCode(r, g, b)
      //   $('#hex-input').val(hexColorCode.substr(1, 6))
      //   setStyling(hexColorCode, rgbColorCode)
      // }
    }
  })

  $('#save-color').click(function (e) {
    e.preventDefault()
    let textColor
    let r = $('#red-input').val()
    let g = $('#green-input').val()
    let b = $('#blue-input').val()
    let hexColorCode = '#' + $('#hex-input').val()
    console.log(hexColorCode)
    if(parseInt(r) + parseInt(g) + parseInt(b) < 150) {
      textColor = "#DCDCDC"
    } else {
      textColor = "black"
    }
    $('#color-list').prepend(
      `<div class="alert mb-0" role="alert" style="background-color:${hexColorCode}; color:${textColor}; border-radius: 0px;">
          ${hexColorCode}<br>rgb(${r}, ${g}, ${b})
        </div>`
    )
  })

  // $('#convert-hex').on('click', function (e) {
  //   e.preventDefault()
  //   let hex = $('#hex-input').val()
  //   let rgbColorCode = generateRgbCode(hex)
  //   $('#red-input').val(rgbColorCode[0])
  //   $('#green-input').val(rgbColorCode[1])
  //   $('#blue-input').val(rgbColorCode[2])
  //   setStyling('#' + hex, rgbColorCode)
  // })

  function setStyling(hexColorCode, rgbColorCode) {
    let textColor
    let complimentaryColor = generateHexCode(255 - parseInt(rgbColorCode[0]), 255 - parseInt(rgbColorCode[1]), 255 - parseInt(rgbColorCode[2]))
    if(parseInt(rgbColorCode[0]) + parseInt(rgbColorCode[1]) + parseInt(rgbColorCode[2]) < 160) {
      textColor = "#DCDCDC"
    } else {
      textColor = "black"
    }
    $('.jumbotron').css("color", complimentaryColor)
    $('.jumbotron').css("background-color", hexColorCode)
  }

  function generateHexCode(r, g, b) {
    let colorArray = [r, g, b]
    let hexArray = []
    for (let i = 0; i < colorArray.length; i++) {
      let quotient = Math.trunc(parseInt(colorArray[i]) / 16)
      let remainder = parseInt(colorArray[i]) % 16
      let hueArray = [quotient, remainder]
      for (let j = 0; j < hueArray.length; j++) {
        if (parseInt(hueArray[j]) === 10) {
          hexArray.push('A')
        } else if (parseInt(hueArray[j]) === 11) {
          hexArray.push('B')
        } else if (parseInt(hueArray[j]) === 12) {
          hexArray.push('C')
        } else if (parseInt(hueArray[j]) === 13) {
          hexArray.push('D')
        } else if (parseInt(hueArray[j]) === 14) {
          hexArray.push('E')
        } else if (parseInt(hueArray[j]) === 15) {
          hexArray.push('F')
        } else {
          hexArray.push(parseInt(hueArray[j]).toString())
        }
      }
    }
    hexArray.unshift('#')
    let hexColorCode = hexArray.join('')
    return hexColorCode
  }

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