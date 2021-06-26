$(document).ready(function() {
    $('.btn').on('click', function(e) {
        e.preventDefault()
        let hex = $('#hex-input').val()
        let r = $('#red-input').val()
        let g = $('#green-input').val()
        let b = $('#blue-input').val()
        if(r > 255 || g > 255 || b > 255 || r < 0 || g < 0 || b < 0){
            alert("Invalid RGB code")
        } else {
            hexColorCode = generateHexCode(r, g, b)
            $('#hex-input').val(hexColorCode.substr(1,6))
            $('.jumbotron').css("background-color", hexColorCode)
            $('#color-list').prepend(
                `<div class="alert mb-0" role="alert" style="background-color:${hexColorCode}">
                    ${hexColorCode}<br>rgb(${r}, ${g}, ${b})
                </div>`
            )
        }
    })

    function generateHexCode(r, g, b) {
        let colorArray = [r, g, b]
        let hexArray = []
        for(let i = 0; i < colorArray.length; i++) {
          let quotient = Math.trunc(parseInt(colorArray[i])/16)
          let remainder = parseInt(colorArray[i])%16
          let hueArray = [quotient, remainder]
          for(let j = 0; j < hueArray.length; j++) {
              if(parseInt(hueArray[j]) === 10) {
                hexArray.push('A')
              } else if(parseInt(hueArray[j]) === 11) {
                hexArray.push('B')
              } else if(parseInt(hueArray[j]) === 12) {
                hexArray.push('C')
              } else if(parseInt(hueArray[j]) === 13) {
                hexArray.push('D')
              } else if(parseInt(hueArray[j]) === 14) {
                hexArray.push('E')
              } else if(parseInt(hueArray[j]) === 15) {
                hexArray.push('F')
              } else {
                hexArray.push(parseInt(hueArray[j]).toString())
              }
          }
        }
        hexArray.unshift('#')
        let hexColorCode = hexArray.join('')
        return hexColorCode
      };
})