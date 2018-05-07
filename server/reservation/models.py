from django.db import models

class Station(models.Model):
    name = models.CharField(max_length=30)
    code = models.CharField(max_length=10)

    class Meta:
        verbose_name_plural='Station'

    def __str__(self):
        return str(self.name)

class Train(models.Model):
    number = models.PositiveIntegerField()
    name = models.CharField(max_length=30)
    start = models.ForeignKey('Station',
                                related_name='start',
                                on_delete=models.CASCADE)
    end = models.ForeignKey('Station',
                                related_name='end',
                                on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name) + ' - ' + str(self.number)

class Route(models.Model):
    source = models.ForeignKey('Station',
                                related_name='source',
                                on_delete=models.CASCADE)
    destination = models.ForeignKey('Station',
                                related_name='destination',
                                on_delete=models.CASCADE)
    train = models.ManyToManyField(Train)
    arrival = models.TimeField()
    departure = models.TimeField()

    def __str__(self):
        return str(self.source) + ' to ' +str(self.destination)
