require 'CSV'
require 'round_robin_tournament'
require 'JSON'

students_filepath = 'ds_student_list.csv'
students = {
  Online: [],
  Onsite: []
}

CSV.foreach(students_filepath, headers: :first_row) do |row|
  students[row['Place'].to_sym] << { name: row['Name'], github_username: row['Github']}
  # students[:Online] << {name: row[:Online], github: row[]}
end

online_matches = RoundRobinTournament.schedule(students[:Online])
onsite_matches = RoundRobinTournament.schedule(students[:Onsite])

File.open('./online_matches.json', 'wb') do |file|
  file.write(JSON.generate(online_matches))
end

File.open('./onsite_matches.json', 'wb') do |file|
  file.write(JSON.generate(onsite_matches))
end