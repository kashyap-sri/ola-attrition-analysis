import csv
from rake_nltk import Rake 
import json

cons = []
pros = []
conString  = ''
proString  = ''

# with open('../data/cons.csv') as csvFile:
#     pros = list(filter(lambda row: len(row) > 0, csv.reader(csvFile, delimiter='\n')))
#     pros = list(map(lambda row: row[0], pros))
#     proString = ''.join(pros)

# r = Rake(min_length=3, max_length=4)
# r.extract_keywords_from_text(proString)
# conFrequency = r.get_word_frequency_distribution()

# with open('../data/confrequency.json', 'w') as jsonfile:
#     json.dump(conFrequency, jsonfile)


with open('../data/pros.csv') as csvFile:
    pros = list(filter(lambda row: len(row) > 0, csv.reader(csvFile, delimiter='\n')))
    pros = list(map(lambda row: row[0], pros))
    proString = ''.join(pros)

r = Rake(min_length=3, max_length=4)
r.extract_keywords_from_text(proString)
proFrequency = r.get_word_frequency_distribution()

with open('../data/profrequency.json', 'w') as jsonfile:
    json.dump(proFrequency, jsonfile)