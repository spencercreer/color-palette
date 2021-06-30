$(document).ready(function () {
  $('#convert-rgb').on('click', function (e) {
    e.preventDefault()
    let r = $('#red-input').val()
    let g = $('#green-input').val()
    let b = $('#blue-input').val()
    let rgbColorCode = [r, g, b]
    if (r > 255 || g > 255 || b > 255 || r < 0 || g < 0 || b < 0) {
      alert("Invalid RGB code")
    } else {
      let hexColorCode = generateHexCode(r, g, b)
      $('#hex-input').val(hexColorCode.substr(1, 6))
      setStyling(hexColorCode, rgbColorCode)
    }
  })
  
  $('#convert-hex').on('click', function (e) {
    e.preventDefault()
    let hex = $('#hex-input').val()
    let rgbColorCode = generateRgbCode(hex)
    $('#red-input').val(rgbColorCode[0])
    $('#green-input').val(rgbColorCode[1])
    $('#blue-input').val(rgbColorCode[2])
    setStyling('#' + hex, rgbColorCode)
  })

  function setStyling(hexColorCode, rgbColorCode) {
    let textColor
    let complimentaryColor = generateHexCode(255 - parseInt(rgbColorCode[0]), 255 - parseInt(rgbColorCode[1]), 255 - parseInt(rgbColorCode[2]))
    if(parseInt(rgbColorCode[0]) + parseInt(rgbColorCode[1]) + parseInt(rgbColorCode[2]) < 150) {
      textColor = "#DCDCDC"
    } else {
      textColor = "black"
    }
    $('.jumbotron').css("color", complimentaryColor)
    $('.jumbotron').css("background-color", hexColorCode)
    // $('.btn-block').css("background-color", complimentaryColor)
    $('#color-list').prepend(
      `<div class="alert mb-0" role="alert" style="background-color:${hexColorCode}; color:${textColor}; border-radius: 0px;">
          ${hexColorCode}<br>rgb(${rgbColorCode[0]}, ${rgbColorCode[1]}, ${rgbColorCode[2]})
        </div>`
    )
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
        if (hex[j] === "A") {
          sum += 10 * 16 ** k
        } else if (hex[j] === "B") {
          sum += 11 * 16 ** k
        } else if (hex[j] === "C") {
          sum += 12 * 16 ** k
        } else if (hex[j] === "D") {
          sum += 13 * 16 ** k
        } else if (hex[j] === "E") {
          sum += 14 * 16 ** k
        } else if (hex[j] === "F") {
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