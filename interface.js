
$(document).ready(function () {

  var thermostat = new Thermostat()
  var city
  var key

  function decideColor () {
    switch (thermostat.checkUsage()) {
      case 0:
        return 'green'
      case 1:
        return 'orange'
      case 2:
        return 'red'
    };
  }

  function changeColor () {
    $('#temperature').css('color', decideColor())
  }

  function updateTemp () {
    $('#temperature').text(thermostat.temperature)
    changeColor()
    $.post('http://localhost:9292/thermostat', { temperature: thermostat.temperature })
  }

  function switchColor () {
    if (thermostat.powerSave === true) {
      $('#powersaving-switch').css('background-color', 'green')
    } else {
      $('#powersaving-switch').css('background-color', 'orange')
    }
  }

  function switchMode () {
    thermostat.switch()
    updateTemp()
    switchColor()
  }

// function updateTemp () {
//
//   $('#temperature').text(thermostat.temperature)
//
//   $.post('http://localhost:9292/thermostat', { temperature: thermostat.temperature })
//
//   if(thermostat.checkUsage() === 0) {
//   $('#temperature').css('color', 'green')
// } else if (thermostat.checkUsage() === 1) {
//   $('#temperature').css('color', 'yellow')
// } else if (thermostat.checkUsage() === 2) {
//   $('#temperature').css('color', 'red')
// }
// }

  updateTemp()
  switchColor()

  $('#temperature-up').on('click', function () {
    thermostat.up()
    updateTemp()
  })

  $('#temperature-down').on('click', function () {
    thermostat.down()
    updateTemp()
  })

  $('#temperature-reset').on('click', function () {
    thermostat.resets()
    updateTemp()
  })

  $('#powersaving-switch').on('click', function () {
    switchMode()
  })

  $('#current-city').change(function () {
    city = $('#current-city').val()
    key = '&appid=8e6bb843aaeecb68aa5a7a85d4d34202'
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + key, function(data) {
      $('#current-temperature').text(data.main.temp)
    })
  })
})
