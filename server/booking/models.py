# Made by @vinitraj10
from django.db import models
from django.conf import settings

class Stations(models.Model):
    name = models.CharField(max_length=40)
    stn_code = models.CharField(max_length=10)

    class Meta:
        verbose_name_plural = 'Stations'

    def __str__(self):
        return str(self.name)

class Routes(models.Model):
    source = models.ForeignKey('Stations',
                                related_name='source',
                                on_delete=models.CASCADE)
    destination = models.ForeignKey('Stations',
                                    related_name='destination',
                                    on_delete=models.CASCADE)
    class Meta:
        verbose_name_plural = 'Routes'

    def __str__(self):
        return str(self.source.stn_code) + ' to ' + str(self.destination.stn_code)


class Trains(models.Model):
    name = models.CharField(max_length=200) # train name
    numr = models.IntegerField() #train number
    arrl = models.TimeField() # train arrival timing
    dept = models.TimeField() # train departure timing
    first_ac = models.IntegerField() # seats available in first ac
    second_ac = models.IntegerField() # seats available in second ac
    third_ac = models.IntegerField() # seats available in third ac
    sleeper = models.IntegerField() # seats available in sleeper
    availability = models.CharField(max_length=15) # availability of the train
    routes = models.ForeignKey('Routes',on_delete=models.CASCADE)
    class Meta:
        verbose_name_plural = 'Trains'

    def __str__(self):
        return str(self.name) + '-' + str(self.numr)

    def updateFirstAc(self):
        self.first_ac-=1
        self.save()
    def updateSecondAc(self):
        self.second_ac-=1
        self.save()
    def updateThirdAc(self):
        self.third_ac-=1
        self.save()
    def updateSleeper(self):
        self.sleeper-=1
        self.save()

class Ticket(models.Model):
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    train = models.ForeignKey('Trains')
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    age = models.IntegerField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    seatclass = models.CharField(max_length=5,default='Sl')
    doj=models.DateField()

    def __str__(self):
        return (self.first_name + ' ' + self.last_name + ' '
                + self.seatclass + ' in ' + str(self.train))

    def get_full_name(self):
        return self.first_name + ' ' + self.last_name
