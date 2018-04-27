# Extra Help function for having a clean code base
from datetime import datetime

def extract(codes):
	for i in range(len(codes)):
		if codes[i]=='-':
			x=i
			break
	return (codes[0:i],codes[i+1:len(codes)])

def getAvailableTrains(trains,doj):
  # converting to datetime object
    doj=datetime.strptime(doj,'%Y/%m/%d')
    day=toDay(doj.weekday()) #converting to day(string) after getting 0-6
    avlTrains=[]
    for i in range(len(trains)):
        availability=newAvailablity(list(trains[i]['availability']))
        if day in availability:
            avlTrains.append(trains[i])
    return avlTrains

def toDateTime(doj):
    doj=list(doj)
    for i in range(len(doj)):
        if doj[i]=='-':
            doj[i]='/'
    return ''.join(doj)

def toDay(int):
    if(int==0):
        return 'MO'
    elif(int==1):
        return 'TU'
    elif(int==2):
        return 'WE'
    elif(int==3):
        return 'TH'
    elif(int==4):
        return 'FR'
    elif(int==5):
        return 'SA'
    elif(int==6):
        return 'SU'

def newAvailablity(availability):
    temp=[]
    for i in range(len(availability)):
        if(i%2!=0):
            temp.append(availability[i-1]+availability[i])
    return temp

def updateSeats(train,seatclass):
	if seatclass == '1AC':
		return train.updateFirstAc()
	elif seatclass == '2AC':
		return train.updateSecondAc()
	elif seatclass == '3AC':
		return train.updateThirdAc()
	else:
		return train.updateSleeper()
