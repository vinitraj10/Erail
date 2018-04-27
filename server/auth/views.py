import jwt,json
from django.http import HttpResponse,JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def signin(req):
    if req.method == 'POST':
        data = json.loads(req.body)
        print(data)
        username = data['username'].decode('utf-8')
        password = data['password'].decode('utf-8')
        user = authenticate(username = username,password = password)
        if user is not None:
            if user.is_active:
                payload = {
                    'id': user.id,
                    'username': user.username
                }
                jwt_token = jwt.encode(payload,'secret',algorithm ='HS256')
                return JsonResponse({'token':jwt_token,'user':user.username},status=200)
            else:
                return JsonResponse({'error':'Account is disabled'},status=403)
        else:
            return JsonResponse({'error':'Invalid Credentials'},status=403)
@csrf_exempt
def signup(req):
    if req.method == 'POST':
        data = json.loads(req.body)
        username = data['username'].decode('utf-8')
        password = data['password'].decode('utf-8')
        email = data['email'].decode('utf-8')
        try:
            user=User.objects.get(username=username)
            return JsonResponse({'error':'Username already registered'},status=403)
        except:
            try:
                user=User.objects.get(email=email)
                return JsonResponse({'error':'Email already registered'},status=403)
            except:
                user=User.objects.create_user(username,email,password)
                payload = {
                    'id':user.id,
                    'username':user.username
                }
                jwt_token = jwt.encode(payload,'secret',algorithm = 'HS256')
                return JsonResponse({'token':jwt_token,'user':user.username},status=201)

def authReq(token):
    try:
        reqUser = jwt.decode(token,'secret',algorithm = 'HS256')
    except:
        return False
    user = User.objects.get(id = reqUser['id'])
    if user:
        return True
    else:
        return False
