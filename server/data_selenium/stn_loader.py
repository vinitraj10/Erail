from selenium import webdriver
from time import sleep
from reservation.models import Station

print("Opening Google Chrome....")
ch = webdriver.Chrome()
print("Opening the railway data link....")
ch.get('https://www.cleartrip.com/trains/stations/list')
print("Please Wait...")
print("Ready to scrape data ")
for i in range(1,6):
    next=ch.find_element_by_class_name('next_page')
    table=ch.find_element_by_class_name('results')
    data=table.find_elements_by_tag_name('tr')
    data.pop(0)
    for j in data:
        stn=j.find_elements_by_tag_name('td')
        s=Station(name=stn[1].text,code=stn[0].text)
        s.save()
        print("Model saved...")
    print("Page- " + str(i) + " finished")
    next.click()
