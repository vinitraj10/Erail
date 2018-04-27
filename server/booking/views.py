import jwt,json
from datetime import datetime
from random import randint
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from booking.models import (
	Stations,
	Routes,
	Trains,
	Ticket
)
from auth.views import authReq
from booking.utility.help import (
	extract,
	getAvailableTrains,
	updateSeats,
	toDateTime
)
from django.contrib.auth.models import User

def getTrains(req,stn_codes,doj):
	try:
		token = req.META['HTTP_AUTHORIZATION']
	except:
		return JsonResponse({'error':'PLease login First'})
	if authReq(token):
		doj=toDateTime(doj)
		doj1=datetime.strptime(doj,'%Y/%m/%d')
		today = datetime.today()
		delta = doj1-today
		if(delta.days>120):
			return JsonResponse({'error':'Booking Not allowed beyond 3 months'},status=403)
		elif(delta.days<-1):
			return JsonResponse({'error':"You can't travel in past ;)"},status=404)

		src,dest = extract(stn_codes)
		try:
			source = Stations.objects.get(stn_code=src.upper())
		except:
			return JsonResponse({'error':'Source Station Not found'},status=404)
		try:
			destination = Stations.objects.get(stn_code=dest.upper())
		except:
			return JsonResponse({'error':'Destination Station Not found'},status=404)
		try:
			route = Routes.objects.get(source=source,destination=destination)
		except:
			return JsonResponse({'error':'No trains in this route available'},status=404)
		trains = Trains.objects.filter(routes=route).values()
		avlTrains = getAvailableTrains(list(trains),doj)
		return JsonResponse({'trains':avlTrains})

@csrf_exempt
def bookTicket(req,train_id):
	if req.method == 'POST':
		try:
			token = req.META['HTTP_AUTHORIZATION']
		except:
			return JsonResponse({'error':'Please login first'})
		if authReq(token):
			user_id = jwt.decode(token,'secret',algorithm = 'HS256')
			user_id = user_id['id']
			user = User.objects.get(id=user_id)
			data = json.loads(req.body)
			doj = data['doj'].decode('utf-8')
			doj1 = toDateTime(doj)
			doj2 = datetime.strptime(doj1,'%Y/%m/%d')
			train = Trains.objects.get(pk=train_id)
			fname = data['fname'].decode('utf-8')
			lname = data['lname'].decode('utf-8')
			age = data['age']
			gender = data['gender'].decode('utf-8')
			seatclass = data['seatclass'].decode('utf-8')
			ticket = Ticket(buyer=user,
							train = train,
							first_name = fname,
							last_name = lname,
							age = age,
							gender = gender,
							seatclass = seatclass,
							doj=doj2
					)
			ticket.save()
			updateSeats(train,seatclass)
			return JsonResponse({'booked':'ok'})
		else:
			return JsonResponse({'error':'Please login first'})
	else:
		return JsonResponse({'error':'Method not allowed'})

def seatInfo(req,train_id):
	try:
		token = req.META['HTTP_AUTHORIZATION']
	except:
		return JsonResponse({'error':'Please login First'})
	if authReq(token):
		train = Trains.objects.get(pk=train_id)
		first_ac = train.first_ac
		second_ac = train.second_ac
		third_ac = train.third_ac
		sleeper = train.sleeper
		numr = train.numr
		arrl = train.arrl
		dept = train.dept
		payload = {
			'train_numr' : numr,
			'first_ac': first_ac,
			'second_ac': second_ac,
			'third_ac': third_ac,
			'sleeper': sleeper,
			'arrl':arrl,
			'dept':dept
		}
		return JsonResponse(payload,status=200)
def myBookings(req):
	try:
		token = req.META['HTTP_AUTHORIZATION']
	except:
		return JsonResponse({'error':'Please login first'})
	if authReq(token):
		user_id = jwt.decode(token,'secret',algorithm = 'HS256')
		user_id = user_id['id']
		user = User.objects.get(id=user_id)
		tickets = Ticket.objects.filter(buyer=user).values()
		tickets = list(tickets)
		for i in range(len(tickets)):
			train_id=tickets[i]['train_id']
			train=Trains.objects.get(pk=train_id)
			tickets[i]['train_no']=train.numr
			tickets[i]['train']=train.name
			tickets[i]['arrival']=train.arrl
			tickets[i]['dept']=train.dept
			tickets[i]['src']=train.routes.source.name
			tickets[i]['src_code']=train.routes.source.stn_code
			tickets[i]['dest']=train.routes.destination.name
			tickets[i]['dest_code']=train.routes.destination.stn_code
			tickets[i]['pltf']=randint(0, 9)

		return JsonResponse({'tickets':tickets})
	return HttpResponse('<h1></h1>')
