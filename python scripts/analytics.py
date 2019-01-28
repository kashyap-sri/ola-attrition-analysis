import csv
from rake_nltk import Rake 

cons = []
pros = []
conString  = ''
proString  = ''

# with open('../data source/cons.csv') as csvFile:
#     cons = list(filter(lambda row: len(row) > 0, csv.reader(csvFile, delimiter='\n')))
#     cons = list(map(lambda row: row[0], cons))
#     conString = ''.join(cons)

with open('../data/pros.csv') as csvFile:
    pros = list(filter(lambda row: len(row) > 0, csv.reader(csvFile, delimiter='\n')))
    pros = list(map(lambda row: row[0], pros))
    proString = ''.join(pros)

r = Rake(min_length=3, max_length=4)

# r.extract_keywords_from_text(conString)
# conScores = r.get_ranked_phrases_with_scores()

r.extract_keywords_from_text(proString)
proScores = r.get_ranked_phrases_with_scores()

# conScoresDict = list(map(lambda con: { 'con' : con[1], 'score': abs(con[0])}, conScores))
proScoresDict = list(map(lambda pro: { 'pro' : pro[1], 'score': abs(pro[0])}, proScores))
         
# with open('../data source/conScores.csv', 'w') as csvfile:
#     fieldnames = ['con', 'score']
#     consWriter = csv.DictWriter(csvfile, fieldnames=fieldnames)
#     consWriter.writeheader()
#     consWriter.writerows(conScoresDict)

with open('../data/proscores.csv', 'w') as csvfile:
    fieldnames = ['pro', 'score']
    prosWriter = csv.DictWriter(csvfile, fieldnames=fieldnames)
    prosWriter.writeheader()
    prosWriter.writerows(proScoresDict)