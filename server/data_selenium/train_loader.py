from selenium import webdriver
from time import sleep
from reservation.models import (
    Station,
    Train
)

print("Opening Google Chrome....")
ch = webdriver.Chrome()
print("Opening the railway data link....")
ch.get('https://www.cleartrip.com/trains/list')
print("Please Wait...")
print("Ready to scrape data ")
for i in range(1,6):
    next=ch.find_element_by_class_name('next_page')
    table=ch.find_element_by_class_name('results')
    data=table.find_elements_by_tag_name('tr')
    data.pop(0)
    for j in data:
        train=j.find_elements_by_tag_name('td')
        start = Station.objects.filter(name=train[2].text)
        end = Station.objects.filter(name=train[3].text)
        if(len(start)==1 and len(end)==1):
            t=Train(number=train[0].text,
                    name=train[1].text,
                    start=start[0],
                    end=end[0]
            )
            t.save()
            print("Model saved...")
        else:
            print("Train Skipped")
    print("Page- " + str(i) + " finished")
    next.click()
