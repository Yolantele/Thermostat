require 'data-mapper'
require 'dm-postgres-adapter'

class Thermostat
  include DataMapper::Resource

  property :id, Serial
  property :temperature, Integer
end

DataMapper.setup(:default, 'postgres://localhost/thermostat')
DataMapper.finalize
DataMapper.auto_upgrade!
