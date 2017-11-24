require 'sinatra/base'
require './model/thermostat.rb'

class ThermostatControler < Sinatra::Base

 post '/thermostat' do
  Thermostat.destroy
  current_temperature = params[:temperature]
  Thermostat.create(id: 1, temperature: current_temperature)
 end

 get '/thermostat/api' do
   Thermostat.all
 end

  run if app_file == $0
end
