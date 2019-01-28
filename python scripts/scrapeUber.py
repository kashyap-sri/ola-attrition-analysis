import os
import re
import requests
import time
from bs4 import BeautifulSoup as bs
import numpy as np
import csv

staticURL = 'https://www.glassdoor.com/Reviews/Uber-Reviews-'

pros = []
cons = []
dates = []
summary = []

for page in range(0, 50):
        pageURL = staticURL + 'E575263.htm' if page == 0 else staticURL + \
        'E575263_P' + str(page) + '.htm'
        print(pageURL)
        r = requests.get(url=pageURL, headers={
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36',
        'accept': 'text/html'
        })

        soup = bs(r.text, 'lxml')

        reviews = soup.find(id='ReviewsFeed')
        if reviews:
                eachReview = reviews.findAll('div', class_='hreview')

        for review in eachReview:
                summary.append({
                'summary': review.find('span', class_=re.compile('summary')).getText(),
                'date': review.find('time', class_=re.compile('date subtle small')).getText()
                })
                cons.append({
                'cons': review.find('p', class_=re.compile('cons')).getText()
                })
                pros.append({
                'pros': review.find('p', class_=re.compile('pros')).getText()
                })

# with open("../data/uber_cons.csv", "w") as f:
#         writer = csv.DictWriter(f, fieldnames=['cons'])
#         writer.writeheader()
#         writer.writerows(cons)
# with open("../data/uber_pros.csv", "w") as f:
#         writer = csv.DictWriter(f, fieldnames=['pros'])
#         writer.writeheader()
#         writer.writerows(pros)
with open("../data/summaryuber.csv", "w") as f:
        writer = csv.DictWriter(f, fieldnames=['summary', 'date'])
        writer.writeheader()
        writer.writerows(summary)

